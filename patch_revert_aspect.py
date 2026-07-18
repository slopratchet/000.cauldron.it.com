import re

with open('src/components/lobby-index/LobbyIndex.tsx', 'r') as f:
    content = f.read()

# Change it back to fixed h-[720px] for lobby as Memory says LobbyIndex uses h-[720px], and ControlIndex uses aspect-[16/18]
# Memory: "The parent container for the OperationalControl element in LobbyIndex.tsx uses a fixed height of h-[720px], whereas ControlIndex.tsx uses the Tailwind arbitrary value aspect-[16/18] to maintain a specific vertical height relative to its width."

content = content.replace(
    'className="mt-3 mb-0 w-full"',
    'className="mt-3 mb-0 w-full h-[720px]"'
)
content = content.replace(
    '<div className="w-full flex flex-col">',
    '<div className="w-full h-[720px] flex flex-col">'
)
content = content.replace(
    '<div className="w-full aspect-video overflow-hidden">',
    '<div className="flex-grow overflow-hidden">'
)

with open('src/components/lobby-index/LobbyIndex.tsx', 'w') as f:
    f.write(content)
