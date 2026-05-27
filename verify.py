import sys
from playwright.sync_api import sync_playwright

def verify():
    with sync_playwright() as p:
        browser = p.chromium.launch()
        context = browser.new_context(record_video_dir="/home/jules/verification/videos/")
        page = context.new_page()
        page.set_viewport_size({"width": 1280, "height": 800})

        try:
            page.goto("http://localhost:4321/000-artefact-page")
            page.wait_for_timeout(2000)  # Wait for fonts to load
            page.screenshot(path="/home/jules/verification/screenshots/screenshot.png")
            print("Screenshot saved to /home/jules/verification/screenshots/screenshot.png")
        except Exception as e:
            print(f"Error: {e}")
            sys.exit(1)
        finally:
            context.close()
            browser.close()

if __name__ == "__main__":
    verify()
