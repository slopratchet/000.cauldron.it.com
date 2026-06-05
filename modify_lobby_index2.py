import os
import glob
import re

with open('src/components/lobby-index/LobbyIndex.tsx', 'r') as f:
    content = f.read()

def get_pages(directory):
    pages = []
    base_dir = f"src/pages/{directory}"
    if os.path.exists(base_dir):
        files = glob.glob(f"{base_dir}/*.astro")
        for f in files:
            filename = os.path.basename(f)
            name = filename[:-6]
            pages.append(f"/{directory}/{name}")
    return sorted(pages)

actions = get_pages("action")
actors = get_pages("actor")
scripts = get_pages("script")
knows = get_pages("know")

def render_links(title, links):
    html = f"""
               <div className="border-2 border-primary p-stack-md bg-white brutalist-shadow hover:-translate-y-1 transition-transform">
                  <div className="flex items-center gap-stack-sm mb-stack-md">
                     <h4 className="font-headline-md text-headline-md uppercase">{title}</h4>
                  </div>
                  <ul className="list-disc pl-5">
"""
    for link in links:
        html += f"""                     <li><a className="font-label-sm text-label-sm font-bold underline hover:text-dark-orange transition-colors" href="{link}">{link}</a></li>\n"""

    html += """                  </ul>
               </div>"""
    return html

new_sections = f"""
        <section className="p-margin-page bg-surface">
           <div className="flex justify-between items-end mb-stack-lg border-b-2 border-primary pb-stack-sm">
               <h3 className="font-headline-lg text-headline-lg uppercase flex-1 break-words">DIRECTORIES</h3>
           </div>

           <div className="grid grid-cols-1 md:grid-cols-4 gap-gutter">
{render_links("Action", actions)}
{render_links("Actor", actors)}
{render_links("Script", scripts)}
{render_links("Know", knows)}
           </div>
        </section>
"""

# Insert the new section before the "Technical Specs" section
content = content.replace('{/* Technical Specs */}', new_sections + '\n        {/* Technical Specs */}')

with open('src/components/lobby-index/LobbyIndex.tsx', 'w') as f:
    f.write(content)
