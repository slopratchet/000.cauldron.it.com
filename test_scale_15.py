from playwright.sync_api import sync_playwright

def main():
    with sync_playwright() as p:
        browser = p.chromium.launch()
        page = browser.new_page(viewport={"width": 1920, "height": 1080})
        page.set_content("""
        <html>
            <body style="margin: 0; background: blue;">
                <div style="width: 100vw; height: 100vh; display: flex; align-items: center; justify-content: center; background: black;">
                    <!-- Iframe container with responsive scaling, making sure the iframe itself is 1280x720, but then scaled via CSS -->
                    <div style="width: 1280px; height: 720px; transform: scale(calc(min(100vw / 1280, 100vh / 720))); transform-origin: center center;">
                        <iframe src="https://react.mmorpg.it.com/canvas?ui=false" style="width: 1280px; height: 720px; border: none; display: block;"></iframe>
                    </div>
                </div>
            </body>
        </html>
        """)
        import time
        time.sleep(3)
        page.screenshot(path="scale_iframe_css_transform.png")
        print("Screenshot saved to scale_iframe_css_transform.png")
        browser.close()

if __name__ == "__main__":
    main()
