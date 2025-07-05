import { NextRequest, NextResponse } from "next/server";

import puppeteer from "puppeteer";

export const GET = async (req: NextRequest) => {

    const pdfId = Math.random().toString(36).substring(2, 15);

  try {
    const htmlContent = `
    <html>
      <head>
       <style>
      @import url('https://fonts.googleapis.com/css2?family=Source+Sans+3:wght@400;600&display=swap');

      body {
        font-family: 'Source Sans 3', Arial, sans-serif;
        font-size: 15.5px;
        color: #111827;
        padding: 20px;
      }

      h1 {
        font-size: 16.5px;
        font-weight: 600;
        margin-top: 1rem;
        padding-top: 0.5rem;
      }

      h2, h3 {
        font-size: 16px;
        font-weight: 600;
        margin-top: 1rem;
        padding-top: 0.5rem;
      }

      h4, h5, h6 {
        font-size: 14px;
        font-weight: 600;
        margin-top: 1rem;
        padding-top: 0.5rem;
      }

      ul, ol {
        padding-left: 1.5rem;
        margin-top: 0.5rem;
        margin-bottom: 0.5rem;
      }

      ul {
        list-style-type: disc;
      }

      ol {
        list-style-type: decimal;
      }

      li {
        margin-bottom: 0.5rem;
        line-height: 1.5;
      }

      a {
        color: #1d4ed8;
        text-decoration: none;
      }

      a:hover {
        text-decoration: underline;
      }

      table {
        width: 100%;
        border-collapse: collapse;
        margin-top: 1rem;
        margin-bottom: 1rem;
      }

      th, td {
        border: 1px solid #e5e7eb;
        padding: 0.5rem;
        text-align: left;
      }

      hr {
        margin: 1rem 0;
        border: none;
        border-top: 1px solid #e5e7eb;
      }
    </style>
      </head>
      <body>
        /* Add HTML content here that you want to include in the PDF */

      </body>
    </html>
  `;

    const browser = await puppeteer.launch({
      headless: true,
      // If used puppeteer-core, ensure you have the correct channel or executable path for Chrome
    //   channel: "chrome", 
      // If you are used the puppeteer then need to modify the executablePath
    //   executablePath: '/home/hassanali/.cache/puppeteer/chrome/linux-138.0.7204.92/chrome-linux64/chrome',
      args: ['--no-sandbox'],
    //   args: [
    //     "--no-sandbox",
    //     "--disable-setuid-sandbox",
    //     "--disable-dev-shm-usage",
    //     "--disable-accelerated-2d-canvas",
    //     "--no-first-run",
    //     "--no-zygote",
    //     "--single-process",
    //     "--disable-gpu",
    //   ],
    });

    const page = await browser.newPage();
    await page.setContent(htmlContent, { waitUntil: "networkidle0" });

    const pdfBuffer = await page.pdf({
      format: "A4",
      printBackground: true,
      margin: {
        top: "20px",
        right: "20px",
        bottom: "20px",
        left: "20px",
      },
    });
    await browser.close();

    return new NextResponse(pdfBuffer, {
      status: 200,
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition": `inline; filename=report-${pdfId}.pdf`,
      },
    });
  } catch (e) {
    console.error("PDF generation error:", e);
    return NextResponse.json(
      {
        error: e instanceof Error ? e.message : "Failed to generate PDF",
        success: false,
      },
      {
        status: 500,
      },
    );
  }
};
