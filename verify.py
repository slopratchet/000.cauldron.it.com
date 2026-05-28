from playwright.sync_api import sync_playwright

with sync_playwright() as p:
    browser = p.chromium.launch(headless=True)
    context = browser.new_context(
        record_video_dir="/home/jules/verification/videos/",
        record_video_size={"width": 1280, "height": 720}
    )
    page = context.new_page()
    page.goto("http://localhost:4321/project-status")
    page.wait_for_timeout(2000)
    page.screenshot(path="/home/jules/verification/screenshots/project-status.png")
    context.close()
    browser.close()
