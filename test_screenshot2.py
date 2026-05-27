import sys
from playwright.sync_api import sync_playwright
import os

def run():
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        page = browser.new_page()
        page.set_viewport_size({"width": 1280, "height": 1080})
        page.goto("http://localhost:4321/000-catalog-page")
        page.wait_for_load_state("networkidle")
        os.makedirs("verification/screenshots", exist_ok=True)
        page.screenshot(path="verification/screenshots/000-catalog-page-full-1080.png", full_page=True)
        browser.close()

if __name__ == "__main__":
    run()
