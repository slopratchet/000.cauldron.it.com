import cv2
import numpy as np

img = cv2.imread('current_state.png')

# The background color is approximately [216, 226, 230] in BGR
bg_color = np.array([216, 226, 230])

# Let's find rows that are entirely background color (or mostly)
# We will look at a vertical slice in the middle (x = 640)
slice_x = 640
col = img[:, slice_x]

# Find where the color is close to bg_color
is_bg = np.all(np.abs(col - bg_color) < 5, axis=1)

# Find transitions
transitions = np.where(is_bg[:-1] != is_bg[1:])[0]
print("Transitions (y-coordinates) at x=640:")
for t in transitions:
    print(t)
