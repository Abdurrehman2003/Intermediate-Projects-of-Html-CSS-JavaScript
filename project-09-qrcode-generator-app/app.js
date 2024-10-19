const qrFormEl = document.getElementById('qrForm');
const qrImageEl = document.getElementById("qrImage");
const qrContainerEl = document.getElementById("qrContainer");
const qrInputTextEl = document.getElementById("qrInputText");
const generateBtnEl = document.getElementById("generateBtn");
const loaderEl = document.getElementById("loader");

const renderQRCode = (url) => {
  if (!url) return;

  generateBtnEl.innerText = "Generating QR Code...";
  loaderEl.style.display = "block"; // Show loader

  qrImageEl.src = url;

  const onImageLoad = () => {
    setTimeout(() => {
      qrContainerEl.classList.add("show");
      loaderEl.style.display = "none"; // Hide loader
      generateBtnEl.innerText = "Generate QR Code";
    }, 500);
  };

  qrImageEl.addEventListener("load", onImageLoad);
};

qrFormEl.addEventListener('submit', (event) => {
  event.preventDefault();

  const formData = new FormData(qrFormEl);
  const text = formData.get('qrText').trim();

  if (!text) {
    alert("Please enter text to generate a QR Code");
    return;
  }

  const qrCodeUrl = `https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${encodeURIComponent(text)}`;
  
  qrContainerEl.classList.remove("show");
  renderQRCode(qrCodeUrl);
});

qrInputTextEl.addEventListener("input", () => {
  if (!qrInputTextEl.value.trim()) {
    qrContainerEl.classList.remove("show");
  }
});
