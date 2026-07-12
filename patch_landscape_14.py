import re

def update_file(filename):
    with open(filename, "r") as f:
        content = f.read()

    # Add scale state
    scale_state_code = """  const [token, setToken] = useState<string | null>(null);
  const [scale, setScale] = useState(1);

  useEffect(() => {
    const handleResize = () => {
      if (isFullScreen) {
        setScale(Math.min(window.innerWidth / 1280, window.innerHeight / 720));
      } else {
        setScale(1);
      }
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [isFullScreen]);"""

    content = content.replace("  const [token, setToken] = useState<string | null>(null);", scale_state_code)

    # Update iframe and placeholder styles
    style_replacement = r"isFullScreen \? \{ width: '1280px', height: '720px', transform: `scale(${scale})`, transformOrigin: 'center center' \} : \{ width: '100%', height: '100%' \}"

    # We replace any old style block with the new one
    content = re.sub(
        r"isFullScreen\s*\?\s*\{\s*width:\s*'1280px',\s*height:\s*'720px',\s*transform:\s*'scale\(calc\(min\(100dvw\s*/\s*1280,\s*100dvh\s*/\s*720\)\)\)',\s*transformOrigin:\s*'center\s*center'\s*\}\s*:\s*\{\s*width:\s*'100%',\s*height:\s*'100%'\s*\}",
        style_replacement,
        content
    )

    # We also need to fix the wrapper to use dvh/dvw as requested by memory
    content = content.replace("h-screen w-screen", "h-dvh w-dvw")

    with open(filename, "w") as f:
        f.write(content)

update_file("src/components/lobby-index/OperationalLandscape.tsx")
update_file("src/components/control-index/OperationalLandscape.tsx")
