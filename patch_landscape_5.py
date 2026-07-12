import re

with open("src/components/lobby-index/OperationalLandscape.tsx", "r") as f:
    content = f.read()

# Replace the style block
content = re.sub(
    r"isFullScreen\s*\?\s*\{\s*width:\s*'min\(100vw,\s*calc\(100vh\s*\*\s*1280\s*/\s*720\)\)',\s*height:\s*'min\(100vh,\s*calc\(100vw\s*\*\s*720\s*/\s*1280\)\)',\s*aspectRatio:\s*'1280\s*/\s*720',\s*\}\s*:\s*\{\s*width:\s*'100%',\s*height:\s*'100%'\s*\}",
    "isFullScreen ? { width: '100%', height: '100%', maxWidth: 'calc(100vh * (1280 / 720))', maxHeight: 'calc(100vw * (720 / 1280))', aspectRatio: '1280 / 720' } : { width: '100%', height: '100%' }",
    content
)

with open("src/components/lobby-index/OperationalLandscape.tsx", "w") as f:
    f.write(content)
