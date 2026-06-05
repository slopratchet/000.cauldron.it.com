import re

def modify_file(filepath):
    with open(filepath, 'r') as f:
        content = f.read()

    # Import
    content = content.replace("import Layout from '../layouts/Layout.astro';", "import Layout from '../layouts/Layout.astro';\nimport LobbyIndex from '../components/LobbyIndex/LobbyIndex';")

    # Place it above LIVE TRANSMISSION
    content = content.replace('<!-- WebSocket Logs -->', '<LobbyIndex client:load />\n  <!-- WebSocket Logs -->')

    with open(filepath, 'w') as f:
        f.write(content)

modify_file('src/pages/lobby.astro')
