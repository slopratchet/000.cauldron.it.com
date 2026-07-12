import re

with open("src/components/lobby-index/OperationalLandscape.tsx", "r") as f:
    content = f.read()

# We need to change TWO style blocks in this file!
# There's one for the iframe, and one for the placeholder div
content = re.sub(
    r"isFullScreen\s*\?\s*\{\s*width:\s*'min\(100vw,\s*calc\(100vh\s*\*\s*1280\s*/\s*720\)\)',\s*height:\s*'min\(100vh,\s*calc\(100vw\s*\*\s*720\s*/\s*1280\)\)',\s*aspectRatio:\s*'1280\s*/\s*720',\s*\}\s*:\s*\{\s*width:\s*'100%',\s*height:\s*'100%'\s*\}",
    "isFullScreen ? { width: '100vw', height: '100vh', maxWidth: 'calc(100vh * (1280 / 720))', maxHeight: 'calc(100vw * (720 / 1280))', aspectRatio: '1280 / 720' } : { width: '100%', height: '100%' }",
    content
)

# And wait, what about the flex container wrapping it?
# The wrapper is: className={`w-full flex-grow bg-neutral-800 overflow-hidden flex items-center ${isFullScreen ? 'fixed inset-0 z-[100] h-screen w-screen justify-center bg-black' : 'relative justify-start lg:justify-center'}`}
# In test_scale_17.py, the flex container does NOT become fixed?
# Look at my screenshot landscape_patched.png. It does NOT take the full screen!
# Why did it take the full screen in `landscape_fullscreen.png`?
# Ah! In my `test_scale_17.py` I just did `page.locator("button:has-text('Open Full Screen')").nth(0).click()`. But `isFullScreen` was not triggering?
# Ah, maybe I was clicking the WRONG button or my patch caused a syntax error that prevented React from rendering?
