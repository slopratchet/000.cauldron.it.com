import sys
from playwright.sync_api import sync_playwright
import time

def take_screenshot():
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        page = browser.new_page(viewport={"width": 1280, "height": 1024})

        # Wait for the dev server to start
        max_retries = 10
        for i in range(max_retries):
            try:
                page.goto("http://localhost:4321/project-status", timeout=5000)
                break
            except Exception as e:
                if i == max_retries - 1:
                    print(f"Failed to connect: {e}")
                    sys.exit(1)
                time.sleep(1)

        page.wait_for_load_state("networkidle")
        page.screenshot(path="verification/screenshots/project-status.png", full_page=True)
        print("Screenshot saved to verification/screenshots/project-status.png")
        browser.close()

if __name__ == "__main__":
    take_screenshot()
