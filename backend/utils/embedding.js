const Replicate = require("replicate");

const replicate = new Replicate({
  auth: process.env.REPLICATE_API_TOKEN,
});

// This is a working CLIP embedding model on Replicate
const MODEL = "krthr/clip-embeddings";

async function generateEmbedding(imageUrl) {
  try {
    console.log("Generating embedding for:", imageUrl);

    const output = await replicate.run(
      MODEL,
      {
        input: {
          image: imageUrl
        }
      }
    );

    // This model returns embedding inside output.embedding
    return output.embedding;

  } catch (error) {
    console.error("Replicate embedding error:", error);
    throw new Error("Failed to generate embedding");
  }
}

module.exports = generateEmbedding;
