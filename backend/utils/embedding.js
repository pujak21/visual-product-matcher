const sharp = require("sharp");
const fs = require("fs");
const axios = require("axios");

async function generateEmbedding(input) {
  try {
    let imageBuffer;

    // If input is URL
    if (input.startsWith("http")) {
      console.log("Processing URL:", input);

      const response = await axios.get(input, {
        responseType: "arraybuffer",
      });

      imageBuffer = Buffer.from(response.data);
    } 
    // If input is local file path
    else {
      console.log("Processing local file:", input);
      imageBuffer = fs.readFileSync(input);
    }

    const resizedImage = await sharp(imageBuffer)
      .resize(32, 32)
      .raw()
      .toBuffer();

    const pixels = Array.from(resizedImage);

    const normalized = pixels.map((value) => value / 255);

    return normalized;

  } catch (error) {
    console.error("Image processing error:", error.message);
    throw new Error("Failed to process image");
  }
}

module.exports = generateEmbedding;
