import sys

def replace_in_file(filepath, new_filepath, replacements):
    with open(filepath, 'r') as f:
        content = f.read()

    for old_str, new_str in replacements.items():
        content = content.replace(old_str, new_str)

    with open(new_filepath, 'w') as f:
        f.write(content)

replacements = {
    "import Location000App from '../../components/Location000App.tsx';": "import Location001App from '../../components/Location001App.tsx';",
    '<Location000App client:load />': '<Location001App client:load />',
    'METROPOLIS RECON': 'ONTOLOGICAL ENGINE',
    'Urban Decay Study Plate 012': 'Stress Test of Creation',
    'URBAN RUIN CONTEXT': 'TYPE III CIVILIZATION',
    'SCAN DATE: 1970-08-12': 'OPERATION: ARMADA RESCUE',
    'SCALE: 1:5000': 'DISTANCE: 100 LIGHTYEARS',
    'VISUAL FEED: SECTOR A-12': 'VISUAL FEED: PARADOX COLLIDER',
    '// SENSORS DETECT HIGH STRUCTURAL DECAY //': '// SENSORS DETECT ABSOLUTE JOY AND AGONY //',
    'PLATE_012_REFERENCE': 'FREE_BELIEF_GENERATION',
    'Biomass Infestation': 'Cognitive Architecture',
    'LEVEL 3 DETECTED': 'MUTUAL ANNIHILATION',
    'Biological Markers': 'Engine Status',
    'Aggressive vine propagation (Type-B)': 'Paradox Collider engaged',
    'Spore concentration in flooded zones': 'Free Belief volume critical',
    'Nocturnal fauna activity (Unclassified)': 'Bimodal Syntax compiled',
    'Atmospheric Data': 'State Translation',
    'HUMIDITY:': 'ARMADA:',
    '92%': 'TRANSLATED',
    'TOXICITY:': 'LOCATION:',
    'MODERATE': 'CORE WORLD',
    'Collapse Risk': 'Catastrophic Garbage Collection',
    'Structural integrity of monoliths is compromised. Zone A\n                      displays imminent failure indicators.': 'The spatial displacement of a thousand ships has generated an unfathomable volume of unassigned entropy (Vector Alpha).',
    'WARNINGS:': 'ROUTING:',
    '- Severe rebar corrosion': '- Macro-Ledger checked',
    '- Foundation displacement': '- Entropy routed to Delta-9',
    '- Hydrostatic pressure buildup': '- Thermodynamic friction applied',
    'ENHANCED INTEL': 'ENTROPIC DEBT',
    'Infiltration Routes': 'Penal Colony Delta-9',
    'Primary Route: Sub-Street': 'Biological Hardware',
    'Accessible via flooded subway vents. High stealth,\n                        medium hazard from structural shifting.': 'Three billion cloned drones instantly calcify into dust.',
    'Secondary: Aerial': 'Planetary Crust',
    'Rappelling from Sector B skyscrapers. Visible to\n                        long-range sensors but avoids ground hazards.': 'Shatters under sudden immense weight. Reduced to radioactive cinder.',
    'XP-884-01': 'MACRO-LEDGER',
    'METRO-RUIN-12': 'CLOSED LOOP',
    'Status Report': 'Final Ledger',
    'Urban decay has reached terminal velocity. Natural\n                      reclamation is exceeding forecasted rates. Suggest\n                      immediate evacuation or fortification of subterranean\n                      bunkers.': 'The armada is safe. The ledger reads zero. The Empire survives for another day, sustained by the industrialized calculus of outsourcing the pain.',
    'CHRONOS SYSTEM': 'ONTOLOGICAL SYSTEM',
    'REF: TOME-1970-PLT-012': 'REF: TYPE-III-SPELL'
}

replace_in_file('src/pages/location/000.astro', 'src/pages/location/001.astro', replacements)
print("Updated 001.astro")
