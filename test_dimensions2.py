from playwright.sync_api import sync_playwright
import time

def main():
    with sync_playwright() as p:
        browser = p.chromium.launch()
        page = browser.new_page(viewport={"width": 1920, "height": 1080})
        page.goto("http://localhost:4321/lobby")
        time.sleep(2)
        # Click landscape open full screen
        page.locator("button:has-text('Open Full Screen')").nth(0).click()
        time.sleep(2)

        # Get elements
        dims = page.evaluate('''() => {
            const divs = document.querySelectorAll(".fixed");
            if (divs.length === 0) return null;
            const container = divs[0];
            const inner = container.querySelector("div");
            return {
                 containerW: container.clientWidth,
                 containerH: container.clientHeight,
                 innerW: inner ? inner.clientWidth : null,
                 innerH: inner ? inner.clientHeight : null,
                 innerWidth: window.innerWidth,
                 innerHeight: window.innerHeight
            };
        }''')
        print("Landscape Dimensions:", dims)
        browser.close()

if __name__ == "__main__":
    main()
