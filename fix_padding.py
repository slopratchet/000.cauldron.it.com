import re

def update_file(filename, replacements):
    with open(filename, 'r') as f:
        content = f.read()

    for old, new in replacements:
        content = content.replace(old, new)

    with open(filename, 'w') as f:
        f.write(content)

lobby_index = 'src/components/lobby-index/LobbyIndex.tsx'
replacements_index = [
    ('className="mb-6 flex flex-col sm:flex-row', 'className="mb-0 flex flex-col sm:flex-row'),
    ('className="w-full mb-6 mt-0"', 'className="w-full mb-0 mt-0"'),
    ('className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch mb-8"', 'className="grid grid-cols-1 lg:grid-cols-12 gap-0 items-stretch mb-0"'),
    ('className="mb-8"', 'className="mb-0"'),
    ('className="mb-8 w-full"', 'className="mb-0 w-full"'),
    ('className="mb-8 w-full flex justify-center"', 'className="mb-0 w-full flex justify-center"')
]
update_file(lobby_index, replacements_index)

lobby_astro = 'src/pages/lobby.astro'
replacements_astro = [
    ('class="max-w-7xl mx-auto w-full px-4 md:px-8 pb-12 mt-8 relative z-10"', 'class="max-w-7xl mx-auto w-full px-4 md:px-8 pb-12 mt-0 relative z-10"')
]
update_file(lobby_astro, replacements_astro)
