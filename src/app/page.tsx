"use client";

import { DOWNLOAD_MARKDOWN_PDF_API_URL, DOWNLOAD_PDF_API_URL } from "@/constants/apiEndpoints";
import { useState } from "react";

export default function Home() {
  const [isDownloading, setIsDownloading] = useState(false);
  const [isDownloadingMarkdown, setIsDownloadingMarkdown] = useState(false);

  const downloadReportPdf = async () => {
    setIsDownloading(true);
    try {
      const response = await fetch(DOWNLOAD_PDF_API_URL, {
        method: "GET",
        headers: {
          "Content-Type": "application/pdf",
          Accept: "application/pdf",
        },
      });

      if (!response.ok) {
        throw new Error(`Failed to download PDF: ${response.statusText}`);
      }

      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = "report.pdf";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);
    } catch (error) {
    } finally {
      setIsDownloading(false);
    }
  };

  const downloadMarkdownPdf = async () => {
    setIsDownloadingMarkdown(true);
    try {
      // Replace with your actual endpoint for Markdown PDF
      const response = await fetch(DOWNLOAD_MARKDOWN_PDF_API_URL, {
        method: "GET",
        headers: {
          "Content-Type": "application/pdf",
          Accept: "application/pdf",
        },
      });

      if (!response.ok) {
        throw new Error(
          `Failed to download Markdown PDF: ${response.statusText}`
        );
      }

      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = "markdown.pdf";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);
    } catch (error) {
    } finally {
      setIsDownloadingMarkdown(false);
    }
  };

  return (
    <div className="min-h-screen p-8 flex items-center justify-center font-[family-name:var(--font-geist-sans)]">
      <main className="flex gap-4">
        {/* Download PDF Button */}
        <button
          onClick={downloadReportPdf}
          disabled={isDownloading}
          className="flex items-center px-4 py-2 font-semibold text-white bg-blue-600 rounded hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
        >
          {isDownloading ? (
            <span className="animate-spin mr-2 h-4 w-4 border-2 border-white border-t-transparent rounded-full"></span>
          ) : (
            <svg
              className="w-4 h-4 mr-2"
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 4v16m0 0l-6-6m6 6l6-6"
              />
            </svg>
          )}
          {isDownloading ? "Downloading..." : "Download PDF"}
        </button>

        {/* Download Markdown PDF Button */}
        <button
          onClick={downloadMarkdownPdf}
          disabled={isDownloadingMarkdown}
          className="flex items-center px-4 py-2 font-semibold text-white bg-yellow-600 rounded hover:bg-yellow-700 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
        >
          {isDownloadingMarkdown ? (
            <span className="animate-spin mr-2 h-4 w-4 border-2 border-white border-t-transparent rounded-full"></span>
          ) : (
            <svg
              className="w-4 h-4 mr-2"
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 4v16m0 0l-6-6m6 6l6-6"
              />
            </svg>
          )}
          {isDownloadingMarkdown ? "Downloading..." : "Download Markdown PDF"}
        </button>
      </main>
    </div>
  );
}
