import re

app_path = "src/components/know-001/App.tsx"

with open(app_path, "r") as f:
    content = f.read()

# Replace bg-parchment-deep with bg-[#E6E2D8]
content = content.replace("bg-parchment-deep", "bg-[#E6E2D8]")

# The amber color `#D97706` is already hardcoded in `App.tsx` where needed:
# <div className="text-[#D97706] border-l-2 pl-3 border-[#D97706]/50">
# <span className="text-[#D97706] shrink-0">G-18</span>

with open(app_path, "w") as f:
    f.write(content)

print("Applied quick fixes to App.tsx")
