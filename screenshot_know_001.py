from playwright.sync_api import sync_playwright

def run():
    with sync_playwright() as p:
        browser = p.chromium.launch()
        page = browser.new_page()
        page.goto('http://localhost:4321/know/001')
        page.wait_for_load_state('networkidle')

        # Click on FAQ section to show the custom widgets
        page.evaluate('''
            const buttons = Array.from(document.querySelectorAll('button'));
            const faqBtn = buttons.find(b => b.textContent && b.textContent.includes('FAQ'));
            if (faqBtn) faqBtn.click();
        ''')
        page.wait_for_timeout(2000)

        page.screenshot(path='/home/jules/verification/screenshots/know_001_faq_updated.png', full_page=True)
        browser.close()

if __name__ == '__main__':
    run()
