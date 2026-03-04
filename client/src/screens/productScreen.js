import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

function ProductScreen({ setCartItems }) {
  const { id } = useParams();

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [qty, setQty] = useState(1);

  useEffect(() => {
    const fetchProduct = async () => {
      const res = await fetch(`/api/products/${id}`);
      const data = await res.json();
      setProduct(data);
      setLoading(false);
    };

    fetchProduct();
  }, [id]);

  if (loading) return <h2 style={{ padding: "20px" }}>Loading...</h2>;
  if (!product) return <h2 style={{ padding: "20px" }}>Product not found</h2>;

  const addToCart = () => {
    setCartItems((prev) => {
      const exists = prev.find((x) => x._id === product._id);

      if (exists) {
        return prev.map((x) =>
          x._id === product._id
            ? { ...x, qty: x.qty + qty }
            : x
        );
      }

      return [...prev, { ...product, qty }];
    });
  };

  return (
    <div style={{ padding: "20px", display: "flex", gap: "40px", flexWrap: "wrap" }}>
      
      {/* IMAGE */}
      <div style={{ flex: "1 1 300px" }}>
        <img
          src={product.image}
          alt={product.name}
          style={{ width: "100%", borderRadius: "8px" }}
        />
      </div>

      {/* DETAILS */}
      <div style={{ flex: "1 1 300px" }}>
        <h1>{product.name}</h1>
        <p>{product.description}</p>

        <h2>${product.price}</h2>

        <p>
          ⭐ {product.rating} ({product.numReviews} reviews)
        </p>

        <p>
          Status:{" "}
          {product.countInStock > 0 ? (
            <span style={{ color: "green" }}>In Stock</span>
          ) : (
            <span style={{ color: "red" }}>Out of Stock</span>
          )}
        </p>

        {/* Quantity Selector */}
        {product.countInStock > 0 && (
          <div style={{ margin: "15px 0" }}>
            <label>Qty: </label>
            <select
              value={qty}
              onChange={(e) => setQty(Number(e.target.value))}
            >
              {[...Array(product.countInStock).keys()].map((x) => (
                <option key={x + 1} value={x + 1}>
                  {x + 1}
                </option>
              ))}
            </select>
          </div>
        )}

        <button
          onClick={addToCart}
          disabled={product.countInStock === 0}
          style={{
            padding: "10px 20px",
            cursor: "pointer",
          }}
        >
          Add To Cart
        </button>
      </div>
    </div>
  );
}

export default ProductScreen;