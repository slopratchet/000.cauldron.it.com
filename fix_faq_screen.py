import re

file_path = 'src/components/know-001/components/FaqScreen.tsx'
with open(file_path, 'r') as f:
    content = f.read()

# Replace WARNING CAUTION ADVENTURER box with SYSTEM WARNING
new_warning = """            {/* SIDE BOX A: SYSTEM WARNING (Caution Designer) */}
            <div
              id="warning-caution-box"
              className="border-4 border-black bg-white p-6 shadow-brutalist relative"
            >
              {/* Heavy warning system outline banner */}
              <div className="border-2 border-blood-red p-4 bg-orange-50/50">
                <div className="flex items-center gap-2 mb-2">
                  <AlertTriangle className="h-5 w-5 text-blood-red shrink-0" />
                  <span className="font-mono font-black text-blood-red tracking-widest text-xs uppercase animate-pulse">
                    {SYSTEM_WARNING.badge}
                  </span>
                </div>
                <div className="font-mono text-xs text-blood-red font-bold uppercase mb-3 border-b border-blood-red pb-1">
                  {SYSTEM_WARNING.header}
                </div>
                <p className="font-serif italic text-sm text-neutral-800 leading-relaxed">
                  {SYSTEM_WARNING.text}
                </p>
              </div>

              {/* Small structural stamp */}
              <div className="mt-4 flex items-center justify-between font-mono text-[10px] text-neutral-400">
                <span>SEAL_CODE: SCRIPT-1970</span>
                <span>ARCHIVE_OFFICIAL</span>
              </div>
            </div>"""

content = re.sub(r'\{\/\* SIDE BOX A.*?<\/div>\n            <\/div>', new_warning, content, flags=re.DOTALL)

with open(file_path, 'w') as f:
    f.write(content)

print("FaqScreen.tsx updated successfully.")
