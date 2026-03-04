import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useState, useEffect } from "react";

import Header from "./components/header"; // adjust case if needed
import HomeScreen from "./screens/homeScreen";
import ProductScreen from "./screens/productScreen";
import CartScreen from "./screens/cartScreen";
import LoginScreen from "./screens/loginScreen";
import ShippingScreen from "./screens/shippingScreen";

function App() {
  const [cartItems, setCartItems] = useState(() => {
    const storedCart = localStorage.getItem("cartItems");
    return storedCart ? JSON.parse(storedCart) : [];
  });

  useEffect(() => {
    localStorage.setItem("cartItems", JSON.stringify(cartItems));
  }, [cartItems]);

  const [userInfo, setUserInfo] = useState(() => {
    const storedUser = localStorage.getItem("userInfo");
    return storedUser ? JSON.parse(storedUser) : null;
  });

  useEffect(() => {
    localStorage.setItem("userInfo", JSON.stringify(userInfo));
  }, [userInfo]);

  return (
    <Router>
      <Header
        cartItems={cartItems}
        userInfo={userInfo}
        setUserInfo={setUserInfo}
      />

      <Routes>
        <Route path="/" element={<HomeScreen />} />

        <Route
          path="/product/:id"
          element={<ProductScreen setCartItems={setCartItems} />}
        />

        <Route
          path="/cart"
          element={
            <CartScreen
              cartItems={cartItems}
              setCartItems={setCartItems}
            />
          }
        />

        <Route
          path="/login"
          element={<LoginScreen setUserInfo={setUserInfo} />}
        />

        <Route
          path="/shipping"
          element={<ShippingScreen userInfo={userInfo} />}
        />
      </Routes>
    </Router>
  );
}

export default App;