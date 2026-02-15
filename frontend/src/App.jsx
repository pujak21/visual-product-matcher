import { useState } from "react";
import axios from "axios";

function App() {
  const [imageUrl, setImageUrl] = useState("");
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [threshold, setThreshold] = useState(0);
  const [file, setFile] = useState(null);
  const [previewImage, setPreviewImage] = useState(null);




const handleSearch = async () => {
  try {
    setLoading(true);

    let response;

    // If user uploaded a file
    if (file) {
      const formData = new FormData();
      formData.append("image", file);

      response = await axios.post(
        "http://localhost:5000/search-file",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data"
          }
        }
      );
    } 
    // If user entered URL
   else if (imageUrl) {
  setPreviewImage(imageUrl);

  response = await axios.post(
    "http://localhost:5000/search",
    { imageUrl }
  );
}

    else {
      alert("Please upload a file or enter image URL");
      return;
    }

    setResults(response.data);

  } catch (err) {
    console.error(err);
    alert("Search failed");
  } finally {
    setLoading(false);
  }
};


  return (
    <div style={{ padding: "40px", fontFamily: "Arial" }}>
      <h1>Visual Product Matcher</h1>

 <input
  type="file"
  accept="image/*"
  onChange={(e) => {
    const selectedFile = e.target.files[0];
    setFile(selectedFile);

    if (selectedFile) {
      const imageUrl = URL.createObjectURL(selectedFile);
      setPreviewImage(imageUrl);
    }
  }}
/>



      <input
        type="text"
        placeholder="Paste image URL here"
        value={imageUrl}
        onChange={(e) => setImageUrl(e.target.value)}
        style={{ width: "300px", padding: "8px" }}
      />

      <button
        onClick={handleSearch}
        style={{ marginLeft: "10px", padding: "8px 12px" }}
      >
        Search
      </button>

  {previewImage && (
  <div>
    <h3>Uploaded Image</h3>
    <img
      src={previewImage}
      alt="Uploaded"
      style={{ width: "200px", borderRadius: "10px" }}
    />
  </div>
)}



      <div style={{ marginTop: "20px" }}>
  <label>Minimum Similarity: {threshold}</label>
  <br />
  <input
    type="range"
    min="0"
    max="1"
    step="0.01"
    value={threshold}
    onChange={(e) => setThreshold(Number(e.target.value))}
  />
</div>


      {loading && <p>Loading...</p>}

      <div
  style={{
    marginTop: "30px",
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(250px, 1fr))",
    gap: "20px"
  }}
>
  {results
    .filter((product) => product.similarity >= threshold)
    .map((product) => (
      <div
        key={product.id}
        style={{
          border: "1px solid #ddd",
          borderRadius: "10px",
          padding: "15px",
          backgroundColor: "#1e1e1e"
        }}
      >
        <img
  src={`http://localhost:5000${product.image}`}
  style={{ width: "100%", borderRadius: "8px" }}
  alt={product.name}
/>

        <h3>{product.name}</h3>
        <p>Category: {product.category}</p>
        <p>Similarity: {product.similarity.toFixed(2)}</p>
      </div>
    ))}
</div>

    </div>
  );
}

export default App;
