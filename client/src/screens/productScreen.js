import { useEffect, useState } from 'react'
import { useParams, Link, } from 'react-router-dom'

function ProductScreen({ cartItems, setCartItems }) {
  const { id } = useParams()
  const [product, setProduct] = useState(null)
  const [showToast, setShowToast] = useState(false)

  useEffect(() => {
    fetch(`http://localhost:5000/api/products/${id}`)
      .then((res) => res.json())
      .then((data) => {
        // handle both possible backend formats
        if (data.product) {
          setProduct(data.product)
        } else {
          setProduct(data)
        }
      })
      .catch((err) => console.log(err))
  }, [id])

  if (!product) return <h2>Loading...</h2>

  return (
    <div>
      <Link to="/" style={styles.back}>
        ← Go Back
      </Link>

      <div style={styles.container}>
        <div style={styles.left}>
          <h1 style={styles.title}>{product.name}</h1>
          <p style={styles.description}>{product.description}</p>
        </div>

        <div style={styles.right}>
            <div style={styles.card}>
            <h2>${product.price}</h2>
            <button
            style={styles.button}
            onClick={() => {
                const exist = cartItems.find((item) => item._id === product._id)

                if (exist) {
                setCartItems(
                    cartItems.map((item) =>
                    item._id === product._id
                        ? { ...item, qty: item.qty + 1 }
                        : item
                    )
                )
                } else {
                setCartItems([...cartItems, { ...product, qty: 1 }])
                }

                setShowToast(true)

                setTimeout(() => {
                setShowToast(false)
                }, 2000)
                }}
                    >
                Add To Cart
            </button>
          </div>
        </div>
      </div>
      {showToast && (
        <div style={styles.toast}>Item added to cart!</div>
      )}
    </div>
  )
}

const styles = {
  back: {
    display: 'inline-block',
    marginBottom: '30px',
    textDecoration: 'none',
    color: '#111',
  },
  container: {
    display: 'grid',
    gridTemplateColumns: '2fr 1fr',
    gap: '40px',
  },
  left: {
    backgroundColor: 'white',
    padding: '30px',
    borderRadius: '12px',
    boxShadow: '0 4px 15px rgba(0,0,0,0.08)',
  },
  card: {
    backgroundColor: 'white',
    padding: '30px',
    borderRadius: '12px',
    boxShadow: '0 4px 15px rgba(0,0,0,0.08)',
  },
  title: {
    marginBottom: '20px',
  },
  description: {
    lineHeight: '1.6',
  },
  button: {
    marginTop: '20px',
    width: '100%',
    padding: '12px',
    backgroundColor: '#111',
    color: 'white',
    border: 'none',
    borderRadius: '8px',
    cursor: 'pointer',
    fontSize: '16px',
  },
  toast: {
    position: 'fixed',
    bottom: '30px',
    right: '30px',
    backgroundColor: '#111',
    color: 'white',
    padding: '15px 25px',
    borderRadius: '8px',
    boxShadow: '0 4px 15px rgba(0,0,0,0.2)',
  },
}

export default ProductScreen