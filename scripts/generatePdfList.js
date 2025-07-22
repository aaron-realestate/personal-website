const fs = require("fs");
const path = require("path");

const pdfDir = path.join(__dirname, "..", "resources", "pdfs");
const outputFile = path.join(pdfDir, "pdfList.json");

function parseDateFromFilename(filename) {
  // Example filename: 'June.25 Issue.pdf'
  // Extract 'June.25' part and parse it to a Date for sorting
  // Assumes format: Month.Day Issue.pdf

  const datePart = filename.match(/^([A-Za-z]+)\.(\d+)\sIssue\.pdf$/);
  if (!datePart) return null;

  const [, monthStr, dayStr] = datePart;

  // Convert month name to month number (0-based)
  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  const monthIndex = monthNames.findIndex(
    (m) => m.toLowerCase() === monthStr.toLowerCase()
  );
  if (monthIndex === -1) return null;

  // Use current year for simplicity (or adjust if you want)
  const year = new Date().getFullYear();

  return new Date(year, monthIndex, parseInt(dayStr, 10));
}

function generatePdfList() {
  const files = fs.readdirSync(pdfDir);

  // Filter PDF files that match pattern
  const pdfFiles = files.filter(
    (f) => f.endsWith(".pdf") && /^([A-Za-z]+)\.(\d+)\sIssue\.pdf$/.test(f)
  );

  // Map to objects with parsed date
  const pdfData = pdfFiles
    .map((f) => {
      return {
        name: f.replace(".pdf", ""), // e.g. 'June.25 Issue'
        file: path.posix.join("resources/pdfs", f),
        date: parseDateFromFilename(f),
      };
    })
    .filter((item) => item.date !== null);

  // Sort descending by date (newest first)
  pdfData.sort((a, b) => b.date - a.date);

  // Remove date property before saving JSON
  const outputData = pdfData.map(({ name, file }) => ({ name, file }));

  fs.writeFileSync(outputFile, JSON.stringify(outputData, null, 2));
  console.log(
    `PDF list JSON generated with ${outputData.length} entries at ${outputFile}`
  );
}

generatePdfList();
