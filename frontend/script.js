const API_URL = "http://localhost:8000/predict";

const fileInput = document.getElementById("fileInput");
const preview = document.getElementById("preview");
const result = document.getElementById("result");

fileInput.onchange = function () {
  preview.src = URL.createObjectURL(fileInput.files[0]);
  preview.style.display = "block";
  result.innerText = "";
};

async function checkLeaf() {

  if (fileInput.files.length === 0) {
    result.className = "bad";
    result.innerText = "Please choose a photo first 📷";
    return;
  }

  result.className = "";
  result.innerText = "Thinking... 🤔";

  const formData = new FormData();
  formData.append("file", fileInput.files[0]);

  try {
    const response = await fetch(API_URL, { method: "POST", body: formData });
    const data = await response.json();

    let confidence = data.confidence;
    if (confidence <= 1) {
      confidence = confidence * 100;
    }

    if (data.class.includes("Blight")) {
      result.className = "bad";
      result.innerText = "⚠️ " + data.class + " (" + confidence.toFixed(1) + "%)";
    } else {
      result.className = "good";
      result.innerText = "✅ " + data.class + " (" + confidence.toFixed(1) + "%)";
    }

  } catch (error) {
    result.className = "bad";
    result.innerText = "Server not working ❌";
  }
}