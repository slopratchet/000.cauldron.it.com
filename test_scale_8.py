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

        # Modify the iframe style to test the max-width/max-height approach
        page.evaluate('''() => {
            const iframe = document.querySelector("#app-iframe");
            if (iframe) {
                iframe.style.width = '100vw';
                iframe.style.height = '100vh';
                iframe.style.maxWidth = 'calc(100vh * (1280 / 720))';
                iframe.style.maxHeight = 'calc(100vw * (720 / 1280))';
                iframe.style.aspectRatio = 'auto'; // ensure it does not conflict
            }
        }''')
        time.sleep(2)
        page.screenshot(path="landscape_scaled_4.png")
        print("Screenshot saved to landscape_scaled_4.png")
        browser.close()

if __name__ == "__main__":
    main()
