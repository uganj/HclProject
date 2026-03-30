import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useCart } from '../contexts/CartContext'
import '../styles/OrderPage.css'

function OrderPage() {
  const { cartItems, totalPrice, clearCart } = useCart()
  const navigate = useNavigate()

  const [customerInfo, setCustomerInfo] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    zipCode: ''
  })

  const [paymentMethod, setPaymentMethod] = useState('card')
  const [orderPlaced, setOrderPlaced] = useState(false)
  const [orderId, setOrderId] = useState('')

  const deliveryFee = 2.99
  const tax = totalPrice * 0.08
  const finalTotal = totalPrice + deliveryFee + tax

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setCustomerInfo(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleSubmitOrder = (e) => {
    e.preventDefault()

    // Generate order ID
    const newOrderId = 'HCL-' + Date.now().toString().slice(-6)
    setOrderId(newOrderId)

    // Simulate order placement
    setTimeout(() => {
      setOrderPlaced(true)
      clearCart()
    }, 2000)
  }

  const handleNewOrder = () => {
    navigate('/')
  }

  if (cartItems.length === 0 && !orderPlaced) {
    return (
      <div className="order-container">
        <header className="order-header">
          <Link to="/" className="back-button">← Back Home</Link>
          <h1>📋 Order Details</h1>
        </header>

        <main className="order-content">
          <div className="empty-order">
            <div className="empty-order-icon">📋</div>
            <h2>No items to order</h2>
            <p>Please add some items to your cart first.</p>
            <Link to="/" className="browse-button">Browse Categories</Link>
          </div>
        </main>
      </div>
    )
  }

  if (orderPlaced) {
    return (
      <div className="order-container">
        <header className="order-header">
          <h1>🎉 Order Confirmed!</h1>
        </header>

        <main className="order-content">
          <div className="order-success">
            <div className="success-icon">✅</div>
            <h2>Thank you for your order!</h2>
            <div className="order-details">
              <p><strong>Order ID:</strong> {orderId}</p>
              <p><strong>Estimated Delivery:</strong> 30-45 minutes</p>
              <p><strong>Total Amount:</strong> ${finalTotal.toFixed(2)}</p>
            </div>
            <p className="success-message">
              We'll send you updates via email and SMS. Your delicious food is being prepared!
            </p>
            <button onClick={handleNewOrder} className="new-order-button">
              Order More Food →
            </button>
          </div>
        </main>
      </div>
    )
  }

  return (
    <div className="order-container">
      <header className="order-header">
        <Link to="/cart" className="back-button">← Back to Cart</Link>
        <h1>📋 Complete Your Order</h1>
      </header>

      <main className="order-content">
        <div className="order-layout">
          <div className="order-form-section">
            <form onSubmit={handleSubmitOrder} className="order-form">
              <section className="form-section">
                <h3>👤 Customer Information</h3>
                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="name">Full Name *</label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={customerInfo.name}
                      onChange={handleInputChange}
                      required
                      placeholder="Enter your full name"
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="email">Email *</label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={customerInfo.email}
                      onChange={handleInputChange}
                      required
                      placeholder="your@email.com"
                    />
                  </div>
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="phone">Phone Number *</label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={customerInfo.phone}
                      onChange={handleInputChange}
                      required
                      placeholder="(555) 123-4567"
                    />
                  </div>
                </div>
              </section>

              <section className="form-section">
                <h3>📍 Delivery Address</h3>
                <div className="form-group">
                  <label htmlFor="address">Street Address *</label>
                  <input
                    type="text"
                    id="address"
                    name="address"
                    value={customerInfo.address}
                    onChange={handleInputChange}
                    required
                    placeholder="123 Main Street"
                  />
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="city">City *</label>
                    <input
                      type="text"
                      id="city"
                      name="city"
                      value={customerInfo.city}
                      onChange={handleInputChange}
                      required
                      placeholder="City"
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="zipCode">ZIP Code *</label>
                    <input
                      type="text"
                      id="zipCode"
                      name="zipCode"
                      value={customerInfo.zipCode}
                      onChange={handleInputChange}
                      required
                      placeholder="12345"
                    />
                  </div>
                </div>
              </section>

              <section className="form-section">
                <h3>💳 Payment Method</h3>
                <div className="payment-methods">
                  <label className="payment-option">
                    <input
                      type="radio"
                      name="payment"
                      value="card"
                      checked={paymentMethod === 'card'}
                      onChange={(e) => setPaymentMethod(e.target.value)}
                    />
                    <span className="payment-label">💳 Credit/Debit Card</span>
                  </label>
                  <label className="payment-option">
                    <input
                      type="radio"
                      name="payment"
                      value="cash"
                      checked={paymentMethod === 'cash'}
                      onChange={(e) => setPaymentMethod(e.target.value)}
                    />
                    <span className="payment-label">💵 Cash on Delivery</span>
                  </label>
                </div>
              </section>

              <button type="submit" className="place-order-button">
                Place Order - ${finalTotal.toFixed(2)}
              </button>
            </form>
          </div>

          <div className="order-summary-section">
            <div className="order-summary">
              <h3>🛒 Order Summary</h3>

              <div className="order-items">
                {cartItems.map((item) => (
                  <div key={item.id} className="order-item">
                    <div className="item-info">
                      <span className="item-emoji">{item.icon}</span>
                      <div>
                        <div className="item-name">{item.name}</div>
                        <div className="item-quantity">Qty: {item.quantity}</div>
                      </div>
                    </div>
                    <div className="item-price">${(item.price * item.quantity).toFixed(2)}</div>
                  </div>
                ))}
              </div>

              <div className="order-totals">
                <div className="total-row">
                  <span>Subtotal:</span>
                  <span>${totalPrice.toFixed(2)}</span>
                </div>
                <div className="total-row">
                  <span>Delivery Fee:</span>
                  <span>${deliveryFee.toFixed(2)}</span>
                </div>
                <div className="total-row">
                  <span>Tax:</span>
                  <span>${tax.toFixed(2)}</span>
                </div>
                <div className="total-row final-total">
                  <span>Total:</span>
                  <span>${finalTotal.toFixed(2)}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}

export default OrderPage
