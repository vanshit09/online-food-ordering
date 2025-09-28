import React, { useState } from "react";
import SmartNavbar from "../Navbar/SmartNavbar";
import Image from "./../../components/images/foodie.jpeg";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import "../../../src/./App.css";

export const Register = () => {
    const [fullname, setfullName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const { register } = useAuth();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");
        setLoading(true);

        if (fullname === '' || email === '' || password === '') {
            setError("Please fill out all fields");
            setLoading(false);
            return;
        }

        try {
            const result = await register(fullname, email, password);
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
    }
    return (
        <div>
            <SmartNavbar/>
            <div className="App">
                <div className="auth-form-container">
                    <h2>Register</h2>
                    {error && <div className="error-message" style={{color: 'red', marginBottom: '10px'}}>{error}</div>}
                    <form className="register-form" onSubmit={handleSubmit}>
                        <label htmlFor="fullname">Full name</label>
                        <input 
                            value={fullname} 
                            onChange={(e)=>{setfullName(e.target.value)}} 
                            type="text" 
                            placeholder="Enter your Full name"
                            required
                        />
                        <label htmlFor="email">Email</label>
                        <input 
                            value={email} 
                            onChange={(e)=>{setEmail(e.target.value)}} 
                            type="email" 
                            placeholder="Enter your email"
                            required
                        />
                        <label htmlFor="password">Password</label>
                        <input 
                            value={password} 
                            onChange={(e)=>{setPassword(e.target.value)}} 
                            type="password" 
                            placeholder="Enter your password"
                            required
                        />
                        <button type="submit" disabled={loading}>
                            {loading ? 'Registering...' : 'Register'}
                        </button>
                    </form>
                    <p style={{textAlign: 'center', marginTop: '15px'}}>
                        Already have an account? <a href="/login" style={{color: '#eb9a03'}}>Login here</a>
                    </p>
                </div>
            </div>
            <img className="register" src={Image}/>
        </div>
    )
}