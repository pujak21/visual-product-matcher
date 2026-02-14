require("dotenv").config();

const fs = require("fs");
const path = require("path");
const generateEmbedding = require("./utils/embedding");

const productsPath = path.join(__dirname, "products.json");

async function updateEmbeddings() {
  try {
    const products = JSON.parse(fs.readFileSync(productsPath, "utf-8"));

    for (let product of products) {
      console.log(`Generating embedding for: ${product.name}`);

      const embedding = await generateEmbedding(product.image);

      product.embedding = embedding;

      console.log(`Done: ${product.name}`);
    }

    fs.writeFileSync(productsPath, JSON.stringify(products, null, 2));

    console.log("All embeddings updated successfully 🚀");

  } catch (error) {
    console.error("Error generating embeddings:", error);
  }
}

updateEmbeddings();
