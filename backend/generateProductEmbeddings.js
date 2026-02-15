const fs = require("fs");
const path = require("path");
const generateEmbedding = require("./utils/embedding");

async function generateProducts() {
  try {
    const imagesDir = path.join(__dirname, "images");
    const imageFiles = fs.readdirSync(imagesDir);

    const products = [];

    let id = 1;

    for (const file of imageFiles) {
      const imagePath = `/images/${file}`;
      const fullPath = path.join(imagesDir, file);

      console.log(`Generating embedding for: ${file}`);

      const embedding = await generateEmbedding(fullPath);

      products.push({
        id,
        name: `Product ${id}`,
        category: "General",
        image: imagePath,
        embedding
      });

      console.log(`Done: Product ${id}`);
      id++;
    }

    fs.writeFileSync(
      path.join(__dirname, "products.json"),
      JSON.stringify(products, null, 2)
    );

    console.log("✅ All 50 products generated successfully!");

  } catch (error) {
    console.error("Error generating products:", error.message);
  }
}

generateProducts();
