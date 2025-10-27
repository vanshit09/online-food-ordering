import { useEffect, useState } from "react";
<<<<<<< HEAD
import { Link } from "react-router-dom";
=======
import { Link, useNavigate } from "react-router-dom";
>>>>>>> f5a76c9 (final commit)
import Button from "react-bootstrap/Button";
import InputGroup from 'react-bootstrap/InputGroup';
import Form from 'react-bootstrap/Form';
import SmartNavbar from "../Navbar/SmartNavbar";
import { useAuth } from "../../context/AuthContext";
import "./Checkout.css"
import image from "./../images/food.webp"

export default function Checkout() {
  const [data, setData] = useState([]);
  const [total, setTotal] = useState(0);
  const { user, token } = useAuth();
<<<<<<< HEAD
=======
  const navigate = useNavigate();
>>>>>>> f5a76c9 (final commit)
  
  const getData = () => {
    if (!user) return;
    
    const url = `http://localhost:5000/api/cart/${user.id}`;
    const params = {
      method: "get",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
      },
    };
    fetch(url, params)
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        console.log(data);
        setData(data);
        // Calculate total
        const cartTotal = data.reduce((sum, item) => {
          return sum + (item.food_id?.food_price || 0) * item.quantity;
        }, 0);
        setTotal(cartTotal);
      })
      .catch(err => {
        console.error('Error fetching cart:', err);
      });
  };

<<<<<<< HEAD
=======
  const checkout = async () => {
    try {
      if (!user || !token) {
        alert('Please login to proceed.');
        return;
      }
      const res = await fetch('http://localhost:5000/api/orders/checkout', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        }
      });
      if (!res.ok) {
        const text = await res.text();
        let msg = `Failed to place order (${res.status})`;
        try { const j = JSON.parse(text); msg = j.error || j.message || msg; } catch(_){ msg = text || msg; }
        throw new Error(msg);
      }
      await res.json();
      // Clear local cart state
      setData([]);
      setTotal(0);
      alert('Ordered successfully!');
      navigate('/orders');
    } catch (err) {
      console.error('Checkout error:', err);
      alert(err.message || 'Failed to place order. Please try again.');
    }
  };

>>>>>>> f5a76c9 (final commit)
  const updateQuantity = (cartId, newQuantity) => {
    if (newQuantity < 1) return;
    
    const url = `http://localhost:5000/api/cart/${cartId}`;
    const params = {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
      },
      body: JSON.stringify({ quantity: newQuantity })
    };
    
    fetch(url, params)
      .then((res) => res.json())
      .then((result) => {
        if (result.message) {
          getData(); // Refresh cart data
        }
      })
      .catch(err => {
        console.error('Error updating quantity:', err);
        alert('Error updating quantity. Please try again.');
      });
  };

  const removeItem = (cartId) => {
    if (!window.confirm('Are you sure you want to remove this item from cart?')) {
      return;
    }
    
    const url = `http://localhost:5000/api/cart/${cartId}`;
    const params = {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
      }
    };
    
    fetch(url, params)
      .then((res) => res.json())
      .then((result) => {
        if (result.message) {
          getData(); // Refresh cart data
          alert('Item removed from cart successfully!');
        }
      })
      .catch(err => {
        console.error('Error removing item:', err);
        alert('Error removing item. Please try again.');
      });
  };

  const clearCart = () => {
    if (!window.confirm('Are you sure you want to clear your entire cart?')) {
      return;
    }
    
    const url = `http://localhost:5000/api/cart/user/${user.id}`;
    const params = {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
      }
    };
    
    fetch(url, params)
      .then((res) => res.json())
      .then((result) => {
        if (result.message) {
          getData(); // Refresh cart data
          alert('Cart cleared successfully!');
        }
      })
      .catch(err => {
        console.error('Error clearing cart:', err);
        alert('Error clearing cart. Please try again.');
      });
  };

  useEffect(()=>{
    getData()
<<<<<<< HEAD
  },[])
=======
  },[user, token])
>>>>>>> f5a76c9 (final commit)

  return (
    <>
      <SmartNavbar />
      <div style={{ height: "100%",backgroundImage:`url(${image})`,backgroundSize:"cover",fontFamily:' "Merriweather", serif'}}>
        <div className="checkout-container">
          <h1 className="h1" >
           <div> Your Food Cart</div>
          </h1>
          <div style={{ display: 'flex', gap: '10px', marginBottom: '20px' }}>
            <Link className="btn btn-light" to="/menu" role="button">
              Back to Menu
            </Link>
            {data.length > 0 && (
              <Button variant="outline-danger" onClick={clearCart}>
                Clear Cart
              </Button>
            )}
          </div>
          <h3 className="h3">
            <i>Checkout your favourite food Added: </i>
          </h3>
          <div className="cart-container">
            
           {data.length === 0 ? (
            <div className="empty-cart">
              <h4>Your cart is empty</h4>
              <p>Add some delicious food items to get started!</p>
              <Link className="btn btn-primary" to="/menu">Browse Menu</Link>
            </div>
          ) : (
            data.map((item, index) => {
              const food = item.food_id;
              return (
                <div key={index} className="fooditem" style={{ 
                  display: 'flex', 
                  justifyContent: 'space-between', 
                  alignItems: 'center', 
                  padding: '15px', 
                  margin: '10px 0', 
                  border: '1px solid #ddd', 
                  borderRadius: '8px',
                  backgroundColor: 'rgba(255, 255, 255, 0.9)'
                }}>
                  <div style={{ flex: '2' }}>
                    <div className="foodname" style={{ fontWeight: 'bold', fontSize: '18px' }}>
                      {food?.food_name || 'Unknown Item'}
                    </div>
                    <div style={{ color: '#666' }}>₹{food?.food_price || 0} each</div>
                  </div>
                  
                  <div style={{ flex: '1', display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <Button 
                      variant="outline-secondary" 
                      size="sm"
                      onClick={() => updateQuantity(item._id, item.quantity - 1)}
                      disabled={item.quantity <= 1}
                    >
                      -
                    </Button>
                    <span style={{ minWidth: '30px', textAlign: 'center', fontWeight: 'bold' }}>
                      {item.quantity}
                    </span>
                    <Button 
                      variant="outline-secondary" 
                      size="sm"
                      onClick={() => updateQuantity(item._id, item.quantity + 1)}
                    >
                      +
                    </Button>
                  </div>
                  
                  <div style={{ flex: '1', textAlign: 'center' }}>
                    <div style={{ fontWeight: 'bold', fontSize: '16px' }}>
                      ₹{(food?.food_price || 0) * item.quantity}
                    </div>
                  </div>
                  
                  <div style={{ flex: '0.5' }}>
                    <Button 
                      variant="outline-danger" 
                      size="sm"
                      onClick={() => removeItem(item._id)}
                      title="Remove item"
                    >
                      🗑️
                    </Button>
                  </div>
                </div>
              );
            })
          )}

<<<<<<< HEAD
      <div className="coupon">
      <InputGroup className="mb-3">
        <Form.Control
          placeholder="Have a coupon code"
          aria-label=""
          aria-describedby="basic-addon2"
        />
        <Button variant="outline-primary" id="button-addon2">
          Apply
        </Button>
      </InputGroup>
      </div>
=======
      {/* Coupon section removed as requested */}
>>>>>>> f5a76c9 (final commit)
      
      {data.length > 0 && (
        <div className="total-section">
          <h3 style={{ color: '#007bff', marginBottom: '20px' }}>
            Total: ₹{total}
          </h3>
          <div style={{ display: 'flex', gap: '15px', justifyContent: 'center' }}>
            <Button variant="outline-secondary" onClick={clearCart}>
              Clear All Items
            </Button>
<<<<<<< HEAD
            <Link className="btn btn-primary btn-lg" to="/payment">
              Proceed to Payment (₹{total})
            </Link>
=======
            <Button className="btn btn-primary btn-lg" onClick={checkout}>
              Place Order (₹{total})
            </Button>
>>>>>>> f5a76c9 (final commit)
          </div>
        </div>
      )}
          </div>
        </div>
        
      </div>
    </>
  );
}
