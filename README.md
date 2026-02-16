# 🖼️ Visual Product Matcher

A full-stack web application that matches visually similar products based on an uploaded image or image URL.

This system generates image embeddings and compares them using cosine similarity to return the most relevant products.

---

## 🌐 Live Demo
Live Application: https://visual-product-matcher-3p2tko6vy-pujas-projects-1c4dc216.vercel.app/

Backend API: https://visual-product-matcher-backend-o2m9.onrender.com  


## Approach

This project implements a simple visual similarity search system using image embeddings and cosine similarity.

When a user uploads an image (via file or URL), the backend processes the image using Sharp to resize it to a fixed 32x32 resolution and converts pixel data into a normalized embedding vector. Each product in the dataset has a pre-generated embedding stored in `products.json`.

To find similar products, cosine similarity is calculated between the uploaded image embedding and each stored product embedding. Results are sorted in descending order based on similarity score and returned to the frontend.

The frontend displays the uploaded image along with visually similar products. A similarity threshold slider allows users to filter results dynamically for better control.

The backend is built with Node.js and Express, while the frontend uses React. The application is deployed using Render (backend) and Vercel (frontend), fulfilling the requirement for free hosting.

This implementation focuses on simplicity, clarity, and production-ready structure while keeping computation efficient and lightweight.


## 🚀 Features

- 🔍 Search using Image URL
- 📁 Upload image file for matching
- 🧠 Image embedding generation (32x32 normalized pixel vectors)
- 📊 Cosine similarity-based ranking
- 🎚 Similarity threshold filter (slider)
- 🗂 50+ structured products with meaningful categories
- 🖼 Local image storage (no external API dependency)
- ⚡ Real-time similarity sorting
- 🎨 Clean responsive UI

---

## 🏗 Tech Stack

### Frontend
- React (Vite)
- Axios
- CSS Grid Layout

### Backend
- Node.js
- Express.js
- Sharp (image processing)
- Multer (file upload handling)
- Custom Cosine Similarity implementation

---

## 🧠 How It Works

1. User uploads an image or provides an image URL.
2. Backend processes the image using `Sharp`.
3. Image is resized to 32x32 and converted to raw pixel data.
4. Pixel values are normalized (0–1 range).
5. A numerical embedding vector is generated.
6. Cosine similarity is computed between query embedding and stored product embeddings.
7. Products are sorted by similarity score.
8. Results above selected threshold are displayed.

---

## 📂 Project Structure

visual-product-matcher/

│

├── backend/

│ ├── images/ → Product images

│ ├── products.json → Product metadata + embeddings

│ ├── utils/

│ │ ├── embedding.js → Image embedding generator

│ │ ├── similarity.js → Cosine similarity logic

│ ├── generateProductEmbeddings.js

│ └── server.js

│

├── frontend/

│ └── src/

│ └── App.jsx

│

└── README.md



---

## ▶️ How To Run The Project

### 1️⃣ Backend Setup

cd backend

npm install

node generateProductEmbeddings.js

node server.js


---

### 2️⃣ Frontend Setup

cd frontend

npm install

npm run dev



---

## 📦 Dataset

- 50+ manually structured product images
- Categories include:
  - Clothing
  - Footwear
  - Jewelry
  - Accessories
  - Electronics
  - Beauty
  - Kitchenware

All images are stored locally for reliability and consistent deployment.

---

## 📊 Similarity Algorithm

Cosine similarity formula used:

similarity = dot(A, B) / (||A|| × ||B||)




This ensures:

- Scale-invariant comparison
- Efficient vector-based similarity
- Real-time ranking

---

## 🔮 Future Scope

This project can be extended with:

- 🤖 Deep Learning-based embeddings (CLIP / ResNet)
- 🗄 Database integration (MongoDB / PostgreSQL)
- ☁ Cloud image storage (AWS S3)
- 📱 Improved mobile responsiveness
- 🧠 AI-powered automatic category detection
- 🏷 Advanced filters (price, brand, rating)
- 🔐 User authentication system
- 📊 Admin dashboard for product management
- 🛒 Full e-commerce integration (cart, checkout)
- 🚀 Cloud deployment (Render + Vercel)

---

## 🎯 Conclusion

This project demonstrates:

- Image processing
- Vector similarity computation
- Full-stack integration
- Clean product data structuring
- Efficient local embedding generation
- Real-time visual search logic

It serves as a scalable foundation for building a production-grade visual search system.

---

👩‍💻 Developed as part of a Visual Product Matching Assessment.
