import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import HomeScreen from './screens/homeScreen'
import ProductScreen from './screens/productScreen'
import Header from './components/header'
import { useState } from 'react'
import CartScreen from './screens/cartScreen'
import { useEffect } from 'react'
import CheckoutScreen from './screens/checkoutScreen'

function App() {
  const [cartItems, setCartItems] = useState(() => {
    const storedCart = localStorage.getItem('cartItems');
    return storedCart ? JSON.parse(storedCart) : [];
  })

  useEffect(() => {
    localStorage.setItem('cartItems', JSON.stringify(cartItems));
  }, [cartItems]);
  return (
    <Router>
      <div style={styles.app}>
        <Header cartItems={cartItems} />
        <main style={styles.main}>
          <Routes>
            <Route path="/cart" element={<CartScreen cartItems={cartItems} setCartItems={setCartItems} />} />
            <Route path="/" element={<HomeScreen />} />
            <Route path="/product/:id" element={<ProductScreen cartItems={cartItems} setCartItems={setCartItems} />} />
            <Route path="/checkout" element={<CheckoutScreen cartItems={cartItems} />} />
          </Routes>
        </main>
      </div>
    </Router>
  )
}

const styles = {
  app: {
    fontFamily: 'Arial, sans-serif',
    backgroundColor: '#f5f5f5',
    minHeight: '100vh',
  },
  main: {
    width: '90%',
    maxWidth: '1200px',
    margin: '40px auto',
  },
}

export default App