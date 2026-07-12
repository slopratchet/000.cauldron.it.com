import re

with open("src/components/lobby-index/OperationalLandscape.tsx", "r") as f:
    content = f.read()

# So `{ width: '100dvw', height: '100dvh' }` gives us a green box that has a gap around it... why?
# Because the inner content inside the iframe is `aspect-video max-w-[1280px] max-h-[720px]`.
# Yes, inside the iframe:
# <div class="relative flex items-center justify-center bg-black w-full h-full max-w-[1280px] max-h-[720px] aspect-video overflow-hidden mx-auto">
# If we set the iframe to 1920x1080 (100dvw/100dvh), the content inside the iframe limits itself to 1280x720 in the center!
# That explains the gap!
#
# If the iframe content itself refuses to grow past 1280x720, then the ONLY way to make it take up the FULL screen
# without gaps is to use CSS `transform: scale()` on the iframe, so the iframe THINKS it is 1280x720,
# but visually it scales up to 1920x1080!
#
# So the original problem was we needed a scale!
# Let's restore the scale patch and apply it properly.

content = re.sub(
    r"isFullScreen\s*\?\s*\{\s*width:\s*'100dvw',\s*height:\s*'100dvh'\s*\}\s*:\s*\{\s*width:\s*'100%',\s*height:\s*'100%'\s*\}",
    "isFullScreen ? { width: '1280px', height: '720px', transform: 'scale(calc(min(100dvw / 1280, 100dvh / 720)))', transformOrigin: 'center center' } : { width: '100%', height: '100%' }",
    content
)

with open("src/components/lobby-index/OperationalLandscape.tsx", "w") as f:
    f.write(content)

with open("src/components/control-index/OperationalLandscape.tsx", "r") as f:
    content = f.read()

content = re.sub(
    r"isFullScreen\s*\?\s*\{\s*width:\s*'100dvw',\s*height:\s*'100dvh'\s*\}\s*:\s*\{\s*width:\s*'100%',\s*height:\s*'100%'\s*\}",
    "isFullScreen ? { width: '1280px', height: '720px', transform: 'scale(calc(min(100dvw / 1280, 100dvh / 720)))', transformOrigin: 'center center' } : { width: '100%', height: '100%' }",
    content
)

with open("src/components/control-index/OperationalLandscape.tsx", "w") as f:
    f.write(content)
