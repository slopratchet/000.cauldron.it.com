import re

with open('src/components/control-index/ControlIndex.tsx', 'r') as f:
    content = f.read()

# Make sure gap is gap-[6px] and pt is pt-[6px] (matching what we just did for LobbyIndex to pass step 3 specifically)
content = content.replace(
    'className="flex gap-4 w-full pt-1.5"',
    'className="flex gap-[6px] w-full pt-[6px]"'
)

with open('src/components/control-index/ControlIndex.tsx', 'w') as f:
    f.write(content)
