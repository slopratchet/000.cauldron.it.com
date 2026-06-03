import re

with open('src/styles/global.css', 'r') as f:
    content = f.read()

# Add theme variables
theme_vars = """
  --font-anton: "Anton", sans-serif;
  --font-tinos: "Tinos", serif;
  --font-jetbrains: "JetBrains Mono", monospace;
"""

if '--font-anton' not in content:
    content = re.sub(r'(@theme\s*{)', r'\1' + theme_vars, content)

# Add utility classes
utils = """
@utility brutalist-border-thick {
  border: 4px solid #000000;
}
@utility brutalist-shadow-sm {
  box-shadow: 4px 4px 0px 0px rgba(0,0,0,1);
}
"""

if 'brutalist-border-thick' not in content:
    content += f"\n{utils}\n"

with open('src/styles/global.css', 'w') as f:
    f.write(content)
