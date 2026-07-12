from playwright.sync_api import sync_playwright
import time

def main():
    with sync_playwright() as p:
        browser = p.chromium.launch()
        page = browser.new_page(viewport={"width": 1920, "height": 1080})
        page.goto("http://localhost:4321/lobby")
        time.sleep(2)
        page.locator("button:has-text('Open Full Screen')").nth(0).click()
        time.sleep(2)

        # Check computed transform
        scale = page.evaluate('window.getComputedStyle(document.querySelector("#app-iframe")).transform')
        print("Transform:", scale)
        dims = page.evaluate('document.querySelector("#app-iframe").getBoundingClientRect()')
        print("Dims:", dims)

        # Check viewport
        viewport = page.evaluate('{width: window.innerWidth, height: window.innerHeight}')
        print("Viewport:", viewport)

        browser.close()

if __name__ == "__main__":
    main()
