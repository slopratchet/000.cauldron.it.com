import re

with open('src/components/Actor000.tsx', 'r') as f:
    content = f.read()

# Replace all uses of localStorage inside the useState callbacks
content = re.sub(
    r'localStorage\.getItem\("([^"]+)"\)',
    r'(typeof window !== "undefined" ? localStorage.getItem("\1") : null)',
    content
)

content = re.sub(
    r'localStorage\.setItem\("([^"]+)",\s*([^)]+)\);',
    r'if (typeof window !== "undefined") { localStorage.setItem("\1", \2); }',
    content
)

with open('src/components/Actor000.tsx', 'w') as f:
    f.write(content)
