import { NextRequest, NextResponse } from "next/server";

import puppeteer from "puppeteer";

export const GET = async (req: NextRequest) => {

  console.log(req)

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
        font-size: 22px;
        font-weight: 700;
        margin-top: 1rem;
        padding-top: 0.5rem;
        color: #2563eb;
      }

      h2 {
        font-size: 18px;
        font-weight: 600;
        margin-top: 1.5rem;
        color: #1e293b;
      }

      p {
        margin: 1rem 0;
        line-height: 1.7;
      }

      table {
        width: 100%;
        border-collapse: collapse;
        margin-top: 1.5rem;
        margin-bottom: 1.5rem;
        background: #f9fafb;
      }

      th, td {
        border: 1px solid #e5e7eb;
        padding: 0.75rem;
        text-align: left;
      }

      th {
        background: #2563eb;
        color: #fff;
        font-weight: 600;
      }

      tr:nth-child(even) {
        background: #f1f5f9;
      }

      .note {
        background: #e0f2fe;
        border-left: 4px solid #2563eb;
        padding: 1rem;
        margin: 1.5rem 0;
        border-radius: 6px;
        color: #0369a1;
      }
    </style>
      </head>
      <body>
        <h1>PDF Download Successful!</h1>
        <div class="note">
          You have successfully downloaded this PDF. This document was generated using <b>Puppeteer</b> in a Next.js API route.
        </div>
        <h2>About Puppeteer</h2>
        <p>
          <b>Puppeteer</b> is a Node.js library which provides a high-level API to control Chrome or Chromium over the DevTools Protocol. It can be used for rendering web pages, generating PDFs, taking screenshots, and more.
        </p>
        <h2>Puppeteer vs Puppeteer-core</h2>
        <table>
          <thead>
            <tr>
              <th>Library</th>
              <th>Includes Chromium?</th>
              <th>Use Case</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td><b>puppeteer</b></td>
              <td>Yes</td>
              <td>Downloads a compatible version of Chromium automatically. Easiest for most users.</td>
            </tr>
            <tr>
              <td><b>puppeteer-core</b></td>
              <td>No</td>
              <td>Does <b>not</b> download Chromium. You must specify your own browser executable. Useful for custom environments.</td>
            </tr>
          </tbody>
        </table>
        <p>
          In this implementation, <b>Puppeteer</b> was used to generate and download this PDF file.
        </p>
        <hr />
        <p style="text-align:center; color:#64748b;">
          &copy; ${new Date().getFullYear()} Puppeteer PDF Generator Example
        </p>
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
