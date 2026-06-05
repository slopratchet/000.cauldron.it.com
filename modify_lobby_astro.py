import re

with open('src/pages/lobby.astro', 'r') as f:
    content = f.read()

# Add import for LobbyIndex
import_stmt = "import LobbyIndex from '../components/lobby-index/LobbyIndex.tsx';\n"
if "import Layout from '../layouts/Layout.astro';" in content:
    content = content.replace("import Layout from '../layouts/Layout.astro';", "import Layout from '../layouts/Layout.astro';\n" + import_stmt)

# Insert the component above LIVE TRANSMISSION
# We find the LIVE TRANSMISSION section
target = """  <!-- WebSocket Logs -->
  <section class="p-margin-page bg-surface border-t-4 border-primary mt-8">
    <h3 class="font-headline-lg text-headline-lg uppercase mb-stack-md">
      LIVE TRANSMISSION
    </h3>"""

replacement = """  <LobbyIndex client:load />

  <!-- WebSocket Logs -->
  <section class="p-margin-page bg-surface border-t-4 border-primary mt-8">
    <h3 class="font-headline-lg text-headline-lg uppercase mb-stack-md">
      LIVE TRANSMISSION
    </h3>"""

content = content.replace(target, replacement)

with open('src/pages/lobby.astro', 'w') as f:
    f.write(content)
