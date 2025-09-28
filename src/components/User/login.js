import React, { useState } from "react";
import SmartNavbar from "../Navbar/SmartNavbar";
import Image from "./../../components/images/foodie.jpeg";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import "../../../src/./App.css";

export const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    if (email === "" || password === "") {
      setError("Please fill out all fields");
      setLoading(false);
      return;
    }

    try {
      const result = await login(email, password);
      if (result.success) {
        navigate("/menu");
      } else {
        setError(result.message);
      }
    } catch (error) {
      setError("An error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <SmartNavbar />
      <div className="App">
        <div className="auth-form-container">
          <h2>Login</h2>
          {error && <div className="error-message" style={{color: 'red', marginBottom: '10px'}}>{error}</div>}
          <form className="login-form" onSubmit={handleSubmit}>
            <label htmlFor="email">Email</label>
            <input 
              value={email} 
              onChange={(e) => setEmail(e.target.value)}
              type="email" 
              placeholder="Enter your email id"
              required
            />
            <label htmlFor="password">Password</label>
            <input 
              value={password} 
              onChange={(e) => setPassword(e.target.value)}
              type="password" 
              placeholder="********"
              required
            />
            <button type="submit" disabled={loading}>
              {loading ? 'Logging in...' : 'Log In'}
            </button>
          </form>
          <p style={{textAlign: 'center', marginTop: '15px'}}>
            Don't have an account? <a href="/register" style={{color: '#eb9a03'}}>Sign up here</a>
          </p>
        </div>
      </div>
      <img className="login" src={Image} />
    </>
  );
};
