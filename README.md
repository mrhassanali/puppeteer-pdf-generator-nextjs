# Puppeteer PDF Generator - Next.js

A Next.js application that demonstrates PDF generation using Puppeteer with two different approaches: HTML-to-PDF conversion and Markdown-to-PDF conversion.

## Features

- 🎯 **HTML to PDF Generation**: Convert structured HTML content to PDF
- 📝 **Markdown to PDF Generation**: Convert Markdown content to styled PDF documents
- 🚀 **Real-time Download**: Instant PDF download with progress indicators
- 🎨 **Styled PDFs**: Custom CSS styling for professional-looking documents
- 📱 **Responsive UI**: Clean, responsive interface with loading states

## Architecture

The application consists of:

### Frontend Components
- **Main Page** ([src/app/page.tsx](src/app/page.tsx)): React component with download buttons and state management
- **API Endpoints**: [`DOWNLOAD_PDF_API_URL`](src/constants/apiEndpoints.ts) and [`DOWNLOAD_MARKDOWN_PDF_API_URL`](src/constants/apiEndpoints.ts)

### Backend API Routes
- **[/api/download-pdf](src/app/api/download-pdf/route.ts)**: Generates PDF from HTML content
- **[/api/download-markdown-pdf](src/app/api/download-markdown-pdf/route.ts)**: Converts Markdown to HTML then to PDF

## How It Works

### 1. HTML to PDF Generation
```typescript
// Triggered by downloadReportPdf function
const response = await fetch(DOWNLOAD_PDF_API_URL, {
  method: "GET",
  headers: {
    "Content-Type": "application/pdf",
    Accept: "application/pdf",
  },
});
```

### 2. Markdown to PDF Generation
```typescript
// Triggered by downloadMarkdownPdf function
const response = await fetch(DOWNLOAD_MARKDOWN_PDF_API_URL, {
  method: "GET",
  headers: {
    "Content-Type": "application/pdf",
    Accept: "application/pdf",
  },
});
```

## Technical Implementation

### Puppeteer Configuration
Both API routes use Puppeteer with optimized settings:

```typescript
const browser = await puppeteer.launch({
  headless: true,
  args: ['--no-sandbox'],
});
```

### PDF Generation Process
1. **HTML Content Creation**: Generate structured HTML with CSS styling
2. **Browser Launch**: Start headless Chrome instance
3. **Page Rendering**: Load HTML content and wait for network idle
4. **PDF Generation**: Convert rendered page to PDF with A4 format
5. **File Download**: Stream PDF buffer to client

### Markdown Processing
The Markdown-to-PDF route uses the `marked` library to convert Markdown to HTML:

```typescript
import { marked } from "marked";
const htmlContent = marked(markdownContent);
```

## User Interface

### Download Buttons
- **Download PDF Button**: Blue-styled button for HTML-to-PDF generation
- **Download Markdown PDF Button**: Yellow-styled button for Markdown-to-PDF generation

### Loading States
Both buttons feature:
- Loading spinners during PDF generation
- Disabled state to prevent multiple concurrent requests
- Dynamic text changes ("Downloading..." vs "Download PDF")

## File Structure

```
src/
├── app/
│   ├── page.tsx                           # Main UI component
│   └── api/
│       ├── download-pdf/
│       │   └── route.ts                   # HTML-to-PDF API endpoint
│       └── download-markdown-pdf/
│           └── route.ts                   # Markdown-to-PDF API endpoint
└── constants/
    └── apiEndpoints.ts                    # API URL constants
```

## Getting Started

1. **Install Dependencies**:
```bash
npm install
# Dependencies include: puppeteer, marked, next, react
```

2. **Run Development Server**:
```bash
npm run dev
```

3. **Access Application**:
Open [http://localhost:3000](http://localhost:3000) in your browser

## Usage Examples

### Basic PDF Download
Click the "Download PDF" button to generate and download a PDF containing information about Puppeteer and its usage.

### Markdown PDF Download
Click the "Download Markdown PDF" button to generate a PDF from pre-defined Markdown content with custom styling.

## Puppeteer vs Puppeteer-Core

| Library | Includes Chromium? | Use Case |
|---------|-------------------|----------|
| **puppeteer** | Yes | Downloads compatible Chromium automatically. Easiest for most users. |
| **puppeteer-core** | No | Requires manual browser executable specification. Useful for custom environments. |

## PDF Features

- **A4 Format**: Standard document size
- **Custom Margins**: 20px margins on all sides
- **Background Printing**: Preserves CSS backgrounds and colors
- **Typography**: Custom Google Fonts (Source Sans 3)
- **Responsive Design**: Optimized for PDF viewing

## Error Handling

Both download functions include comprehensive error handling:
- Network request failures
- PDF generation errors
- Browser launch issues
- File download interruptions

## Performance Considerations

- **Headless Mode**: Puppeteer runs in headless mode for optimal performance
- **Browser Cleanup**: Proper browser instance cleanup after PDF generation
- **Memory Management**: Efficient handling of PDF buffers and blob objects

## Deployment

This application is ready for deployment on Vercel or any Node.js hosting platform that supports Puppeteer.

## Learn More

- [Puppeteer Documentation](https://pptr.dev/)
- [Next.js API Routes](https://nextjs.org/docs/pages/building-your-application/routing/api-routes)
- [Marked Documentation](https://marked.js.org/)

---

*Generated PDFs include metadata and styling optimized for professional document presentation.*