import { Link, useNavigate } from "react-router-dom";

function CartScreen({ cartItems, setCartItems }) {
  const navigate = useNavigate();

  const removeFromCart = (id) => {
    setCartItems((prev) => prev.filter((item) => item._id !== id));
  };

  const updateQty = (id, qty) => {
    setCartItems((prev) =>
      prev.map((item) =>
        item._id === id ? { ...item, qty: Number(qty) } : item
      )
    );
  };

  const checkoutHandler = () => {
    navigate("/login?redirect=shipping");
  };

  const totalItems = cartItems.reduce((acc, item) => acc + item.qty, 0);
  const totalPrice = cartItems
    .reduce((acc, item) => acc + item.qty * item.price, 0)
    .toFixed(2);

  return (
    <div style={{ padding: "20px", display: "flex", gap: "40px", flexWrap: "wrap" }}>
      
      {/* LEFT SIDE - CART ITEMS */}
      <div style={{ flex: "2 1 500px" }}>
        <h1>Your Cart</h1>

        {cartItems.length === 0 ? (
          <p>
            Cart is empty. <Link to="/">Go Back</Link>
          </p>
        ) : (
          cartItems.map((item) => (
            <div
              key={item._id}
              style={{
                display: "flex",
                alignItems: "center",
                borderBottom: "1px solid #ddd",
                padding: "15px 0",
                gap: "20px",
              }}
            >
              <img
                src={item.image}
                alt={item.name}
                style={{ width: "80px", borderRadius: "8px" }}
              />

              <div style={{ flex: 1 }}>
                <Link to={`/product/${item._id}`}>
                  {item.name}
                </Link>
                <p>${item.price}</p>
              </div>

              <select
                value={item.qty}
                onChange={(e) => updateQty(item._id, e.target.value)}
              >
                {[...Array(item.countInStock).keys()].map((x) => (
                  <option key={x + 1} value={x + 1}>
                    {x + 1}
                  </option>
                ))}
              </select>

              <button
                onClick={() => removeFromCart(item._id)}
                style={{
                  padding: "6px 10px",
                  cursor: "pointer",
                }}
              >
                Remove
              </button>
            </div>
          ))
        )}
      </div>

      {/* RIGHT SIDE - SUMMARY */}
      <div
        style={{
          flex: "1 1 300px",
          border: "1px solid #ddd",
          padding: "20px",
          borderRadius: "8px",
          height: "fit-content",
        }}
      >
        <h2>
          Subtotal ({totalItems}) items
        </h2>

        <h3>${totalPrice}</h3>

        <button
          onClick={checkoutHandler}
          disabled={cartItems.length === 0}
          style={{
            width: "100%",
            padding: "10px",
            marginTop: "10px",
            cursor: "pointer",
          }}
        >
          Proceed To Checkout
        </button>
      </div>
    </div>
  );
}

export default CartScreen;