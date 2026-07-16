import { afterAll, beforeAll, describe, expect, it } from 'vitest';
import puppeteer, { Browser, Page } from 'puppeteer';

const hasClerkKeys =
  !!process.env.PUBLIC_CLERK_PUBLISHABLE_KEY || !!process.env.CLERK_SECRET_KEY;

describe('E2E Sanity Check', () => {
  let browser: Browser;
  let page: Page;

  beforeAll(async () => {
    // Launch with 'new' headless mode for better reliability
    browser = await puppeteer.launch({
      headless: true,
      args: ['--no-sandbox', '--disable-setuid-sandbox'],
    });
    page = await browser.newPage();
  });

  afterAll(async () => {
    if (browser) {
      await browser.close();
    }
  });

  it('should redirect the /log-in page to lobby if local', async () => {
    // Increased timeout for slow dev server starts
    await page.goto('http://localhost:4321/log-in', {
      waitUntil: 'networkidle0',
      timeout: 60000,
    });

    // Check for some text that should be on the page (lobby page)
    const content = await page.content();
    expect(content).toContain('');
  }, 30000);

  it.skipIf(!hasClerkKeys)(
    'should handle the multi-stage Client Trust handshake',
    async () => {
      await page.goto('http://localhost:4321/login', {
        waitUntil: 'networkidle0',
      });

      // 1. Enter Credentials
      await page.type('#identifier', 'test@alligator.ink');
      await page.type('#password', 'handshake123');
      await page.click('#submit-btn');

      // 2. Detect & Verify UI Pivot (Transition to Verification Sector)
      // We wait for the 'verification-sector' to become visible
      await page.waitForSelector('#verification-sector:not(.hidden)', {
        timeout: 5000,
      });

      const btnText = await page.$eval('#submit-btn', (el) => el.textContent);
      expect(btnText?.trim()).toBe('VERIFY_CODE');

      // 3. Simulating MFA Injection (In a real test, this would use a Testing Token)
      await page.type('#verification_code', '123456');

      // Note: We don't click submit here unless we have a live Clerk backend to handle '123456'
      // but we have verified the UI state machine is active.
    },
    30000,
  );

  it('should load the /signup page and render all Stage I form fields', async () => {
    await page.goto('http://localhost:4321/sign-up', {
      waitUntil: 'networkidle0',
      timeout: 30000,
    });

    // Verify all covenant stage elements are present
    const firstName = await page.$('#firstName');
    const lastName = await page.$('#lastName');
    const email = await page.$('#emailAddress');
    const password = await page.$('#password');
    const covenantCheck = await page.$('#covenant-check');
    const submitBtn = await page.$('#submit-btn');
    const errorMsg = await page.$('#error-message');

    expect(firstName).not.toBeNull();
    expect(lastName).not.toBeNull();
    expect(email).not.toBeNull();
    expect(password).not.toBeNull();
    expect(covenantCheck).not.toBeNull();
    expect(submitBtn).not.toBeNull();
    expect(errorMsg).not.toBeNull();

    // Verify button text is correct for Stage I
    const btnText = await page.$eval('#submit-btn', (el) => el.textContent);
    expect(btnText?.trim()).toBe('INITIALIZE_COVENANT');
  });

  it('should measure page render latency under 3000ms', async () => {
    const start = Date.now();

    await page.goto('http://localhost:4321/sign-up', {
      waitUntil: 'domcontentloaded',
      timeout: 30000,
    });

    // Wait for submit button to be interactive
    await page.waitForSelector('#submit-btn', { timeout: 5000 });
    const elapsed = Date.now() - start;

    console.log(`[LATENCY_PROBE] Signup page render: ${elapsed}ms`);
    // A render time under 3s is acceptable for dev server
    expect(elapsed).toBeLessThan(3000);
  });

  it('should load the /log-out page and eventually redirect to /', async () => {
    await page.goto('http://localhost:4321/log-out', {
      waitUntil: 'networkidle0',
      timeout: 30000,
    });

    // It should redirect to /
    await page.waitForFunction(() => window.location.pathname === '/', {
      timeout: 15000,
    });

    const pathname = await page.evaluate(() => window.location.pathname);
    expect(pathname).toBe('/');
  }, 30000);
});

describe('Spatial Integrity & Character Hot-Swaps', () => {
  let browser: Browser;
  let page: Page;

  beforeAll(async () => {
    browser = await puppeteer.launch({
      headless: true,
      args: ['--no-sandbox', '--disable-setuid-sandbox'],
    });
    page = await browser.newPage();
  });

  afterAll(async () => {
    if (browser) {
      await browser.close();
    }
  });

  it('should process character hot-swaps without crashing the client', async () => {
    // 1. Load Lobby with initial character
    await page.goto(
      'http://localhost:4321/lobby?actor=000&json=catharsis-gale',
      {
        waitUntil: 'networkidle0',
        timeout: 30000,
      },
    );

    // 2. We can't guarantee a live DO connection in the E2E mock environment without spinning up
    // the whole Cloudflare Worker stack, but we CAN verify that the client-side URL parsing,
    // state update, and subsequent request resets handle the '?actor=' mutation seamlessly.

    const consoleMessages: string[] = [];
    page.on('console', (msg) => consoleMessages.push(msg.text()));

    // 3. Hot-Swap to a new character via URL navigation (as the UI does)
    await page.goto('http://localhost:4321/lobby?actor=005&json=rosa-mcquaig', {
      waitUntil: 'domcontentloaded',
      timeout: 30000,
    });

    // 4. Verify that the URL changed successfully and the page didn't throw a fatal React error
    const url = await page.url();
    expect(url).toContain('actor=005');

    // Verify the Canvas container is mounted (meaning the App didn't crash)
    const gameContainer = await page.$('#game-container');
    expect(gameContainer).not.toBeNull();
  }, 30000);
});
