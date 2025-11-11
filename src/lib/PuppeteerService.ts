/* eslint-disable @typescript-eslint/no-explicit-any */

export default class PuppeteerService {
  private static instance: PuppeteerService | null = null;
  private browser: any = null;
  private cachedExecutablePath: string | null = null;
  private downloadPromise: Promise<string> | null = null;
  private isVercel = !!process.env.VERCEL_ENV;

  private constructor() {}

  public static getInstance() {
    if (!PuppeteerService.instance) PuppeteerService.instance = new PuppeteerService();
    return PuppeteerService.instance;
  }

  private async getChromiumPath(): Promise<string> {

    // URL to the Chromium binary package hosted in /public, if not in production, use a fallback URL
// alternatively, you can host the chromium-pack.tar file elsewhere and update the URL below
// const CHROMIUM_PACK_URL = process.env.VERCEL_PROJECT_PRODUCTION_URL
//   ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}/chromium-pack.tar`
//   : "https://github.com/gabenunez/puppeteer-on-vercel/raw/refs/heads/main/example/chromium-dont-use-in-prod.tar";


    if (this.cachedExecutablePath) return this.cachedExecutablePath;
    if (!this.downloadPromise) {
      const chromium = (await import("@sparticuz/chromium-min")).default;
      this.downloadPromise = chromium
        .executablePath("https://github.com/gabenunez/puppeteer-on-vercel/raw/refs/heads/main/example/chromium-dont-use-in-prod.tar")
        .then((p) => {
          this.cachedExecutablePath = p;
          return p;
        })
        .catch((err) => {
          this.downloadPromise = null;
          throw err;
        });
    }
    return this.downloadPromise;
  }

  private async ensureBrowser() {
    if (this.browser) return this.browser;

    const launchOptions: any = { headless: true };
    let puppeteerModule: any;

    if (this.isVercel) {
      const chromium = (await import("@sparticuz/chromium-min")).default;
      puppeteerModule = await import("puppeteer-core");
      const executablePath = await this.getChromiumPath();
      Object.assign(launchOptions, {
        args: chromium.args,
        executablePath,
      });
    } else {
      puppeteerModule = await import("puppeteer");
    }

    this.browser = await puppeteerModule.launch(launchOptions);
    return this.browser;
  }

  public async newPage() {
    const browser = await this.ensureBrowser();
    const page = await browser.newPage();
    return page;
  }

  public async generatePdfFromHtml(html: string, pdfOptions: any = {}) {
    const page = await this.newPage();
    await page.setContent(html, { waitUntil: "networkidle0" });
    const pdf = await page.pdf({
      format: "A4",
      printBackground: true,
      margin: { top: "20px", right: "20px", bottom: "20px", left: "20px" },
      ...pdfOptions,
    });
    await page.close();
    return pdf;
  }

  public async closeBrowser() {
    if (this.browser) {
      try {
        await this.browser.close();
      } finally {
        this.browser = null;
      }
    }
  }
}