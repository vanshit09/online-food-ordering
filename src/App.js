import {
  BrowserRouter,
  Routes,
  Route,
  Navigate
} from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import Home from "./components/Home Page/Home";
import Menu from "./components/Menu/Menu";
import { Login } from "./components/User/login";
import { Register } from "./components/User/register";
import './App.css';
import Checkout from "./components/cart/Checkout";
import Payment from "./components/Payment/Payment";
import Contactus from "./components/Contactus/Contactus";
import Aboutus from "./components/Aboutus/Aboutus";
import ProtectedRoute from "./components/ProtectedRoute";

function App() {
  return (
    <AuthProvider>
      <div className="background">
        <BrowserRouter>          
          <div className="container"></div>
          <Routes>
            {/* Public Routes */}
            <Route path="/" element={<Home/>}/>
            <Route path="/home" element={<Home/>} />
            <Route path="/menu" element={<Menu/>} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/aboutus" element={<Aboutus/>} />
            <Route path="/contactus" element={<Contactus/>} />
            
            {/* Protected Routes - Require Authentication */}
            <Route path="/cart" element={
              <ProtectedRoute>
                <Checkout/>
              </ProtectedRoute>
            } />
            <Route path="/payment" element={
              <ProtectedRoute>
                <Payment/>
              </ProtectedRoute>
            } />
            
            {/* Redirect any unknown routes to home */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </BrowserRouter>
      </div>
    </AuthProvider>
  );
}

export default App;