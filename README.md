# 🥔 Potato Disease Classification

A deep learning project that detects diseases in potato plants from a photo of a leaf. Upload an image, and the model tells you whether the plant is **healthy** or suffering from **Early Blight** or **Late Blight**.

![Python](https://img.shields.io/badge/Python-3.8+-blue)
![TensorFlow](https://img.shields.io/badge/TensorFlow-Keras-orange)
![License](https://img.shields.io/badge/License-MIT-green)

---

## 📌 Why this project?

Potato is one of the world's most important food crops, and diseases like blight can destroy entire harvests. Spotting them early is hard for farmers without expert help. This project uses a Convolutional Neural Network (CNN) to identify leaf diseases instantly from a simple photo, making early detection fast and accessible.

## 🎯 What it detects

| Class | Description |
|-------|-------------|
| **Early Blight** | Fungal disease causing dark spots with concentric rings on older leaves |
| **Late Blight** | Serious disease causing water-soaked, dark lesions that spread rapidly |
| **Healthy** | No visible disease |

## 🧠 Model

The model is a CNN built with TensorFlow / Keras and saved as `potatoes.h5`.

| Detail | Value |
|--------|-------|
| Input size | 256 × 256 × 3 (RGB image) |
| Architecture | 6 × (Conv2D + MaxPooling2D) blocks → Flatten → Dense(64) → Dense(3, softmax) |
| Conv filters | 32, then 64 for the remaining layers (3×3 kernels, ReLU) |
| Optimizer | Adam (learning rate 0.001) |
| Loss | Sparse Categorical Crossentropy |
| Output | 3 classes |

## 📁 Project structure

```
Potato-Disease-Classification/
├── API/            # Backend API that serves the model for predictions
├── frontend/       # Web interface for uploading leaf images
├── models/         # Saved model versions
├── training/       # Notebooks / scripts used to train the model
├── potatoes.h5     # Trained model
├── LICENSE
└── README.md
```

## 🚀 Getting started

### 1. Clone the repository

```bash
git clone https://github.com/<your-username>/Potato-Disease-Classification.git
cd Potato-Disease-Classification
```

### 2. Install dependencies

```bash
pip install tensorflow numpy pillow
```

> If your API uses FastAPI, also install: `pip install fastapi uvicorn python-multipart`

### 3. Run the API

```bash
cd API
uvicorn main:app --reload
```

The API will start at `http://localhost:8000`.

### 4. Run the frontend

```bash
cd frontend
npm install
npm start
```

Then open the URL shown in your terminal and upload a potato leaf image.

> ⚠️ **Note:** Adjust the commands above if your API or frontend uses a different framework or file names.

## 🔍 Quick prediction example

You can also use the model directly in Python:

```python
import numpy as np
import tensorflow as tf
from PIL import Image

model = tf.keras.models.load_model("potatoes.h5")
class_names = ["Early Blight", "Late Blight", "Healthy"]

image = Image.open("leaf.jpg").resize((256, 256))
img_array = np.expand_dims(np.array(image), axis=0)

predictions = model.predict(img_array)
predicted_class = class_names[np.argmax(predictions[0])]
confidence = round(100 * np.max(predictions[0]), 2)

print(f"Prediction: {predicted_class} ({confidence}% confidence)")
```

> Make sure the order of `class_names` matches the order used during training.

## 🗂️ Dataset

The model was trained on potato leaf images (commonly from the [PlantVillage dataset](https://www.kaggle.com/datasets/arjuntejaswi/plant-village)), covering healthy leaves and the two blight diseases.

## 🛠️ Tech stack

- **Deep learning:** TensorFlow, Keras
- **Backend:** Python API (see `API/`)
- **Frontend:** Web UI (see `frontend/`)
- **Data handling:** NumPy, Pillow

## 🔮 Future improvements

- Add more crop types and diseases
- Improve accuracy with data augmentation and transfer learning
- Deploy the app to the cloud
- Build a mobile app for use directly in the field

## 🤝 Contributing

Contributions are welcome! Feel free to fork this repo, open an issue, or submit a pull request.

## 📄 License

This project is licensed under the [MIT License](LICENSE).

## 👤 Author

**Amey Kamble**

If you found this project useful, consider giving it a ⭐!
