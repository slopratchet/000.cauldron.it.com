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

        # What happens if we just set w/h to 100% and ensure the container doesn't force a smaller size?
        page.evaluate('''() => {
            const iframe = document.querySelector("#app-iframe");
            if (iframe) {
                iframe.style.width = '100vw';
                iframe.style.height = '100vh';
                iframe.style.maxWidth = '100vw';
                iframe.style.maxHeight = '100vh';
                iframe.style.aspectRatio = 'auto'; // allow the iframe content to scale
            }
        }''')
        time.sleep(2)
        page.screenshot(path="landscape_scaled_5.png")
        print("Screenshot saved to landscape_scaled_5.png")
        browser.close()

if __name__ == "__main__":
    main()
