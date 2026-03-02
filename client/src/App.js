import { useEffect, useState } from 'react'

function App() {
  const [products, setProducts] = useState([])

  useEffect(() => {
    fetch('http://localhost:5000/api/products')
      .then((res) => res.json())
      .then((data) => setProducts(data.products))
      .catch((err) => console.log(err))
  }, [])

  return (
    <div style={{ padding: '40px' }}>
      <h1>My Products</h1>

      {products.length === 0 ? (
        <h2>No products found</h2>
      ) : (
        products.map((product) => (
          <div key={product._id} style={{ marginBottom: '20px' }}>
            <h3>{product.name}</h3>
            <p>${product.price}</p>
          </div>
        ))
      )}
    </div>
  )
}

export default App