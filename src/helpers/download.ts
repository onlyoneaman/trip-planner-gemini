import jsPDF from 'jspdf';

const downloadItinerary = (place: string, days: number, placeDetails: string, mainText: string) => {
  // Create the content of the Markdown file
  const content = `# ${days}-Day Itinerary for ${place}

## Destination Overview

${placeDetails}

## Itinerary Details

${mainText}
`;

  // Create a Blob with the content
  const blob = new Blob([content], { type: 'text/markdown;charset=utf-8' });

  // Create a temporary URL for the Blob
  const url = URL.createObjectURL(blob);

  // Create a temporary anchor element and trigger the download
  const link = document.createElement('a');
  link.href = url;
  link.download = `${place}_${days}_day_itinerary.md`;
  document.body.appendChild(link);
  link.click();

  // Clean up
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
};

const downloadItineraryPdf = (place: string, days: number, placeDetails: string, mainText: string) => {
  // Create a new PDF document
  const doc = new jsPDF();

  // Set font
  doc.setFont("helvetica", "normal");

  // Add title
  doc.setFontSize(20);
  doc.text(`${days}-Day Itinerary for ${place}`, 20, 20);

  // Add place details
  doc.setFontSize(12);
  doc.setFont("helvetica", "bold");
  doc.text("Destination Overview:", 20, 40);
  doc.setFont("helvetica", "normal");
  const placeDetailsWrapped = doc.splitTextToSize(placeDetails, 170);
  doc.text(placeDetailsWrapped, 20, 50);

  // Add main itinerary text
  doc.setFont("helvetica", "bold");
  doc.text("Itinerary Details:", 20, 80);
  doc.setFont("helvetica", "normal");
  const mainTextWrapped = doc.splitTextToSize(mainText, 170);
  doc.text(mainTextWrapped, 20, 90);

  // Save the PDF
  doc.save(`${place}_${days}_day_itinerary.pdf`);
};

export default downloadItinerary;
