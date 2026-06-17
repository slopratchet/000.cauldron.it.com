import os
import re

def get_all_components(components_dir):
    components = []
    for root, dirs, files in os.walk(components_dir):
        for file in files:
            if file.endswith(('.tsx', '.astro', '.ts', '.jsx', '.js', '.css')):
                # Add full path
                components.append(os.path.join(root, file))
    return components

def is_used(comp_path, all_files_content):
    comp_name_without_ext = os.path.splitext(os.path.basename(comp_path))[0]
    comp_dir = os.path.dirname(comp_path)

    if comp_name_without_ext == 'index':
        comp_name_without_ext = os.path.basename(comp_dir)

    if not comp_name_without_ext:
        return True

    for file_path, content in all_files_content:
        if os.path.abspath(file_path) == os.path.abspath(comp_path):
            continue

        # Very simple checking, we just look for exact component names without extension
        # or relative imports
        pattern1 = f"from\\s+['\"].*{comp_name_without_ext}['\"]"
        pattern2 = f"from\\s+['\"].*{os.path.basename(comp_path)}['\"]"
        pattern3 = f"<{comp_name_without_ext}[\\s>]"
        pattern4 = f"import.*{comp_name_without_ext}"

        if (re.search(pattern1, content) or
            re.search(pattern2, content) or
            re.search(pattern3, content) or
            re.search(pattern4, content)):
            return True

    return False

def main():
    components_dir = 'src/components'
    all_components = get_all_components(components_dir)

    all_files_content = []
    for root, dirs, files in os.walk('src'):
        for file in files:
            if file.endswith(('.tsx', '.astro', '.ts', '.jsx', '.js')):
                file_path = os.path.join(root, file)
                try:
                    with open(file_path, 'r', encoding='utf-8') as f:
                        all_files_content.append((file_path, f.read()))
                except Exception:
                    pass

    unused_list = [
        "src/components/Actor000.tsx",
        "src/components/Actor001.tsx",
        "src/components/Actor002.tsx",
        "src/components/Actor005.tsx",
        "src/components/Chronicles.astro",
        "src/components/Hero.astro",
        "src/components/LifeLog.astro",
        "src/components/Location000App.tsx",
        "src/components/Location001App.tsx",
        "src/components/Location002App.tsx",
        "src/components/Location005App.tsx",
        "src/components/Profile000.tsx",
        "src/components/ProjectStatus.tsx",
        "src/components/Script000App.tsx",
        "src/components/Script001App.tsx",
        "src/components/actor/000.tsx",
        "src/components/character-sheet/CharacterSheet.tsx",
        "src/components/event-004/AIPresentationTerminal.tsx",
        "src/components/event-004/CoordinateRegistry.tsx",
        "src/components/event-004/DirectoryExplorer.tsx",
        "src/components/event-004/Event004App.tsx",
        "src/components/home.000.00/components/FullSchemaDatabase.tsx",
        "src/components/sheet-000/components/AIPresentationTerminal.tsx",
        "src/components/sheet-000/components/DirectoryExplorer.tsx",
        "src/components/sheet-001/components/AIPresentationTerminal.tsx",
        "src/components/sheet-001/components/DirectoryExplorer.tsx",
        "src/components/sheet-002/components/AIPresentationTerminal.tsx",
        "src/components/sheet-002/components/DirectoryExplorer.tsx",
        "src/components/sheet-005/components/AIPresentationTerminal.tsx",
        "src/components/sheet-005/components/DirectoryExplorer.tsx",
    ]

    # We should delete the files
    for u in unused_list:
        if os.path.exists(u):
            print(f"Deleting {u}")
            os.remove(u)

    # Also delete subfolders if they are empty
    for root, dirs, files in os.walk('src/components', topdown=False):
        for d in dirs:
            dir_path = os.path.join(root, d)
            if not os.listdir(dir_path):
                print(f"Deleting empty dir {dir_path}")
                os.rmdir(dir_path)

if __name__ == '__main__':
    main()
