import sys

def replace_in_file(filepath, new_filepath, replacements):
    with open(filepath, 'r') as f:
        content = f.read()

    for old_str, new_str in replacements.items():
        content = content.replace(old_str, new_str)

    with open(new_filepath, 'w') as f:
        f.write(content)

replacements = {
    'export default function App()': 'export default function Location001App()',
    'FIG. 31: PRIMARY THEATER BLUEPRINT': 'FIG. 01: ONTOLOGICAL ENGINE DATACENTER',
    'Scale': 'Power Draw',
    '1:48 (1/4" = 1\'-0")': 'EXAWATT TIER',
    'Capacity': 'Processors',
    '1200 DEPLOYED UNITS': '3M VAT-GROWN BRAINS',
    'Last Sync': 'Ledger Status',
    '14 OCT 1974': 'VECTOR ALPHA (ZEROED)',
    'ACTIVE SORTIE': 'SPIN-UP ENGAGED',
    'THEATER ZONES': 'DATACENTER ZONES',
    'The Pit': 'The Paradox Collider',
    'General Admission / High Density': 'Cognitive Annihilation Chamber',
    'Orchestra': 'The Fractal Loom',
    'Tiered Command Seating': 'Bimodal Syntax Compiler',
    'Sound Booth': 'Macro-Ledger',
    'Logistics & Comms Hub': 'Universe Routing Daemon',
    'Mezzanine': 'Penal Colony Delta-9',
    'Strategic Overview Deck': 'Entropy Dump / Cinder State',
    'ACTIVE PLAYS': 'SYSTEMIC EXECUTION',
    '01. INFILTRATION': '01. SPIN-UP',
    '"The tavern must fall before the moon crests."': '"Three million brains injected with joy and agony."',
    '02. EXTRACTION': '02. BIMODAL SYNTAX',
    '"Priority target located in the Balcony wings."': '"GET: Translate Armada. POST: Route friction to Delta-9."',
    '03. REGROUP': '03. GARBAGE COLLECTION',
    '"Stand down until further orders from H.K."': '"Delta-9 calcifies. Ledger reads zero."',
    'VALIDATE BLUEPRINT': 'INITIATE TRANSLATION',
    'Environmental Data': 'Spatial Friction',
    '68°F': 'HIGH',
    '/ HUMIDITY 45%': '/ ENTROPIC DEBT',
    'Personnel Load': 'Displaced Mass',
    '942': '1000',
    '/ 1200 MAX': '/ SHIPS',
    'Structural Integrity': 'Closed Loop State',
    '92%': 'STABLE',
    '/ NOMINAL': '/ BALANCED'
}

replace_in_file('src/components/Location000App.tsx', 'src/components/Location001App.tsx', replacements)
print("Updated Location001App.tsx")
