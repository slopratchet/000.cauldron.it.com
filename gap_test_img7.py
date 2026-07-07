from PIL import Image
import numpy as np

def measure(path):
    img = Image.open(path).convert('RGB')
    data = np.array(img)
    mid_col = data.shape[1] // 2

    # 246 243 236 is bg
    # 0 0 0 is black box (or close to it)
    print("Row | Color")
    for row in range(145, 175):
        print(f"{row} | {data[row, mid_col]}")

measure('/home/jules/verification/target.png')
