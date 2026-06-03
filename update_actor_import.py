import re

with open('src/components/Actor000.tsx', 'r') as f:
    content = f.read()

content = content.replace('import { characterData } from "./data";', 'import { characterData } from "./actorData";')

with open('src/components/Actor000.tsx', 'w') as f:
    f.write(content)
