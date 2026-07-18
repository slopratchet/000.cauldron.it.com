from PIL import Image
import numpy as np

img = Image.open('current_state.png')
arr = np.array(img)

print(f"Shape: {arr.shape}")
