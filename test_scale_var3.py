from playwright.sync_api import sync_playwright

def main():
    with sync_playwright() as p:
        browser = p.chromium.launch()
        page = browser.new_page(viewport={"width": 1920, "height": 1080})
        page.set_content("""
        <html>
            <body style="margin: 0;">
                <div style="width: 100vw; height: 100vh; display: flex; align-items: center; justify-content: center; background: black;">
                    <div id="box" style="width: 1280px; height: 720px; background: red; transform: scale(calc(min(100vw / 1280, 100vh / 720))); transform-origin: center center;"></div>
                </div>
            </body>
        </html>
        """)
        scale = page.evaluate('window.getComputedStyle(document.getElementById("box")).transform')
        print("Transform:", scale)
        dims = page.evaluate('document.getElementById("box").getBoundingClientRect()')
        print("Dims:", dims)
        browser.close()

if __name__ == "__main__":
    main()
