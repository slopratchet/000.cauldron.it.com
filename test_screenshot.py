from playwright.sync_api import sync_playwright

def main():
    with sync_playwright() as p:
        browser = p.chromium.launch()
        page = browser.new_page(viewport={"width": 1920, "height": 1080})
        page.goto('http://localhost:4321/000-catalog-page')
        page.wait_for_load_state('networkidle')
        page.screenshot(path='/home/jules/verification/screenshots/000-catalog-page-full-1080.png', full_page=True)
        browser.close()

if __name__ == "__main__":
    main()
