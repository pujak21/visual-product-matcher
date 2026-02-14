
require("dotenv").config();



const express = require("express");
const cors = require("cors");

const generateEmbedding = require("./utils/embedding");
const cosineSimilarity = require("./utils/similarity");
const products = require("./products.json");



const app = express();
app.use(cors());
app.use(express.json());

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

    // 1️⃣ Generate embedding for uploaded image
    const queryEmbedding = await generateEmbedding(imageUrl);

    // 2️⃣ Compare with each product
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

    // 3️⃣ Sort by similarity (highest first)
    results.sort((a, b) => b.similarity - a.similarity);

    // 4️⃣ Return top 5 matches
    res.json(results.slice(0, 5));

  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Search failed" });
  }
});



app.listen(5000, () => {
  console.log("Server running on port 5000");
});
