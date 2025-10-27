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
<<<<<<< HEAD
=======
import ManageMenu from "./components/Restaurant/ManageMenu";
import MyOrders from "./components/Orders/MyOrders";
import RestaurantOrders from "./components/Orders/RestaurantOrders";
>>>>>>> f5a76c9 (final commit)

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
<<<<<<< HEAD
            <Route path="/menu" element={<Menu/>} />
=======
            <Route path="/menu" element={
              <ProtectedRoute>
                <Menu/>
              </ProtectedRoute>
            } />
>>>>>>> f5a76c9 (final commit)
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
<<<<<<< HEAD
=======
            <Route path="/restaurant/menu" element={
              <ProtectedRoute roles={["restaurant"]}>
                <ManageMenu/>
              </ProtectedRoute>
            } />
            <Route path="/orders" element={
              <ProtectedRoute roles={["customer"]}>
                <MyOrders/>
              </ProtectedRoute>
            } />
            <Route path="/restaurant/orders" element={
              <ProtectedRoute roles={["restaurant"]}>
                <RestaurantOrders/>
              </ProtectedRoute>
            } />
>>>>>>> f5a76c9 (final commit)
            
            {/* Redirect any unknown routes to home */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </BrowserRouter>
      </div>
    </AuthProvider>
  );
}

export default App;