# 2>NUL & @echo off & powershell -NoProfile -ExecutionPolicy Bypass -Command "Invoke-Command -ScriptBlock ([ScriptBlock]::Create((Get-Content -LiteralPath '%~f0' -Raw)))" & exit /b %errorlevel%

$accountId = '8bf5a315c3e660fd6c85730c7198720d'
$projectName = '002-alligator-ink-site-desktop'
$prodId = $null
$skippedIds = @()

$configPath = "$env:USERPROFILE\.wrangler\config\default.toml"
$token = $null
if (Test-Path $configPath) {
    $config = Get-Content $configPath -Raw
    if ($config -match 'oauth_token\s*=\s*"([^"]+)"') {
        $token = $Matches[1].Trim()
    }
}

if (-not $token) {
    Write-Host "Could not find Cloudflare OAuth token in $configPath. Make sure wrangler is logged in." -ForegroundColor Red
    exit 1
}

while ($true) {
    Write-Host "Fetching deployments for $projectName..."
    $json = npx wrangler pages deployment list --project-name $projectName --json | Out-String

    try {
        $deployments = $json | ConvertFrom-Json
    } catch {
        Write-Host "Failed to parse JSON from wrangler output. Output was:`n$json" -ForegroundColor Red
        break
    }

    if ($deployments -eq $null -or $deployments.Count -eq 0) {
        Write-Host "No deployments found."
        break
    }

    # Filter out the known active production ID and any previously skipped IDs
    $toDelete = $deployments | Where-Object { $_.Id.Trim() -ne $prodId -and $_.Id.Trim() -notin $skippedIds }

    # If there's nothing left to delete
    if ($toDelete -eq $null -or $toDelete.Count -eq 0) {
        Write-Host "Done. Active production deployment: $prodId" -ForegroundColor Cyan
        break
    }

    # Ensure $toDelete is treated as an array even if there's only 1 item
    $candidates = @($toDelete)
    Write-Host "Found $($candidates.Count) candidate deployments for deletion."
    $deletedAny = $false

    foreach ($dep in $candidates) {
        $id = $dep.Id.Trim()
        Write-Host "Deleting deployment $id ($($dep.Environment))...."
        
        $uri = "https://api.cloudflare.com/client/v4/accounts/$accountId/pages/projects/$projectName/deployments/$id?force=true"
        Write-Host "DEBUG URI: $uri"
        
        try {
            $res = Invoke-RestMethod -Method Delete -Uri $uri -Headers @{ Authorization = "Bearer $token" }
            Write-Host " -> Successfully deleted $id" -ForegroundColor Green
            $deletedAny = $true
        } catch {
            $errBody = ""
            $resp = $_.Exception.Response
            if ($resp) {
                $reader = [System.IO.StreamReader]::new($resp.GetResponseStream())
                $errBody = $reader.ReadToEnd()
            }
            
            if ($errBody -match "active production deployment" -or $errBody -match "8000034") {
                Write-Host " -> Cannot delete active production deployment. Recording ID: $id" -ForegroundColor Yellow
                $prodId = $id
            } else {
                Write-Host " -> Failed to delete $id. Error: $errBody" -ForegroundColor Red
                $skippedIds += $id
            }
        }
    }

    # If we looped through candidates but didn't delete anything, break to avoid infinite loop
    if (-not $deletedAny) {
        Write-Host "No more deployments could be deleted. Finished." -ForegroundColor Cyan
        break
    }
}