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

        page.evaluate('''() => {
            const iframe = document.querySelector("#app-iframe");
            if (iframe) {
                iframe.style.width = '100vw';
                iframe.style.height = '100vh';
                // Remove the max-width and max-height logic
                iframe.style.maxWidth = '100vw';
                iframe.style.maxHeight = '100vh';
                // Let the browser handle aspect ratio
                iframe.style.aspectRatio = 'auto';
            }
        }''')
        time.sleep(2)
        page.screenshot(path="landscape_scaled_7.png")
        print("Screenshot saved to landscape_scaled_7.png")
        browser.close()

if __name__ == "__main__":
    main()
