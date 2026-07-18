from PIL import Image
import numpy as np

img = Image.open('2026-07-18 12_27_37-Camp Candor MMORPG_IT.png')
arr = np.array(img)

# Find the "ENTER COMMAND OVERRIDE" area.
# It's an almost white box with black border. `#E6E2D8` is approximately [230, 226, 216]
# Let's find rows that have mostly this color, or just search for the EXECUTE button which is black with white text.
# Actually, the background is 230, 226, 216.
mask_bg = (arr[:,:,0] == 230) & (arr[:,:,1] == 226) & (arr[:,:,2] == 216)

# Print out some stats
print(f"Image shape: {arr.shape}")
