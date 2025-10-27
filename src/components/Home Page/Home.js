import React, { useState, useEffect } from "react";
import Image from "./../images/gkmit.jpeg";
import SmartNavbar from "../Navbar/SmartNavbar";
import { useAuth } from "../../context/AuthContext";
import "./Home.css"

const Home = () => {
<<<<<<< HEAD
  const [featuredItems, setFeaturedItems] = useState([]);
=======
>>>>>>> f5a76c9 (final commit)
  const [showScrollTop, setShowScrollTop] = useState(false);
  const { user, token } = useAuth();

  useEffect(() => {
<<<<<<< HEAD
    // Fetch featured food items
    fetch('http://localhost:5000/api/foods')
      .then(res => res.json())
      .then(data => {
        // Take first 6 items as featured
        setFeaturedItems(data.slice(0, 6));
      })
      .catch(err => {
        console.log('Error fetching foods:', err);
        // Fallback sample data if API fails
        setFeaturedItems([
          { food_name: 'Delicious Pizza', food_price: 299, food_image: './images/Pizza.jpeg' },
          { food_name: 'Crispy Burger', food_price: 199, food_image: './images/Burger.jpeg' },
          { food_name: 'Tasty Dosa', food_price: 149, food_image: './images/Dosa.jpeg' },
          { food_name: 'Paneer Parantha', food_price: 179, food_image: './images/Paneerparantha.jpeg' },
          { food_name: 'Chocolate Shake', food_price: 129, food_image: './images/Chocolateshake.jpeg' },
          { food_name: 'Strawberry Shake', food_price: 129, food_image: './images/Strawberryshake.jpeg' }
        ]);
      });

=======
>>>>>>> f5a76c9 (final commit)
    // Add scroll listener for scroll to top button
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 300);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

<<<<<<< HEAD
  const addToCart = (foodId) => {
    console.log('Home: Add to cart called with ID:', foodId);
    console.log('Home: User:', user);
    console.log('Home: Token:', token ? 'Present' : 'Missing');
    
    if (!user) {
      alert('Please login to add items to cart');
      return;
    }
    
    if (!token) {
      alert('Authentication token missing. Please login again.');
      return;
    }
    
    const url = "http://localhost:5000/api/cart";
    const params = {
      method: 'post',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify({
        food_id: foodId
      })
    };
    
    console.log('Home: Making request to:', url);
    console.log('Home: Request params:', params);
    
    fetch(url, params)
    .then((res) => {
      console.log('Home: Response status:', res.status);
      console.log('Home: Response headers:', res.headers);
      if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`);
      }
      return res.json();
    })
    .then((data) => {
      console.log('Home: Add to cart response:', data);
      if (data.message) {
        alert('Item added to cart successfully!');
      } else if (data.error) {
        alert(`Error: ${data.error}`);
      }
    })
    .catch(err => {
      console.error('Home: Error adding to cart:', err);
      console.error('Home: Error details:', err.message);
      alert('Error adding item to cart. Please try again.');
    });
  };

=======
>>>>>>> f5a76c9 (final commit)
  return (
    <>
      <SmartNavbar />
      <section id="hero">
        <div className="hero-container">
          <div className="hero-logo">
            <img src={Image} alt="GKMIT Restaurant"/>
          </div>
          <h1>Welcome To GKMIT Restaurant</h1>
          <h2>Delight in every bite</h2>
          <div className="actions">
            <a href="/login" className="main-2">Login</a>
            <a href="/register" className="main-1">Register</a>
<<<<<<< HEAD
            <a href="/menu" className="main-1">View Menu</a>
=======
>>>>>>> f5a76c9 (final commit)
          </div>
        </div>
      </section>

      {/* Special Offers Banner */}
      <section id="offers-banner">
        <div className="container">
          <div className="offers-content">
            <div className="offer-item">
              <span className="offer-icon">🎉</span>
              <div className="offer-text">
                <h3>20% OFF</h3>
                <p>On your first order</p>
              </div>
            </div>
            <div className="offer-item">
              <span className="offer-icon">🚚</span>
              <div className="offer-text">
                <h3>FREE DELIVERY</h3>
                <p>Orders above ₹500</p>
              </div>
            </div>
            <div className="offer-item">
              <span className="offer-icon">⭐</span>
              <div className="offer-text">
                <h3>RATING 4.8</h3>
                <p>Based on 1000+ reviews</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Quick Stats */}
      <section id="quick-stats">
        <div className="container">
          <div className="quick-stats-grid">
            <div className="stat-box">
              <div className="stat-number">1000+</div>
              <div className="stat-label">Happy Customers</div>
            </div>
            <div className="stat-box">
              <div className="stat-number">50+</div>
              <div className="stat-label">Menu Items</div>
            </div>
            <div className="stat-box">
              <div className="stat-number">5+</div>
              <div className="stat-label">Years Experience</div>
            </div>
            <div className="stat-box">
              <div className="stat-number">24/7</div>
              <div className="stat-label">Customer Support</div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features">
        <div className="container">
          <h2 className="section-title">Why Choose Us?</h2>
          <div className="features-grid">
            <div className="feature-card">
              <div className="feature-icon">🍽️</div>
              <h3>Fresh Ingredients</h3>
              <p>We use only the freshest ingredients sourced from local farms</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">⚡</div>
              <h3>Fast Delivery</h3>
              <p>Quick and reliable delivery service to your doorstep</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">👨‍🍳</div>
              <h3>Expert Chefs</h3>
              <p>Our experienced chefs prepare every dish with love and care</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">💰</div>
              <h3>Best Prices</h3>
              <p>Quality food at affordable prices for everyone</p>
            </div>
          </div>
        </div>
      </section>

<<<<<<< HEAD
      {/* Featured Menu Section */}
      <section id="featured-menu">
        <div className="container">
          <h2 className="section-title">Featured Dishes</h2>
          <div className="menu-grid">
            {featuredItems.map((item, index) => (
              <div key={index} className="menu-card">
                <div className="menu-image">
                  <img src={item.food_image || './images/Vanillashake.jpeg'} alt={item.food_name} />
                </div>
                <div className="menu-content">
                  <h3>{item.food_name}</h3>
                  <p className="price">₹{item.food_price}</p>
                  <button 
                    className="order-btn" 
                    onClick={() => addToCart(item._id)}
                  >
                    Add to Cart
                  </button>
                </div>
              </div>
            ))}
          </div>
          <div className="text-center">
            <a href="/menu" className="btn-primary">View Full Menu</a>
          </div>
        </div>
      </section>
=======
      {/* Removed Featured Menu and menu links to keep Home focused on auth */}
>>>>>>> f5a76c9 (final commit)

      {/* Statistics Section */}
      <section id="stats">
        <div className="container">
          <div className="stats-grid">
            <div className="stat-item">
              <h3>1000+</h3>
              <p>Happy Customers</p>
            </div>
            <div className="stat-item">
              <h3>50+</h3>
              <p>Menu Items</p>
            </div>
            <div className="stat-item">
              <h3>5+</h3>
              <p>Years Experience</p>
            </div>
            <div className="stat-item">
              <h3>24/7</h3>
              <p>Customer Support</p>
            </div>
          </div>
        </div>
      </section>

<<<<<<< HEAD

=======
>>>>>>> f5a76c9 (final commit)
      {/* Call to Action Section */}
      <section id="cta">
        <div className="container">
          <div className="cta-content">
<<<<<<< HEAD
            <h2>Ready to Order?</h2>
            <p>Join thousands of satisfied customers and experience the best food in town!</p>
            <div className="cta-buttons">
              <a href="/register" className="btn-primary">Get Started</a>
              <a href="/menu" className="btn-secondary">Browse Menu</a>
=======
            <h2>Ready to Join?</h2>
            <p>Create an account or login to continue.</p>
            <div className="cta-buttons">
              <a href="/register" className="btn-primary">Get Started</a>
              <a href="/login" className="btn-secondary">Login</a>
>>>>>>> f5a76c9 (final commit)
            </div>
          </div>
        </div>
      </section>

      {/* Floating Action Buttons */}
      <div className="floating-buttons">
        {showScrollTop && (
          <button className="scroll-to-top" onClick={scrollToTop} title="Scroll to top">
            ↑
          </button>
        )}
<<<<<<< HEAD
        <a href="/menu" className="floating-menu-btn" title="View Menu">
          🍽️
        </a>
=======
>>>>>>> f5a76c9 (final commit)
        <a href="/cart" className="floating-cart-btn" title="View Cart">
          🛒
        </a>
      </div>
    </>
  );
};

export default Home;
