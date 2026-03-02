import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

function HomeScreen() {
  const [products, setProducts] = useState([])

  useEffect(() => {
    fetch('http://localhost:5000/api/products')
      .then((res) => res.json())
      .then((data) => setProducts(data.products))
      .catch((err) => console.log(err))
  }, [])

  return (
    <div>
      <h1 style={styles.title}>Latest Products</h1>

      {products.length === 0 ? (
        <h2>No Products Found</h2>
      ) : (
        <div style={styles.grid}>
          {products.map((product) => (
            <Link
              key={product._id}
              to={`/product/${product._id}`}
              style={styles.card}
            >
              <h3 style={styles.name}>{product.name}</h3>
              <p style={styles.price}>${product.price}</p>
            </Link>
          ))}
        </div>
      )}
    </div>
  )
}

const styles = {
  title: {
    marginBottom: '40px',
    fontSize: '28px',
  },
  grid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
    gap: '30px',
  },
  card: {
    display: 'block', // IMPORTANT
    backgroundColor: 'white',
    padding: '25px',
    borderRadius: '12px',
    boxShadow: '0 4px 15px rgba(0,0,0,0.08)',
    transition: 'all 0.2s ease',
    textDecoration: 'none',
    cursor: 'pointer',
  },
  name: {
    color: '#111',
    marginBottom: '10px',
  },
  price: {
    fontWeight: 'bold',
    fontSize: '18px',
    color: '#000',
  },
}

export default HomeScreen