from playwright.sync_api import sync_playwright
import time

def main():
    with sync_playwright() as p:
        browser = p.chromium.launch()
        page = browser.new_page(viewport={"width": 1920, "height": 1080})
        page.goto("http://localhost:4321/lobby")
        time.sleep(2)
        print("Clicking landscape Open Full Screen...")
        page.locator("button:has-text('Open Full Screen')").nth(0).click()
        time.sleep(2)

        # Check if isFullScreen applied
        is_fullscreen = page.evaluate('document.querySelector("#upper-grid-deck > div").className.includes("fixed") || document.querySelector("#landscape-container > div:nth-child(2)").className.includes("fixed")')
        print("Is Fullscreen Fixed:", is_fullscreen)

        page.screenshot(path="landscape_patched_debug.png")
        print("Screenshot saved to landscape_patched_debug.png")
        browser.close()

if __name__ == "__main__":
    main()
