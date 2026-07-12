from playwright.sync_api import sync_playwright

def main():
    with sync_playwright() as p:
        browser = p.chromium.launch()
        page = browser.new_page()
        page.goto("https://react.mmorpg.it.com/canvas?ui=false")
        print(page.content())
        browser.close()

if __name__ == "__main__":
    main()
