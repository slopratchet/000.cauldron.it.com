from playwright.sync_api import sync_playwright
import time

def main():
    with sync_playwright() as p:
        browser = p.chromium.launch()
        page = browser.new_page(viewport={"width": 1920, "height": 1080})
        page.goto("http://localhost:4321/lobby")
        time.sleep(5)
        # Click the first one which should be landscape
        page.locator("button:has-text('Open Full Screen')").nth(0).click()
        time.sleep(5)
        page.screenshot(path="landscape_fullscreen2.png")
        print("Screenshot saved to landscape_fullscreen2.png")
        browser.close()

if __name__ == "__main__":
    main()
