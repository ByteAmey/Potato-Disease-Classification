// Change this to your FastAPI address
const API_URL = "http://localhost:8000/predict";

// Get the elements from the HTML page
const fileInput = document.getElementById("fileInput");
const preview = document.getElementById("preview");
const result = document.getElementById("result");

// Step 1: When the user picks a photo, show it on the page
fileInput.onchange = function () {
  preview.src = URL.createObjectURL(fileInput.files[0]);
  preview.style.display = "block";
  result.innerText = "";
};

// Step 2: When the user clicks the button, send the photo to the server
async function checkLeaf() {

  // If no photo was chosen, ask the user to choose one
  if (fileInput.files.length === 0) {
    result.className = "bad";
    result.innerText = "Please choose a photo first 📷";
    return;
  }

  result.className = "";
  result.innerText = "Thinking... 🤔";

  // Put the photo in a package to send
  const formData = new FormData();
  formData.append("file", fileInput.files[0]);

  try {
    // Send the package to FastAPI and wait for the answer
    const response = await fetch(API_URL, { method: "POST", body: formData });
    const data = await response.json();

    // Turn 0.98 into 98 if needed
    let confidence = data.confidence;
    if (confidence <= 1) {
      confidence = confidence * 100;
    }

    // Blight = red warning, healthy = green tick
    if (data.class.includes("Blight")) {
      result.className = "bad";
      result.innerText = "⚠️ " + data.class + " (" + confidence.toFixed(1) + "%)";
    } else {
      result.className = "good";
      result.innerText = "✅ " + data.class + " (" + confidence.toFixed(1) + "%)";
    }

  } catch (error) {
    // If the server is off or something breaks
    result.className = "bad";
    result.innerText = "Server not working ❌";
  }
}