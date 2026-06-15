import os

for root, dirs, files in os.walk("src/components/home.000.00"):
    for file in files:
        if file.endswith(".tsx"):
            path = os.path.join(root, file)
            with open(path, "r") as f:
                content = f.read()

            # The current version of lucide-react might not have Instagram, Facebook, Youtube, or maybe the case is different.
            # Let's replace lucide-react with some basic SVGs or just remove them if possible, or wait, I should check what is exported by lucide-react.
            pass
