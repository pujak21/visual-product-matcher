
require("dotenv").config();



const express = require("express");
const cors = require("cors");

const path = require("path");

const generateEmbedding = require("./utils/embedding");
const cosineSimilarity = require("./utils/similarity");
const products = require("./products.json");

const multer = require("multer");
const upload = multer();




const app = express();
app.use(cors());
app.use(express.json());

//app.use("/images", express.static("images"));

app.use("/images", express.static(path.join(__dirname, "images")));


app.get("/", (req, res) => {
  res.send("Backend is running 🚀");
});

app.get("/products", (req, res) => {
  res.json(products);
});


app.post("/test-embedding", async (req, res) => {
  try {
    const { imageUrl } = req.body;

    if (!imageUrl) {
      return res.status(400).json({ error: "Image URL required" });
    }

    const embedding = await generateEmbedding(imageUrl);

    res.json({
      message: "Embedding generated successfully",
      length: embedding.length
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Something went wrong" });
  }
});

app.post("/search", async (req, res) => {
  try {
    const { imageUrl } = req.body;

    if (!imageUrl) {
      return res.status(400).json({ error: "Image URL required" });
    }

    //Generate embedding for uploaded image
    const queryEmbedding = await generateEmbedding(imageUrl);

    //Compare with each product
    const results = products.map(product => {
      const similarity = cosineSimilarity(
        queryEmbedding,
        product.embedding
      );

      return {
        id: product.id,
        name: product.name,
        category: product.category,
        image: product.image,
        similarity
      };
    });

    // Sort by similarity (highest first)
    results.sort((a, b) => b.similarity - a.similarity);

    // Return top 5 matches
    res.json(results.slice(0, 5));

  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Search failed" });
  }
});

app.post("/search-file", upload.single("image"), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: "No file uploaded" });
    }

    const sharp = require("sharp");

    const imageBuffer = req.file.buffer;

    const resizedImage = await sharp(imageBuffer)
      .resize(32, 32)
      .raw()
      .toBuffer();

    const pixels = Array.from(resizedImage);
    const normalized = pixels.map((v) => v / 255);

    const queryEmbedding = normalized;

    // USE SAME PRODUCTS AS ABOVE
    const results = products.map(product => {
      const similarity = cosineSimilarity(
        queryEmbedding,
        product.embedding
      );

      return {
        id: product.id,
        name: product.name,
        category: product.category,
        image: product.image,
        similarity
      };
    });

    results.sort((a, b) => b.similarity - a.similarity);

    res.json(results.slice(0, 5));

  } catch (err) {
    console.error("File search error:", err);
    res.status(500).json({ error: "File search failed" });
  }
});




//const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
