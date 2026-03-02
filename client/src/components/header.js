import { Link } from 'react-router-dom'

function Header({ cartItems }) {
  return (
    <header style={styles.header}>
        <Link to="/" style={styles.logo}>
          MyStore
        </Link>
        
        <Link to="/cart" style={styles.cart}>
          🛒 Cart ({cartItems.reduce((acc, item) => acc + item.qty, 0)})
        </Link>
    </header>
  )
}

const styles = {
  header: {
    backgroundColor: '#111',
    padding: '20px 0',
  },
  container: {
    width: '90%',
    maxWidth: '1200px',
    margin: '0 auto',
  },
  logo: {
    color: 'white',
    textDecoration: 'none',
    fontSize: '24px',
    fontWeight: 'bold',
  },
  cart: {
    color: 'white',
    textDecoration: 'none',
  },
}

export default Header