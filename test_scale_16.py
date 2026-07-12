from playwright.sync_api import sync_playwright

def main():
    with sync_playwright() as p:
        browser = p.chromium.launch()
        page = browser.new_page(viewport={"width": 1920, "height": 1080})
        page.set_content("""
        <html>
            <body style="margin: 0; background: blue;">
                <div style="width: 100vw; height: 100vh; display: flex; align-items: center; justify-content: center; background: black;">
                    <!-- Another approach: wrapper with width: 100vw, height: calc(100vw * 720 / 1280), max-height: 100vh, max-width: calc(100vh * 1280 / 720) -->
                    <div style="width: 100vw; max-width: calc(100vh * 1280 / 720); aspect-ratio: 1280/720; max-height: 100vh;">
                        <iframe src="https://react.mmorpg.it.com/canvas?ui=false" style="width: 100%; height: 100%; border: none; display: block;"></iframe>
                    </div>
                </div>
            </body>
        </html>
        """)
        import time
        time.sleep(3)
        page.screenshot(path="scale_iframe_css_max_width.png")
        print("Screenshot saved to scale_iframe_css_max_width.png")
        browser.close()

if __name__ == "__main__":
    main()
