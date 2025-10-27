import React from 'react';
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from '../../context/AuthContext';

const SmartNavbar = () => {
  const { user, isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <nav className="navbar navbar-expand-lg bg-light" style={{fontFamily: '"Merriweather", serif'}}>
      <div className="container-fluid">
        <Link className="navbar-brand" to="/" style={{ marginLeft: "20px" }}>
          GKMIT RESTAURANT
        </Link>
        
        <div className="navbar-nav me-auto">
<<<<<<< HEAD
          <Link className="nav-link" to="/menu">
            <b>Checkout the Tasty Food</b>
          </Link>
=======
          {!isAuthenticated || user?.role !== 'restaurant' ? (
            <Link className="nav-link" to="/menu">
              <b>Checkout the Tasty Food</b>
            </Link>
          ) : (
            <Link className="nav-link" to="/restaurant/menu">
              <b>Manage Menu</b>
            </Link>
          )}
>>>>>>> f5a76c9 (final commit)
        </div>

        <div className="navbar-nav">
          <Link className="btn btn-outline-primary mx-2" to="/aboutus">
            About Us
          </Link>
          <Link className="btn btn-outline-primary mx-2" to="/contactus">
            Contact Us
          </Link>
          
          {isAuthenticated ? (
            <>
<<<<<<< HEAD
              <Link className="btn btn-primary mx-2" to="/cart">
                Cart 🛒
              </Link>
=======
              {user?.role !== 'restaurant' && (
                <Link className="btn btn-primary mx-2" to="/cart">
                  Cart 🛒
                </Link>
              )}
>>>>>>> f5a76c9 (final commit)
              <div className="dropdown">
                <button 
                  className="btn btn-outline-secondary dropdown-toggle mx-2" 
                  type="button" 
                  data-bs-toggle="dropdown"
                >
                  {user?.name || 'User'}
                </button>
                <ul className="dropdown-menu">
                  <li><span className="dropdown-item-text">Welcome, {user?.name}</span></li>
                  <li><hr className="dropdown-divider" /></li>
<<<<<<< HEAD
=======
                  {user?.role === 'customer' && (
                    <li><Link className="dropdown-item" to="/orders">My Orders</Link></li>
                  )}
                  {user?.role === 'restaurant' && (
                    <>
                      <li><Link className="dropdown-item" to="/restaurant/menu">Manage Menu</Link></li>
                      <li><Link className="dropdown-item" to="/restaurant/orders">Incoming Orders</Link></li>
                    </>
                  )}
>>>>>>> f5a76c9 (final commit)
                  <li>
                    <button className="dropdown-item" onClick={handleLogout}>
                      Sign Out
                    </button>
                  </li>
                </ul>
              </div>
            </>
          ) : (
            <>
              <Link className="btn btn-primary mx-2" to="/login">
                Login
              </Link>
              <Link className="btn btn-success mx-2" to="/register">
                Sign Up
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default SmartNavbar;
