import React from "react";
import { Link } from "react-router-dom";

function Header() {
  // Safe cart from localStorage (no Redux)
  let cartItems = [];

  try {
    const cart = JSON.parse(localStorage.getItem("cartItems"));
    if (cart) {
      cartItems = cart;
    }
  } catch (err) {
    localStorage.removeItem("cartItems");
  }

  const cartCount = cartItems.reduce((acc, item) => acc + item.qty, 0);

  // Safe user
  let userInfo = null;
  try {
    userInfo = JSON.parse(localStorage.getItem("userInfo"));
  } catch (err) {
    localStorage.removeItem("userInfo");
  }

  return (
    <header style={styles.header}>
      <div style={styles.container}>
        <Link to="/" style={styles.logo}>
          MyStore
        </Link>

        <div style={styles.rightSection}>
          <Link to="/cart" style={styles.link}>
            Cart ({cartCount})
          </Link>

          {userInfo ? (
            <span style={styles.link}>Hello, {userInfo.name}</span>
          ) : (
            <Link to="/login" style={styles.link}>
              Sign In
            </Link>
          )}
        </div>
      </div>
    </header>
  );
}

const styles = {
  header: {
    backgroundColor: "#111",
    padding: "15px 0",
  },
  container: {
    width: "90%",
    margin: "0 auto",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
  logo: {
    color: "#fff",
    fontSize: "20px",
    textDecoration: "none",
    fontWeight: "bold",
  },
  rightSection: {
    display: "flex",
    gap: "20px",
  },
  link: {
    color: "#fff",
    textDecoration: "none",
  },
};

export default Header;