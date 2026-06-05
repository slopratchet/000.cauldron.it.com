import os
import glob

def get_pages(directory):
    pages = []
    base_dir = f"src/pages/{directory}"
    if os.path.exists(base_dir):
        files = glob.glob(f"{base_dir}/*.astro")
        for f in files:
            filename = os.path.basename(f)
            # Remove .astro extension
            name = filename[:-6]
            pages.append(f"/{directory}/{name}")
    return sorted(pages)

actions = get_pages("action")
actors = get_pages("actor")
scripts = get_pages("script")
knows = get_pages("know")

print("Actions:", actions)
print("Actors:", actors)
print("Scripts:", scripts)
print("Knows:", knows)
