import re

with open("src/components/lobby-index/OperationalLandscape.tsx", "r") as f:
    content = f.read()

# Replace the style block - use width: '100%', height: '100%' instead for full screen.
# If we do w: 100%, h: 100%, the iframe just fills the flex container. The flex container is what's styling the gaps? No, the container is full screen.
# The user wants "make sure it takes up all available space and keeps the proportions between 1280 width and 720 height".
# The flex container is w-screen, h-screen.
# We want the iframe to take the max size while keeping 1280/720 ratio.
# That is exactly what `width: '100%', height: '100%', maxWidth: 'calc(100vh * (1280 / 720))', maxHeight: 'calc(100vw * (720 / 1280))'` did in test_scale_16!
# Or `width: '100vw', height: '100vh', maxWidth: 'calc(100vh * 1280 / 720)', maxHeight: 'calc(100vw * 720 / 1280)'`
# We'll use exactly that!
# WAIT, the original code had exactly: `width: 'min(100vw, calc(100vh * 1280 / 720))', height: 'min(100vh, calc(100vw * 720 / 1280))', aspectRatio: '1280 / 720'`
# Wait, why was there a gap originally?
# Let's check the first screenshot! The first screenshot had gaps on the TOP/BOTTOM AND SIDES?
# No, in the first screenshot, the green box was not visible, it was showing "Compiling Destination Environment..."!
# Ah!
# Let me look closely at the original screenshot: fullscreen.png.
# Wait, in fullscreen.png, the "Compiling Destination Environment..." is centered, and it has a black background around it.
# The `id="app-iframe"` wasn't loaded yet.
# Is the issue just the `100vh` vs `100dvh`? "leaving gap around the green rectangle; make sure it takes up all available space and keeps the proportions between 1280 width and 720 height"
# Oh wait, `isFullScreen ? 'fixed inset-0 z-[100] h-screen w-screen justify-center bg-black' : 'relative justify-start lg:justify-center'`
# The problem might be `h-screen` vs `h-dvh` AND `w-screen` vs `w-dvw` on mobile, but on desktop 1920x1080?
# No, look at `fullscreen.png`. It is NOT FULL SCREEN AT ALL!
# Wait, in `fullscreen.png`, the background is the page, and the container is STILL inline!
# Look at `fullscreen.png`... The OperationalLandscape is STILL IN ITS CONTAINER in the grid!
# Why? Because the `isFullScreen` state only makes the INNER div `fixed inset-0`.
# BUT wait! The inner div is:
# `<div className={`w-full flex-grow bg-neutral-800 overflow-hidden flex items-center ${isFullScreen ? 'fixed inset-0 z-[100] h-screen w-screen justify-center bg-black' : 'relative justify-start lg:justify-center'}`}>`
# Yes, it should become fixed and take over the screen.

# Oh, wait... In my screenshot `landscape_fullscreen.png` (using playwright clicking the landscape button), it took over the FULL screen (it was all dark grey).
# The iframe then loaded, but it had a green box.
# Why did `test_scale_9.py` look different?
# Because `100vw` and `100vh` doesn't account for aspect ratio properly?
# Actually, the user says "make sure it takes up all available space and keeps the proportions between 1280 width and 720 height"
# Let me check the original code again.
content = re.sub(
    r"isFullScreen\s*\?\s*\{\s*width:\s*'min\(100vw,\s*calc\(100vh\s*\*\s*1280\s*/\s*720\)\)',\s*height:\s*'min\(100vh,\s*calc\(100vw\s*\*\s*720\s*/\s*1280\)\)',\s*aspectRatio:\s*'1280\s*/\s*720',\s*\}\s*:\s*\{\s*width:\s*'100%',\s*height:\s*'100%'\s*\}",
    "isFullScreen ? { width: '100%', height: '100%', maxWidth: 'calc(100vh * (1280 / 720))', maxHeight: 'calc(100vw * (720 / 1280))', aspectRatio: '1280 / 720' } : { width: '100%', height: '100%' }",
    content
)

with open("src/components/lobby-index/OperationalLandscape.tsx", "w") as f:
    f.write(content)
