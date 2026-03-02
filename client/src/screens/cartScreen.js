import { Link } from 'react-router-dom'

function CartScreen({ cartItems, setCartItems }) {
  return (
    <div>
      <h1>Your Cart</h1>

      {cartItems.length === 0 ? (
        <p>
          Your cart is empty. <Link to="/">Go Back</Link>
        </p>
      ) : (
        <div>
          {cartItems.map((item) => (
            <div key={item._id} style={styles.item}>
              <h3>{item.name}</h3>
              <p>${item.price}</p>
              <p>Quantity: {item.qty}</p>

              <button
                style={styles.remove}
                onClick={() =>
                  setCartItems(cartItems.filter((x) => x._id !== item._id))
                }
              >
                Remove
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

const styles = {
  item: {
    backgroundColor: 'white',
    padding: '20px',
    marginBottom: '15px',
    borderRadius: '8px',
    boxShadow: '0 4px 10px rgba(0,0,0,0.08)',
  },
  remove: {
    marginTop: '10px',
    backgroundColor: '#e53935',
    color: 'white',
    padding: '8px, 12px',
    border: 'none',
    borderRadius: '6px',
    cursor: 'pointer',
  },
}

export default CartScreen