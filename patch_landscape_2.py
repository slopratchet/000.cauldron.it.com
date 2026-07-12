import re

with open("src/components/lobby-index/OperationalLandscape.tsx", "r") as f:
    content = f.read()

# Replace the style block - let's just make it fill the container directly and use object-fit / aspect-ratio properly if we could,
# but iframe doesn't support object-fit.
# If we do w: 100%, h: 100%, the iframe just fills the flex container. The flex container is what's styling the gaps? No, the container is full screen.
# If the iframe fills the container, does the content inside the iframe keep its proportions? Yes, according to our previous test.

content = re.sub(
    r"isFullScreen\s*\?\s*\{\s*width:\s*'min\(100vw,\s*calc\(100vh\s*\*\s*1280\s*/\s*720\)\)',\s*height:\s*'min\(100vh,\s*calc\(100vw\s*\*\s*720\s*/\s*1280\)\)',\s*aspectRatio:\s*'1280\s*/\s*720',\s*\}\s*:\s*\{\s*width:\s*'100%',\s*height:\s*'100%'\s*\}",
    "isFullScreen ? { width: '100%', height: '100%' } : { width: '100%', height: '100%' }",
    content
)

with open("src/components/lobby-index/OperationalLandscape.tsx", "w") as f:
    f.write(content)
