import { Link, useNavigate } from 'react-router-dom'
import { useState, useEffect } from 'react'

function CartScreen({ cartItems, setCartItems }) {
  const navigate = useNavigate()

  const [isMobile, setIsMobile] = useState(window.innerWidth < 768)

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768)
    }

    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  const totalItems = cartItems.reduce((acc, item) => acc + item.qty, 0)

  const totalPrice = cartItems
    .reduce((acc, item) => acc + item.price * item.qty, 0)
    .toFixed(2)

  return (
    <div
      style={{
        ...styles.container,
        flexDirection: isMobile ? 'column' : 'row',
        padding: isMobile ? '20px' : '40px 60px',
      }}
    >
      {/* LEFT SIDE */}
      <div style={styles.left}>
        <h1>Your Cart</h1>

        {cartItems.length === 0 ? (
          <p>
            Your cart is empty. <Link to="/">Go Back</Link>
          </p>
        ) : (
          cartItems.map((item) => (
            <div key={item._id} style={styles.item}>
              <h3>{item.name}</h3>
              <p>Price: ${item.price}</p>

              <div style={styles.qtyRow}>
                <button
                  style={styles.qtyButton}
                  onClick={() =>
                    setCartItems(
                      cartItems.map((x) =>
                        x._id === item._id && x.qty > 1
                          ? { ...x, qty: x.qty - 1 }
                          : x
                      )
                    )
                  }
                >
                  −
                </button>

                <span style={styles.qtyNumber}>{item.qty}</span>

                <button
                  style={styles.qtyButton}
                  onClick={() =>
                    setCartItems(
                      cartItems.map((x) =>
                        x._id === item._id
                          ? { ...x, qty: x.qty + 1 }
                          : x
                      )
                    )
                  }
                >
                  +
                </button>
              </div>

              <p style={{ marginTop: '10px' }}>
                Subtotal: ${(item.price * item.qty).toFixed(2)}
              </p>

              <button
                style={styles.remove}
                onClick={() =>
                  setCartItems(
                    cartItems.filter((x) => x._id !== item._id)
                  )
                }
              >
                Remove
              </button>
            </div>
          ))
        )}
      </div>

      {/* RIGHT SIDE */}
      {cartItems.length > 0 && (
        <div
          style={{
            ...styles.right,
            width: isMobile ? '100%' : 'auto',
            position: isMobile ? 'relative' : 'sticky',
            top: isMobile ? '0' : '40px',
          }}
        >
          <h2>Order Summary</h2>

          <p>Items: {totalItems}</p>
          <p>Total: ${totalPrice}</p>

          <button
            style={styles.checkout}
            onClick={() => navigate('/checkout')}
          >
            Proceed To Checkout
          </button>
        </div>
      )}
    </div>
  )
}

const styles = {
  container: {
    display: 'flex',
    gap: '40px',
    alignItems: 'flex-start',
    backgroundColor: '#f5f5f5',
    minHeight: '100vh',
  },

  left: {
    flex: 3,
  },

  right: {
    flex: 1,
    backgroundColor: 'white',
    padding: '30px',
    borderRadius: '12px',
    boxShadow: '0 8px 20px rgba(0,0,0,0.08)',
  },

  item: {
    backgroundColor: 'white',
    padding: '25px',
    marginBottom: '25px',
    borderRadius: '12px',
    boxShadow: '0 8px 20px rgba(0,0,0,0.06)',
  },

  qtyRow: {
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
    marginTop: '10px',
  },

  qtyButton: {
    padding: '6px 12px',
    fontSize: '16px',
    border: '1px solid #ddd',
    backgroundColor: 'white',
    cursor: 'pointer',
    borderRadius: '6px',
  },

  qtyNumber: {
    fontWeight: 'bold',
    fontSize: '18px',
  },

  remove: {
    marginTop: '15px',
    padding: '8px 12px',
    backgroundColor: '#e53935',
    color: 'white',
    border: 'none',
    borderRadius: '6px',
    cursor: 'pointer',
  },

  checkout: {
    marginTop: '25px',
    width: '100%',
    padding: '14px',
    backgroundColor: '#111',
    color: 'white',
    border: 'none',
    borderRadius: '8px',
    fontSize: '16px',
    fontWeight: '600',
    cursor: 'pointer',
  },
}

export default CartScreen