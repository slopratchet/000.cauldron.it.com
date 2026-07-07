from playwright.sync_api import sync_playwright

with sync_playwright() as p:
    browser = p.chromium.launch()
    page = browser.new_page()
    page.goto('http://localhost:4321/lobby')
    page.wait_for_timeout(2000)
    page.screenshot(path='lobby_screenshot_final.png', full_page=True)
    browser.close()
