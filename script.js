document.getElementById('shippingForm').addEventListener('submit', function (e) {
  e.preventDefault();

  const sender = document.getElementById('sender').value;
  const recipient = document.getElementById('recipient').value;
  const address = document.getElementById('address').value;
  const weight = document.getElementById('weight').value;

  // Show a preview of the shipping label
  const previewDiv = document.getElementById('preview');
  previewDiv.innerHTML = `
    <h2>Shipping Label Preview</h2>
    <p><strong>Sender:</strong> ${sender}</p>
    <p><strong>Recipient:</strong> ${recipient}</p>
    <p><strong>Address:</strong> ${address}</p>
    <p><strong>Weight:</strong> ${weight} kg</p>
    <button id="downloadPdf">Download PDF</button>
  `;

  // Handle the "Download PDF" button click
  document.getElementById('downloadPdf').addEventListener('click', () => {
    // Extract jsPDF from the UMD bundle
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF();

    doc.text(`Sender: ${sender}`, 10, 10);
    doc.text(`Recipient: ${recipient}`, 10, 20);
    doc.text(`Address: ${address}`, 10, 30);
    doc.text(`Weight: ${weight} kg`, 10, 40);

    // Save the PDF
    doc.save('shipping-label.pdf');
  });
});
