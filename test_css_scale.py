from playwright.sync_api import sync_playwright

def main():
    with sync_playwright() as p:
        browser = p.chromium.launch()
        page = browser.new_page()
        page.set_content("""
        <html>
            <body>
                <div id="box" style="width: 1280px; height: 720px; background: red; transform: scale(calc(min(100vw / 1280, 100vh / 720))); transform-origin: center center;"></div>
            </body>
        </html>
        """)
        # get computed style transform
        scale = page.evaluate('window.getComputedStyle(document.getElementById("box")).transform')
        print("Transform:", scale)
        browser.close()

if __name__ == "__main__":
    main()
