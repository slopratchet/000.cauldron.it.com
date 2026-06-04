import re
import os

data_path = 'src/components/know-001/data.ts'

with open(data_path, 'r') as f:
    content = f.read()

# Replace FAQ_DATA
new_faq_data = """export const FAQ_DATA: FAQItem[] = [
  {
    id: 'pass-one',
    category: 'THE ANATOMY OF THE CREATIVE INTERROGATION',
    question: 'PASS ONE: THE VISCERAL RESPONSE',
    answer: "The first read-through must be done without analytical pausing. The objective is to experience the story as a pure piece of cinema or theater. This pass identifies the macro-tonal shift of the work. If a script feels suffocating, the design must lean into low ceilings, heavy textures, and restricted sightlines, even if the scene descriptions do not explicitly demand them.",
    highlightWords: ['macro-tonal shift of the work'],
  },
  {
    id: 'pass-two',
    category: 'THE ANATOMY OF THE CREATIVE INTERROGATION',
    question: 'PASS TWO: THE STRUCTURAL DECONSTRUCTION',
    answer: "The second read is an exhaustive, scene-by-scene interrogation where the script is treated as a crime scene. The designer looks for explicit facts, implicit requirements, and structural transitions.",
  },
  {
    id: 'pass-three',
    category: 'THE ANATOMY OF THE CREATIVE INTERROGATION',
    question: 'PASS THREE: THE PSYCHOLOGICAL & THEMATIC SUBTEXT',
    answer: "The third read looks past the text and into the subtext. It examines character arcs, thematic motifs, and psychological states, mapping them directly onto physical spaces.",
  },
  {
    id: 'spatial-volume',
    category: 'PILLARS OF SCENOGRAPHIC INTERPRETATION',
    question: 'I. SPATIAL VOLUME AND BOUNDARY',
    answer: "The script dictates where a scene happens, but the designer determines how much space that scene needs to convey its psychological reality.",
  },
  {
    id: 'chronological-metric',
    category: 'PILLARS OF SCENOGRAPHIC INTERPRETATION',
    question: 'II. THE CHRONOLOGICAL METRIC',
    answer: "Sets should rarely look like they were built yesterday; they must look like they have existed across time. The designer scans the text for clues about the history of the environment.",
  },
  {
    id: 'psychological-architecture',
    category: 'PILLARS OF SCENOGRAPHIC INTERPRETATION',
    question: 'III. PSYCHOLOGICAL ARCHITECTURE',
    answer: "The environment must act as an externalization of the characters' internal worlds. The designer tracks emotional arcs through architectural transitions.",
  },
];"""

content = re.sub(r'export const FAQ_DATA: FAQItem\[\] = \[\s*\{.*?\},\s*\];', new_faq_data, content, flags=re.DOTALL)

# Replace SYSTEM_WARNING
new_system_warning = """export const SYSTEM_WARNING = {
  header: 'SCENOGRAPHIC METRICS',
  badge: 'CAUTION DESIGNER',
  text: 'Note to designers: The script markup is not a passive reading exercise; it is an act of forensic translation. It is the precise moment where literature is taken apart and rebuilt as physical architecture, texture, color, and spatial geometry.',
};"""

content = re.sub(r'export const SYSTEM_WARNING = \{.*?\};', new_system_warning, content, flags=re.DOTALL)

# For CAST_DATA, we can replace it with something thematic or leave it as it's not prominently mentioned. Let's make it thematic about domains.
new_cast_data = """export const CAST_DATA: CastMember[] = [
  {
    id: 'violet',
    name: 'VIOLET / PURPLE',
    role: 'ARCHITECTURE',
    title: 'Interior/Exterior Architecture',
    hp: 100,
    maxHp: 100,
    stats: { STR: 20, DEX: 10, CON: 20, INT: 15, WIS: 15, CHA: 10 },
    signatureAbility: 'Structural Layout',
    quote: 'Built sets, locations, modifications.',
    bio: 'Structural layout, doors, windows, structural materials.',
    woodcutImg: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&q=80&w=200',
  },
  {
    id: 'blue',
    name: 'BLUE',
    role: 'ATMOSPHERICS',
    title: 'Environmental Factors / SFX',
    hp: 80,
    maxHp: 80,
    stats: { STR: 10, DEX: 15, CON: 10, INT: 20, WIS: 20, CHA: 15 },
    signatureAbility: 'Weather & Time',
    quote: 'Fog, smoke, rain, fire.',
    bio: 'Weather, practical atmospheric elements, time of day shifts affecting light fixtures.',
    woodcutImg: 'https://images.unsplash.com/photo-1618336753974-aae8e04506aa?auto=format&fit=crop&q=80&w=200',
  },
];"""

content = re.sub(r'export const CAST_DATA: CastMember\[\] = \[\s*\{.*?\},\s*\];', new_cast_data, content, flags=re.DOTALL)

with open(data_path, 'w') as f:
    f.write(content)

print("data.ts updated successfully.")
