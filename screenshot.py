from playwright.sync_api import sync_playwright

def run():
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        page = browser.new_page()
        page.set_viewport_size({"width": 1280, "height": 1024})

        # Navigate to know/001
        page.goto('http://localhost:4321/know/001')
        page.wait_for_timeout(2000)
        page.screenshot(path='/home/jules/verification/screenshots/know-001.png', full_page=True)

        browser.close()

if __name__ == '__main__':
    run()
