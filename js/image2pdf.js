const input = document.getElementById("imageInput");
const downloadBtn = document.getElementById("downloadPDF");

downloadBtn.addEventListener("click", async () => {
  const files = input.files;
  if (!files.length) return alert("Please select at least one image.");

  const { jsPDF } = window.jspdf;
  const pdf = new jsPDF();

  for (let i = 0; i < files.length; i++) {
    const imgData = await fileToDataURL(files[i]);
    const img = new Image();
    img.src = imgData;
    await new Promise(r => (img.onload = r));

    const width = pdf.internal.pageSize.getWidth();
    const height = (img.height * width) / img.width;
    pdf.addImage(img, "JPEG", 0, 0, width, height);
    if (i < files.length - 1) pdf.addPage();
  }

  pdf.save("merged.pdf");
});

function fileToDataURL(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = e => resolve(e.target.result);
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}
