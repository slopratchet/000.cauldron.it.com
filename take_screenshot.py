import asyncio
from playwright.async_api import async_playwright

async def main():
    async with async_playwright() as p:
        browser = await p.chromium.launch()
        page = await browser.new_page()
        # Ensure we set a large enough viewport
        await page.set_viewport_size({"width": 1280, "height": 1080})
        await page.goto("http://localhost:4321/lobby?logs=true&schema=true")
        await page.wait_for_timeout(4000)
        await page.screenshot(path="current_state.png", full_page=True)
        await browser.close()

asyncio.run(main())
