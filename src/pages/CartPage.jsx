import { Link } from 'react-router-dom'
import { useCart } from '../contexts/CartContext'
import '../styles/CartPage.css'

function CartPage() {
  const { cartItems, totalItems, totalPrice, removeFromCart, updateQuantity, clearCart } = useCart()

  const handleQuantityChange = (itemId, newQuantity) => {
    updateQuantity(itemId, newQuantity)
  }

  const handleRemoveItem = (itemId) => {
    removeFromCart(itemId)
  }

  const handleClearCart = () => {
    if (window.confirm('Are you sure you want to clear your cart?')) {
      clearCart()
    }
  }

  if (cartItems.length === 0) {
    return (
      <div className="cart-container">
        <header className="cart-header">
          <Link to="/" className="back-button">← Back Home</Link>
          <h1>🛒 Your Cart</h1>
        </header>

        <main className="cart-content">
          <div className="empty-cart">
            <div className="empty-cart-icon">🛒</div>
            <h2>Your cart is empty</h2>
            <p>Add some delicious items from our menu!</p>
            <Link to="/" className="browse-button">Browse Categories</Link>
          </div>
        </main>
      </div>
    )
  }

  return (
    <div className="cart-container">
      <header className="cart-header">
        <Link to="/" className="back-button">← Back Home</Link>
        <h1>🛒 Your Cart ({totalItems} items)</h1>
        <button onClick={handleClearCart} className="clear-cart-button">
          Clear Cart
        </button>
      </header>

      <main className="cart-content">
        <div className="cart-items">
          {cartItems.map((item) => (
            <div key={item.id} className="cart-item">
              <div className="item-image">
                <span className="item-emoji">{item.icon}</span>
              </div>

              <div className="item-details">
                <h3 className="item-name">{item.name}</h3>
                <p className="item-description">{item.description}</p>
                <div className="item-price">${item.price}</div>
              </div>

              <div className="item-controls">
                <div className="quantity-controls">
                  <button
                    onClick={() => handleQuantityChange(item.id, item.quantity - 1)}
                    className="quantity-btn"
                  >
                    −
                  </button>
                  <span className="quantity">{item.quantity}</span>
                  <button
                    onClick={() => handleQuantityChange(item.id, item.quantity + 1)}
                    className="quantity-btn"
                  >
                    +
                  </button>
                </div>

                <div className="item-total">
                  ${(item.price * item.quantity).toFixed(2)}
                </div>

                <button
                  onClick={() => handleRemoveItem(item.id)}
                  className="remove-btn"
                >
                  🗑️
                </button>
              </div>
            </div>
          ))}
        </div>

        <div className="cart-summary">
          <div className="summary-row">
            <span>Subtotal ({totalItems} items):</span>
            <span>${totalPrice.toFixed(2)}</span>
          </div>
          <div className="summary-row">
            <span>Delivery Fee:</span>
            <span>$2.99</span>
          </div>
          <div className="summary-row">
            <span>Tax:</span>
            <span>${(totalPrice * 0.08).toFixed(2)}</span>
          </div>
          <div className="summary-row total">
            <span>Total:</span>
            <span>${(totalPrice + 2.99 + (totalPrice * 0.08)).toFixed(2)}</span>
          </div>

          <Link to="/order" className="checkout-button">
            Proceed to Checkout →
          </Link>
        </div>
      </main>
    </div>
  )
}

export default CartPage
