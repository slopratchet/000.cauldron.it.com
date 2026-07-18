import re

with open('src/components/lobby-index/LobbyIndex.tsx', 'r') as f:
    content = f.read()

# Change h-[720px] to aspect-video for operational control
content = content.replace(
    'className="mt-3 mb-0 w-full h-[720px]"',
    'className="mt-3 mb-0 w-full"'
)
content = content.replace(
    '<div className="w-full h-[720px] flex flex-col">',
    '<div className="w-full flex flex-col">'
)
content = content.replace(
    '<div className="flex-grow overflow-hidden">',
    '<div className="w-full aspect-video overflow-hidden">'
)

# Change gap-4 to gap-1.5 and pt-1.5 to pt-2 (maybe gap-2 pt-2)
content = content.replace(
    'className="flex gap-4 w-full pt-1.5"',
    'className="flex gap-[6px] w-full pt-[6px]"'
)

with open('src/components/lobby-index/LobbyIndex.tsx', 'w') as f:
    f.write(content)
