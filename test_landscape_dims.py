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

        # Get iframe dimensions
        dims = page.evaluate('''() => {
            const iframe = document.querySelector("#app-iframe");
            if(iframe) {
               return {
                 width: iframe.clientWidth,
                 height: iframe.clientHeight,
                 styleWidth: iframe.style.width,
                 styleHeight: iframe.style.height,
                 windowW: window.innerWidth,
                 windowH: window.innerHeight
               };
            }
            const div = document.querySelector(".fixed > div");
            if(div) {
               return {
                 width: div.clientWidth,
                 height: div.clientHeight,
                 styleWidth: div.style.width,
                 styleHeight: div.style.height,
                 windowW: window.innerWidth,
                 windowH: window.innerHeight
               };
            }
            return null;
        }''')
        print("Landscape Dimensions:", dims)
        browser.close()

if __name__ == "__main__":
    main()
