import re

with open('src/components/lobby-index/LobbyIndex.tsx', 'r') as f:
    content = f.read()

# Rename the component
content = content.replace('export default function App() {', 'export default function LobbyIndex() {')

with open('src/components/lobby-index/LobbyIndex.tsx', 'w') as f:
    f.write(content)
