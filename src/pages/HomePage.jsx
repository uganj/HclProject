import { Link } from 'react-router-dom'
import { useCart } from '../contexts/CartContext'
import '../styles/HomePage.css'

function HomePage() {
  const { totalItems } = useCart()

  const categories = [
    {
      id: 'colddrink',
      name: 'Cold Drinks',
      emoji: '🥤',
      color: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      description: 'Refresh yourself with cool beverages'
    },
    {
      id: 'pizza',
      name: 'Pizza',
      emoji: '🍕',
      color: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
      description: 'Delicious cheesy pizzas'
    },
    {
      id: 'bread',
      name: 'Bread',
      emoji: '🍞',
      color: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
      description: 'Fresh and fluffy bread'
    }
  ]

  return (
    <div className="home-container">
      <header className="header">
        <div className="header-content">
          <h1 className="app-title">🏠 HCL Home</h1>
          <p className="app-subtitle">Food Delivery Service</p>
        </div>
        <Link to="/cart" className="cart-link">
          🛒 Cart ({totalItems})
        </Link>
      </header>

      <main className="main-content">
        <section className="welcome-section">
          <h2>Choose Your Category</h2>
          <p>Select what you'd like to order today</p>
        </section>

        <div className="categories-grid">
          {categories.map((category) => (
            <Link 
              key={category.id} 
              to={`/menu/${category.id}`}
              className="category-card-link"
            >
              <div 
                className="category-card" 
                style={{ background: category.color }}
              >
                <div className="emoji-container">
                  <span className="emoji">{category.emoji}</span>
                </div>
                <h3 className="category-name">{category.name}</h3>
                <p className="category-description">{category.description}</p>
                <button className="category-button">
                  View Menu →
                </button>
              </div>
            </Link>
          ))}
        </div>
      </main>

      <footer className="footer">
        <p>&copy; 2024 HCL Home. All rights reserved.</p>
      </footer>
    </div>
  )
}

export default HomePage
