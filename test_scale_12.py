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
                // Wait, if aspect-ratio: 1280 / 720 was in there, what happens if we set both width and height?
                // The green box inside the iframe seems to be aspect-video.
                // We want the green box to fill the entire space (and we should keep the 1280/720 ratio of the IFRAME)
                // But the user said: "make sure it takes up all available space and keeps the proportions between 1280 width and 720 height"
                // If it keeps proportions, it will have gaps on a 1920x1080 screen? No, 1920/1080 IS 16:9, same as 1280/720!
                // So it should take up exactly the full screen on 1920x1080 without any gaps.
                // But currently it has gaps! Why? Because 1920x1080 has the "Close" button maybe?

                // Let's check the window dimensions vs iframe dimensions.
                iframe.style.width = '100vw';
                iframe.style.height = '100vh';
                // Remove the max-width/max-height calculation which might be off due to scrollbars etc.
                iframe.style.maxWidth = '100%';
                iframe.style.maxHeight = '100%';
                iframe.style.aspectRatio = '1280 / 720';
            }
        }''')
        time.sleep(2)
        page.screenshot(path="landscape_scaled_8.png")
        print("Screenshot saved to landscape_scaled_8.png")
        browser.close()

if __name__ == "__main__":
    main()
