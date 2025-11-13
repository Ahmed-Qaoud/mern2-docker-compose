// frontend/src/App.jsx
import { useEffect, useState } from "react";

function App() {
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("http://localhost:5000/api/products")
      .then(res => res.json())
      .then(data => {
        setProducts(data);
        setLoading(false);
      })
      .catch(err => {
        console.error("Fetch products error:", err);
        setLoading(false);
      });
  }, []);

  const addToCart = (product) => setCart(prev => [...prev, product]);
  const total = cart.reduce((s, i) => s + i.price, 0);

  return (
    <div style={{ fontFamily: "Arial", padding: "2rem" }}>
      <h1 style={{ textAlign: "center", color: "#2563eb" }}>🛍️ Mini E-Commerce Store</h1>
      <p style={{ textAlign: "center" }}>Products fetched from backend (MongoDB)</p>

      {loading ? <p style={{textAlign:'center'}}>Loading products...</p> :
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
          gap: "1rem",
          marginTop: "2rem"
        }}>
          {products.map(p => (
            <div key={p._id} style={{
              border: "1px solid #ddd",
              borderRadius: "10px",
              padding: "1rem",
              textAlign: "center",
              boxShadow: "0 2px 5px rgba(0,0,0,0.05)"
            }}>
              <h3>{p.name}</h3>
              <p style={{color:'#111', fontWeight:600}}>${p.price}</p>
              <p style={{fontSize:12, color:'#555'}}>{p.description}</p>
              <button
                onClick={() => addToCart(p)}
                style={{
                  backgroundColor: "#2563eb",
                  color: "white",
                  padding: "0.5rem 1rem",
                  border: "none",
                  borderRadius: "5px",
                  cursor: "pointer"
                }}
              >
                Add to Cart
              </button>
            </div>
          ))}
        </div>
      }

      <div style={{
        marginTop: "2rem",
        textAlign: "center",
        padding: "1rem",
        backgroundColor: "#f3f4f6",
        borderRadius: "10px"
      }}>
        <h2>🛒 Cart Summary</h2>
        <p>Items: {cart.length}</p>
        <p>Total: ${total}</p>
      </div>
    </div>
  );
}

export default App;

