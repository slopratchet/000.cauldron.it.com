from PIL import Image
import numpy as np

def measure(path):
    img = Image.open(path).convert('RGB')
    data = np.array(img)
    mid_col = data.shape[1] // 2

    print("Row | Color")
    for row in range(40, 100):
        print(f"{row} | {data[row, mid_col]}")

measure('/home/jules/verification/target.png')
