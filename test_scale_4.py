from playwright.sync_api import sync_playwright

def main():
    with sync_playwright() as p:
        browser = p.chromium.launch()
        page = browser.new_page(viewport={"width": 1920, "height": 1080})
        page.set_content("""
        <html>
            <body style="margin: 0; background: blue;">
                <div style="width: 100vw; height: 100vh; display: flex; align-items: center; justify-content: center; background: black;">
                    <iframe src="https://react.mmorpg.it.com/canvas?ui=false" style="width: 1280px; height: 720px; border: none; transform: scale(1.5); transform-origin: center;"></iframe>
                </div>
            </body>
        </html>
        """)
        import time
        time.sleep(3)
        page.screenshot(path="scale_iframe.png")
        print("Screenshot saved to scale_iframe.png")
        browser.close()

if __name__ == "__main__":
    main()
