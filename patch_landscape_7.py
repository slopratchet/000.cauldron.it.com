import re

with open("src/components/lobby-index/OperationalLandscape.tsx", "r") as f:
    content = f.read()

# Fix h-screen / w-screen for mobile using memory context, but for our issue we also need to change the dimension styles
# Memory says: "To prevent full-screen UI clipping on mobile browsers... use dynamic viewport units (100dvh and Tailwind's h-dvh or w-dvw) instead of standard viewport units (100vh, 100vw, h-screen, w-screen)"

# 1. Update the wrapper classes:
content = content.replace("h-screen w-screen", "h-dvh w-dvw")

# 2. Update the style sizes: width/height for iframe when isFullScreen
content = re.sub(
    r"isFullScreen\s*\?\s*\{\s*width:\s*'min\(100vw,\s*calc\(100vh\s*\*\s*1280\s*/\s*720\)\)',\s*height:\s*'min\(100vh,\s*calc\(100vw\s*\*\s*720\s*/\s*1280\)\)',\s*aspectRatio:\s*'1280\s*/\s*720',\s*\}\s*:\s*\{\s*width:\s*'100%',\s*height:\s*'100%'\s*\}",
    "isFullScreen ? { width: '100dvw', height: '100dvh', maxWidth: 'calc(100dvh * (1280 / 720))', maxHeight: 'calc(100dvw * (720 / 1280))', aspectRatio: '1280 / 720' } : { width: '100%', height: '100%' }",
    content
)

with open("src/components/lobby-index/OperationalLandscape.tsx", "w") as f:
    f.write(content)

with open("src/components/control-index/OperationalLandscape.tsx", "r") as f:
    content = f.read()

content = content.replace("h-screen w-screen", "h-dvh w-dvw")
content = re.sub(
    r"isFullScreen\s*\?\s*\{\s*width:\s*'min\(100vw,\s*calc\(100vh\s*\*\s*1280\s*/\s*720\)\)',\s*height:\s*'min\(100vh,\s*calc\(100vw\s*\*\s*720\s*/\s*1280\)\)',\s*aspectRatio:\s*'1280\s*/\s*720',\s*\}\s*:\s*\{\s*width:\s*'100%',\s*height:\s*'100%'\s*\}",
    "isFullScreen ? { width: '100dvw', height: '100dvh', maxWidth: 'calc(100dvh * (1280 / 720))', maxHeight: 'calc(100dvw * (720 / 1280))', aspectRatio: '1280 / 720' } : { width: '100%', height: '100%' }",
    content
)

with open("src/components/control-index/OperationalLandscape.tsx", "w") as f:
    f.write(content)
