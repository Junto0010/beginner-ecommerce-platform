import { useState, useEffect } from 'react'

function CheckoutScreen({ cartItems }) {
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768)

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768)
    }

    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  const [shipping, setShipping] = useState({
    name: '',
    address: '',
    city: '',
    postalCode: '',
    country: '',
  })

  const totalItems = cartItems.reduce((acc, item) => acc + item.qty, 0)

  const totalPrice = cartItems
    .reduce((acc, item) => acc + item.price * item.qty, 0)
    .toFixed(2)

  const handleChange = (e) => {
    setShipping({ ...shipping, [e.target.name]: e.target.value })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    alert('Order placed (simulation)')
  }

  return (
    <div
      style={{
        ...styles.container,
        flexDirection: isMobile ? 'column' : 'row',
        padding: isMobile ? '20px' : '40px 60px',
      }}
    >
      <div style={styles.left}>
        <h2>Shipping Information</h2>

        <form onSubmit={handleSubmit} style={styles.form}>
          <input name="name" placeholder="Full Name" onChange={handleChange} required />
          <input name="address" placeholder="Address" onChange={handleChange} required />
          <input name="city" placeholder="City" onChange={handleChange} required />
          <input name="postalCode" placeholder="Postal Code" onChange={handleChange} required />
          <input name="country" placeholder="Country" onChange={handleChange} required />

          <button type="submit" style={styles.placeOrder}>
            Place Order
          </button>
        </form>
      </div>

      <div style={styles.right}>
        <h2>Order Summary</h2>
        <p>Items: {totalItems}</p>
        <p>Total: ${totalPrice}</p>
      </div>
    </div>
  )
}

const styles = {
  container: {
    display: 'flex',
    gap: '40px',
    backgroundColor: '#f5f5f5',
    minHeight: '100vh',
  },

  left: {
    flex: 2,
    backgroundColor: 'white',
    padding: '30px',
    borderRadius: '12px',
  },

  right: {
    flex: 1,
    backgroundColor: 'white',
    padding: '30px',
    borderRadius: '12px',
    boxShadow: '0 8px 20px rgba(0,0,0,0.08)',
  },

  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: '15px',
  },

  placeOrder: {
    marginTop: '20px',
    padding: '14px',
    backgroundColor: '#111',
    color: 'white',
    border: 'none',
    borderRadius: '8px',
    cursor: 'pointer',
  },
}

export default CheckoutScreen