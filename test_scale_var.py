from playwright.sync_api import sync_playwright

def main():
    with sync_playwright() as p:
        browser = p.chromium.launch()
        page = browser.new_page()
        page.set_content("""
        <style>
          .scaled {
             --scale: min(calc(100vw / 1280), calc(100vh / 720));
             transform: scale(var(--scale));
             width: 1280px;
             height: 720px;
             background: red;
          }
        </style>
        <html>
            <body>
                <div id="box" class="scaled"></div>
            </body>
        </html>
        """)
        scale = page.evaluate('window.getComputedStyle(document.getElementById("box")).transform')
        print("Transform:", scale)
        dims = page.evaluate('document.getElementById("box").getBoundingClientRect()')
        print("Dims:", dims)
        browser.close()

if __name__ == "__main__":
    main()
