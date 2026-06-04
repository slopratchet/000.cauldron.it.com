import re

with open('src/components/know-001/components/FaqScreen.tsx', 'r') as f:
    content = f.read()

# Let's remove the TAVERN SENSORS and NATIONAL TOUR and CAUTION ADVENTURER from FaqScreen if they don't apply to the markup data, but we can also just update them to match the new topic. The image mock-up has:
# "CAUTION ADVENTURER" ... "Note to players: The Tavern is a high-interactivity zone..." -> The image mock-up *actually* has the original text for Caution Adventurer, National Tour, and Tavern Sensors!
# So they should stay EXACTLY as they are.

# Check the image: The image HAS: "CAUTION ADVENTURER", "NATIONAL TOUR", and "TAVERN SENSORS".
# This means we only needed to update the left column and the top header.
