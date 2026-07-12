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

        # Modify the iframe style to test the scale approach
        page.evaluate('''() => {
            const iframe = document.querySelector("#app-iframe");
            if (iframe) {
                iframe.style.width = '1280px';
                iframe.style.height = '720px';
                iframe.style.aspectRatio = '1280 / 720';
                const scale = Math.min(window.innerWidth / 1280, window.innerHeight / 720);
                iframe.style.transform = `scale(${scale})`;
                iframe.style.transformOrigin = 'center center';
            }
        }''')
        time.sleep(2)
        page.screenshot(path="landscape_scaled_2.png")
        print("Screenshot saved to landscape_scaled_2.png")
        browser.close()

if __name__ == "__main__":
    main()
