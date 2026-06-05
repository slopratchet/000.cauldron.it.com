import os
import re

def modify_file(filepath):
    with open(filepath, 'r') as f:
        content = f.read()

    # Create the lists of links
    action_links = [f'<a href="/action/{f.replace(".astro", "")}" className="block font-label-md text-primary hover:underline">{f.replace(".astro", "")}</a>' for f in os.listdir('src/pages/action') if f.endswith('.astro')]
    actor_links = [f'<a href="/actor/{f.replace(".astro", "")}" className="block font-label-md text-primary hover:underline">{f.replace(".astro", "")}</a>' for f in os.listdir('src/pages/actor') if f.endswith('.astro')]
    script_links = [f'<a href="/script/{f.replace(".astro", "")}" className="block font-label-md text-primary hover:underline">{f.replace(".astro", "")}</a>' for f in os.listdir('src/pages/script') if f.endswith('.astro')]
    know_links = [f'<a href="/know/{f.replace(".astro", "")}" className="block font-label-md text-primary hover:underline">{f.replace(".astro", "")}</a>' for f in os.listdir('src/pages/know') if f.endswith('.astro')]

    links_section = f"""
      <section className="p-margin-page bg-parchment-deep border-b-4 border-primary">
        <h2 className="font-headline-lg text-headline-lg uppercase mb-stack-lg border-b-2 border-primary pb-stack-sm">
          Directory Scan
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-gutter">
          <div>
            <h3 className="font-headline-md text-headline-md uppercase mb-stack-sm border-b border-primary pb-stack-xs">Action</h3>
            <div className="flex flex-col gap-2">
              {''.join(action_links)}
            </div>
          </div>
          <div>
            <h3 className="font-headline-md text-headline-md uppercase mb-stack-sm border-b border-primary pb-stack-xs">Actor</h3>
            <div className="flex flex-col gap-2">
              {''.join(actor_links)}
            </div>
          </div>
          <div>
            <h3 className="font-headline-md text-headline-md uppercase mb-stack-sm border-b border-primary pb-stack-xs">Script</h3>
            <div className="flex flex-col gap-2">
              {''.join(script_links)}
            </div>
          </div>
          <div>
            <h3 className="font-headline-md text-headline-md uppercase mb-stack-sm border-b border-primary pb-stack-xs">Know</h3>
            <div className="flex flex-col gap-2">
              {''.join(know_links)}
            </div>
          </div>
        </div>
      </section>
"""

    content = content.replace('<main className="flex-grow">', f'<main className="flex-grow">{links_section}')

    with open(filepath, 'w') as f:
        f.write(content)

modify_file('src/components/LobbyIndex/LobbyIndex.tsx')
