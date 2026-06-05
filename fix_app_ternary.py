with open("src/components/script-000/App.tsx", "r") as f:
    content = f.read()

content = content.replace("{isStreaming ? 'STREAM_PERFORMANCE' : 'STREAM_PERFORMANCE'}", "{isStreaming ? 'STOP_STREAM' : 'STREAM_PERFORMANCE'}")
content = content.replace("py-0.2", "py-0.5")

with open("src/components/script-000/App.tsx", "w") as f:
    f.write(content)

with open("src/components/script-000/NavConsoleCard.tsx", "r") as f:
    content = f.read()

content = content.replace("py-0.2", "py-0.5")

with open("src/components/script-000/NavConsoleCard.tsx", "w") as f:
    f.write(content)
