import re

filepath = "src/components/index-003/data/manualData.ts"
with open(filepath, "r") as f:
    content = f.read()

content = content.replace("werewolf\\'s", "werewolf's")
content = content.replace("Gaia\\'s", "Gaia's")

with open(filepath, "w") as f:
    f.write(content)
