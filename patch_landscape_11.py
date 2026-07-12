# The only way to make an iframe whose inner content is strictly bounded to 1280x720
# appear full screen without gaps, is to make the iframe EXACTLY 1280x720
# and then visually SCALE the iframe using CSS `transform: scale()`.
# However, CSS `calc()` inside `scale()` is historically flaky or invalid.
# The proper way to do this in CSS is to use a wrapper div with aspect-ratio,
# and scale the iframe relative to it, or use `zoom`, or just compute the scale using `vw` and `vh`.
# Actually, wait... `scale: 1.5` works. But how do we dynamically scale it to fill the screen?
# If we know the screen aspect ratio is 16:9, we can just do `width: 100%; height: 100%` on a wrapper,
# but the iframe still thinks it's bigger than 1280x720, so the inner content caps at 1280x720.

# How to scale the iframe so its CSS layout engine thinks it's 1280x720, but it gets painted at the viewport size?
# By giving the iframe a fixed width/height:
#   width: 1280px, height: 720px
# And then scaling it:
#   transform: scale(var(--scale-factor))
# Where `--scale-factor` is calculated.
# Since we can't use calc inside scale(), we can calculate it in JS!
