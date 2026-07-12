from playwright.sync_api import sync_playwright

def main():
    with sync_playwright() as p:
        browser = p.chromium.launch()
        page = browser.new_page()
        page.set_content("""
        <html>
            <body>
                <div id="box" style="width: 1280px; height: 720px; background: red; zoom: calc(min(100vw / 1280, 100vh / 720));"></div>
            </body>
        </html>
        """)
        scale = page.evaluate('window.getComputedStyle(document.getElementById("box")).zoom')
        print("Zoom:", scale)
        # get dimensions
        dims = page.evaluate('document.getElementById("box").getBoundingClientRect()')
        print("Dims:", dims)
        browser.close()

if __name__ == "__main__":
    main()
