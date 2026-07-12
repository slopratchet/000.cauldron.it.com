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

        # We need the iframe to take all available space AND we need the container to NOT be full of gaps.
        page.evaluate('''() => {
            const container = document.querySelector(".fixed");
            if (container) {
                container.style.display = 'flex';
                container.style.alignItems = 'center';
                container.style.justifyContent = 'center';
                // the container is bg-black which creates the black gap
            }
            const iframe = document.querySelector("#app-iframe");
            if (iframe) {
                iframe.style.width = '100vw';
                iframe.style.height = '100vh';
                // Use a scale trick
                // If the internal iframe requires aspect ratio, let's just make the iframe 100% of the screen.
                iframe.style.width = '100vw';
                iframe.style.height = '100vh';
                iframe.style.maxWidth = '100%';
                iframe.style.maxHeight = '100%';
                iframe.style.aspectRatio = 'auto';
            }
        }''')
        time.sleep(2)
        page.screenshot(path="landscape_scaled_9.png")
        print("Screenshot saved to landscape_scaled_9.png")
        browser.close()

if __name__ == "__main__":
    main()
