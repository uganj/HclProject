import { useParams, Link } from 'react-router-dom'
import { useCart } from '../contexts/CartContext'
import '../styles/MenuPage.css'

function MenuPage() {
  const { category } = useParams()
  const { addToCart, cartItems, totalItems } = useCart()

  const menuData = {
    colddrink: {
      name: 'Cold Drinks',
      emoji: '🥤',
      items: [
        {
          id: 1,
          name: 'Pepsi',
          price: 2.50,
          description: 'Carbonated soft drink',
          icon: '🥤'
        },
        {
          id: 2,
          name: 'Coca Cola',
          price: 2.50,
          description: 'Classic cola drink',
          icon: '🥤'
        },
        {
          id: 3,
          name: 'Sprite',
          price: 2.50,
          description: 'Lemon-lime flavored soda',
          icon: '🥤'
        },
        {
          id: 4,
          name: 'Fanta Orange',
          price: 2.50,
          description: 'Orange flavored soft drink',
          icon: '🥤'
        },
        {
          id: 5,
          name: 'Lemonade',
          price: 3.00,
          description: 'Fresh homemade lemonade',
          icon: '🍋'
        },
        {
          id: 6,
          name: 'Iced Tea',
          price: 3.00,
          description: 'Cold refreshing tea',
          icon: '🍵'
        }
      ]
    },
    pizza: {
      name: 'Pizza',
      emoji: '🍕',
      items: [
        {
          id: 7,
          name: 'Domino\'s Margherita',
          price: 8.99,
          description: 'Classic cheese and tomato',
          icon: '🍕'
        },
        {
          id: 8,
          name: 'Domino\'s Pepperoni',
          price: 9.99,
          description: 'Loaded with pepperoni slices',
          icon: '🍕'
        },
        {
          id: 9,
          name: 'Mac\'s Special',
          price: 10.99,
          description: 'House special with mixed toppings',
          icon: '🍕'
        },
        {
          id: 10,
          name: 'Mac\'s Veggie Delight',
          price: 8.99,
          description: 'Fresh vegetables on crispy base',
          icon: '🍕'
        },
        {
          id: 11,
          name: 'BBQ Chicken',
          price: 10.99,
          description: 'Grilled chicken with BBQ sauce',
          icon: '🍕'
        },
        {
          id: 12,
          name: 'Seafood Supreme',
          price: 12.99,
          description: 'Fish and shrimp toppings',
          icon: '🍕'
        }
      ]
    },
    bread: {
      name: 'Bread',
      emoji: '🍞',
      items: [
        {
          id: 13,
          name: 'Wheat Round',
          price: 1.50,
          description: 'Soft whole wheat bread',
          icon: '🍞'
        },
        {
          id: 14,
          name: 'White Bread',
          price: 1.50,
          description: 'Classic white sliced bread',
          icon: '🍞'
        },
        {
          id: 15,
          name: 'Multigrain Loaf',
          price: 2.50,
          description: 'Healthy multigrain bread',
          icon: '🌾'
        },
        {
          id: 16,
          name: 'Sourdough',
          price: 3.50,
          description: 'Tangy sourdough loaf',
          icon: '🍞'
        },
        {
          id: 17,
          name: 'Rye Bread',
          price: 2.50,
          description: 'Dark rye bread',
          icon: '🍞'
        },
        {
          id: 18,
          name: 'Focaccia',
          price: 3.00,
          description: 'Olive oil topped focaccia',
          icon: '🥖'
        }
      ]
    }
  }

  const currentMenu = menuData[category]

  const handleAddToCart = (item) => {
    addToCart(item)
  }

  const getItemQuantity = (itemId) => {
    const cartItem = cartItems.find(item => item.id === itemId)
    return cartItem ? cartItem.quantity : 0
  }

  if (!currentMenu) {
    return (
      <div className="menu-container">
        <h2>Category not found</h2>
      </div>
    )
  }

  return (
    <div className="menu-container">
      <header className="menu-header">
        <Link to="/" className="back-button">← Back Home</Link>
        <div className="menu-title">
          <span className="menu-emoji">{currentMenu.emoji}</span>
          <h1>{currentMenu.name} Menu</h1>
        </div>
        <div className="header-actions">
          <Link to="/cart" className="cart-button">
            🛒 Cart ({totalItems})
          </Link>
        </div>
      </header>

      <main className="menu-content">
        <div className="items-grid">
          {currentMenu.items.map((item) => (
            <div key={item.id} className="menu-item">
              <div className="item-icon">{item.icon}</div>
              <h3 className="item-name">{item.name}</h3>
              <p className="item-description">{item.description}</p>
              <div className="item-footer">
                <span className="item-price">${item.price.toFixed(2)}</span>
                <button
                  onClick={() => handleAddToCart(item)}
                  className="add-to-cart"
                >
                  {getItemQuantity(item.id) > 0 ? `Add More (${getItemQuantity(item.id)})` : 'Add to Cart'}
                </button>
              </div>
            </div>
          ))}
        </div>
      </main>

      <footer className="menu-footer">
        <p>Select items to add to your cart</p>
      </footer>
    </div>
  )
}

export default MenuPage
