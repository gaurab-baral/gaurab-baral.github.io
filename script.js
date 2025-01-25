// We'll store all shipping labels in this array
const labels = [];

// Grab references to DOM elements
const shippingForm = document.getElementById('shippingForm');
const fromField = document.getElementById('fromField');
const toField = document.getElementById('toField');
const addressField = document.getElementById('address');
const previewDiv = document.getElementById('preview');
const downloadPdfBtn = document.getElementById('downloadPdfBtn');

/**
 * Handle the form submission (Add Label)
 */
shippingForm.addEventListener('submit', function (e) {
  e.preventDefault();

  // Read user input
  const fromValue = fromField.value.trim();
  const toValue = toField.value.trim();
  const addressValue = addressField.value.trim();

  // Construct a label object
  const newLabel = {
    from: fromValue,
    to: toValue,
    address: addressValue
  };

  // Push it into our labels array
  labels.push(newLabel);

  // Update the preview on screen
  renderPreview();

  // Clear the form fields
  shippingForm.reset();

  // Show the "Download PDF" button if there's at least one label
  if (labels.length > 0) {
    downloadPdfBtn.style.display = 'inline-block';
  }
});

/**
 * Show a list of all added labels
 */
function renderPreview() {
  // Clear any previous content
  previewDiv.innerHTML = '';

  labels.forEach((label, index) => {
    const labelDiv = document.createElement('div');
    labelDiv.classList.add('label-item');

    labelDiv.innerHTML = `
      <p><strong>From:</strong> ${label.from}</p>
      <p><strong>To:</strong> ${label.to}</p>
      <p><strong>Address:</strong> ${label.address}</p>
    `;

    previewDiv.appendChild(labelDiv);
  });
}

/**
 * Generate a single PDF with *all* shipping labels on the same page
 * (smaller font, Times, each label separated by a blank line)
 */
downloadPdfBtn.addEventListener('click', function () {
  // Check if jsPDF is loaded
  if (!window.jspdf) {
    alert('Error: jsPDF failed to load!');
    return;
  }

  const { jsPDF } = window.jspdf;
  const doc = new jsPDF();

  // Set font to Times, normal style, size 12
  doc.setFont('times', 'normal');
  doc.setFontSize(12);

  let yPos = 10;

  labels.forEach((label) => {
    doc.text(`From: ${label.from}`, 10, yPos);
    yPos += 10;
    doc.text(`To: ${label.to}`, 10, yPos);
    yPos += 10;
    doc.text(`Address: ${label.address}`, 10, yPos);
    // Add a blank line after each label
    yPos += 15;
  });

  // Download the PDF
  doc.save('shipping-labels.pdf');
});
