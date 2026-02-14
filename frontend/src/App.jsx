import { useState } from "react";
import axios from "axios";

function App() {
  const [imageUrl, setImageUrl] = useState("");
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [threshold, setThreshold] = useState(0);


  const handleSearch = async () => {
    if (!imageUrl) return alert("Please enter image URL");

    try {
      setLoading(true);

      const response = await axios.post(
        "http://localhost:5000/search",
        { imageUrl }
      );

      setResults(response.data);
    } catch (error) {
      alert("Search failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ padding: "40px", fontFamily: "Arial" }}>
      <h1>Visual Product Matcher</h1>

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

      {imageUrl && (
  <div style={{ marginTop: "20px" }}>
    <h3>Uploaded Image</h3>
    <img
      src={imageUrl}
      alt="Uploaded"
      style={{ width: "200px", borderRadius: "8px" }}
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
          src={product.image}
          style={{ width: "100%", borderRadius: "8px" }}
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
