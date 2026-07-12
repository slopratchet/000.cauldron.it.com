from playwright.sync_api import sync_playwright
import time

def main():
    with sync_playwright() as p:
        browser = p.chromium.launch()
        page = browser.new_page(viewport={"width": 1920, "height": 1080})
        page.goto("http://localhost:4321/lobby")
        # Click the full screen
        page.locator("button:has-text('Open Full Screen')").nth(0).click()
        time.sleep(2)
        # Get iframe dimensions
        dims = page.evaluate('''() => {
            const el = document.querySelector("#landscape-container > div:nth-child(2) > div");
            if(el) {
               return {width: el.clientWidth, height: el.clientHeight, windowW: window.innerWidth, windowH: window.innerHeight};
            }
            const iframe = document.querySelector("iframe#app-iframe");
            if(iframe) {
               return {width: iframe.clientWidth, height: iframe.clientHeight, windowW: window.innerWidth, windowH: window.innerHeight};
            }
            return null;
        }''')
        print("Dimensions:", dims)
        browser.close()

if __name__ == "__main__":
    main()
