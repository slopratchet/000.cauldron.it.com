import re

def update_file(filename):
    with open(filename, "r") as f:
        content = f.read()

    # The regex replacement broke because I literally inserted escaped backslashes into the code.
    content = content.replace(r"isFullScreen \? \{ width: '1280px', height: '720px', transform: `scale(${scale})`, transformOrigin: 'center center' \} : \{ width: '100%', height: '100%' \}",
                              "isFullScreen ? { width: '1280px', height: '720px', transform: `scale(${scale})`, transformOrigin: 'center center' } : { width: '100%', height: '100%' }")

    with open(filename, "w") as f:
        f.write(content)

update_file("src/components/lobby-index/OperationalLandscape.tsx")
update_file("src/components/control-index/OperationalLandscape.tsx")
