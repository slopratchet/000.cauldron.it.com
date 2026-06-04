import re

def extract_character_data(filepath):
    with open(filepath, 'r') as f:
        content = f.read()

    # Just find everything inside the array
    match = re.search(r'export const DEFAULT_SUBJECTS:\s*CharacterRecord\[\]\s*=\s*\[(.*?)\];', content, re.DOTALL)
    if match:
        return match.group(1).strip()
    return None

if __name__ == '__main__':
    data = extract_character_data('src/components/sheet-001/data.ts')
    print(data[:200] if data else "None")
