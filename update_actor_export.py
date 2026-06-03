import re

with open('src/components/Actor000.tsx', 'r') as f:
    content = f.read()

content = content.replace('export default function App() {', 'export default function Actor000() {')

with open('src/components/Actor000.tsx', 'w') as f:
    f.write(content)
