from playwright.sync_api import sync_playwright

def main():
    with sync_playwright() as p:
        browser = p.chromium.launch()
        page = browser.new_page(viewport={"width": 1920, "height": 1080})
        page.goto("https://react.mmorpg.it.com/canvas?ui=false")
        page.screenshot(path="iframe.png")
        print("Screenshot saved to iframe.png")
        browser.close()

if __name__ == "__main__":
    main()
