import re

with open("src/components/lobby-index/OperationalLandscape.tsx", "r") as f:
    content = f.read()

# Wait, if `width: 'min(100vw, calc(100vh * 1280 / 720))', height: 'min(100vh, calc(100vw * 720 / 1280))'` gives us 1920x1080.
# And the inner iframe content caps itself to `1280x720` and centers itself.
# That means NO MATTER WHAT CSS we apply to the iframe, the content INSIDE the iframe will NOT stretch to 1920x1080.
# The content INSIDE the iframe is hardcoded to `max-w-[1280px] max-h-[720px]`.
# We saw this in the HTML of the iframe.
#
# BUT wait, how does `transform: scale(...)` fix it?
# Because if we set the iframe to EXACTLY `width: 1280px; height: 720px`, the inner content will fill the iframe exactly!
# And then we scale the iframe itself up by `1920/1280 = 1.5`, so visually it fills the screen!
#
# How to scale it in React?
# We can just add a state `scale` and calculate it in `useEffect`.
#
# ```javascript
#  const [scale, setScale] = useState(1);
#  useEffect(() => {
#    const handleResize = () => {
#      if (isFullScreen) {
#        setScale(Math.min(window.innerWidth / 1280, window.innerHeight / 720));
#      } else {
#        setScale(1);
#      }
#    };
#    handleResize();
#    window.addEventListener('resize', handleResize);
#    return () => window.removeEventListener('resize', handleResize);
#  }, [isFullScreen]);
# ```
# And then in style:
# ```
# style={
#   isFullScreen ? {
#     width: '1280px',
#     height: '720px',
#     transform: `scale(${scale})`,
#     transformOrigin: 'center center'
#   } : { width: '100%', height: '100%' }
# }
# ```
