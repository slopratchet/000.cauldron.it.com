import re

with open("src/components/lobby-index/OperationalLandscape.tsx", "r") as f:
    content = f.read()

# Replace the style blocks
content = re.sub(
    r"isFullScreen\s*\?\s*\{\s*width:\s*'100dvw',\s*height:\s*'100dvh',\s*maxWidth:\s*'calc\(100dvh\s*\*\s*\(1280\s*/\s*720\)\)',\s*maxHeight:\s*'calc\(100dvw\s*\*\s*\(720\s*/\s*1280\)\)',\s*aspectRatio:\s*'1280\s*/\s*720'\s*\}\s*:\s*\{\s*width:\s*'100%',\s*height:\s*'100%'\s*\}",
    "isFullScreen ? { width: '100dvw', height: '100dvh' } : { width: '100%', height: '100%' }",
    content
)

with open("src/components/lobby-index/OperationalLandscape.tsx", "w") as f:
    f.write(content)

with open("src/components/control-index/OperationalLandscape.tsx", "r") as f:
    content = f.read()

content = re.sub(
    r"isFullScreen\s*\?\s*\{\s*width:\s*'100dvw',\s*height:\s*'100dvh',\s*maxWidth:\s*'calc\(100dvh\s*\*\s*\(1280\s*/\s*720\)\)',\s*maxHeight:\s*'calc\(100dvw\s*\*\s*\(720\s*/\s*1280\)\)',\s*aspectRatio:\s*'1280\s*/\s*720'\s*\}\s*:\s*\{\s*width:\s*'100%',\s*height:\s*'100%'\s*\}",
    "isFullScreen ? { width: '100dvw', height: '100dvh' } : { width: '100%', height: '100%' }",
    content
)

with open("src/components/control-index/OperationalLandscape.tsx", "w") as f:
    f.write(content)
