import React, { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route, useNavigate } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';

import PrivateRoute from "./component/privateRoute";
import PublicOnlyRoute from "./component/publiconlyroute";


import Layout from "./component/Layout";


import Home from "./pages/home";
import Login from "./pages/login";
import Signup from "./pages/signup";
import Dashboard from "./pages/dashboard";
import Admin from "./pages/admin";
import Agent from "./pages/agent";
import Buyer from "./pages/buyer";
import SellProperty from "./pages/sellForm";
import UserManagement from "./pages/adminusers";
import TransactionRecords from "./pages/tranRecord";
import BuyerRequests from "./pages/buyerReq";
import SoldProperties from "./pages/soldprop";
import ContactAgent from "./pages/ContactAgent";
import Favorites from "./pages/Favorites";
import Properties from "./pages/properties";
import Profile from "./pages/profile";
import Buy from "./pages/buy";
import Details from "./pages/details";
import NoPage from "./pages/nopage";

function App() {
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentUser, setCurrentUser] = useState(null); 
  useEffect(() => {
    const fetchProperties = async () => {
      try {
        const response = await fetch("http://localhost:3000/properties");
        const data = await response.json();
        setProperties(data);
        localStorage.setItem("properties", JSON.stringify(data));
      } catch (error) {
        console.error("Failed to fetch properties:", error);
        const stored = localStorage.getItem("properties");
        if (stored) {
          setProperties(JSON.parse(stored));
        }
      } finally {
        setLoading(false);
      }
    };

    fetchProperties();

    const userData = JSON.parse(localStorage.getItem("user"));
    setCurrentUser(userData);
  }, []);

  const addProperty = (newProperty) => {
    setProperties((prev) => [...prev, newProperty]);
  };    

  const logout = () => {
    localStorage.removeItem("user");
    setCurrentUser(null);
    window.location.href = "/home";
  };

  if (loading) return <div className="text-center mt-5">Loading properties...</div>;

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<PublicOnlyRoute><Login /></PublicOnlyRoute>} />
        <Route path="/signup" element={<PublicOnlyRoute><Signup /></PublicOnlyRoute>} />
        <Route path="/" element={<Home />} />
        <Route path="/home" element={<Home />} />

        <Route path="/dashboard" element={<PrivateRoute><Layout user={currentUser} handleLogout={logout}><Dashboard /></Layout></PrivateRoute>} />
        <Route path="/adminusers" element={<PrivateRoute><Layout user={currentUser} handleLogout={logout}><UserManagement /></Layout></PrivateRoute>} />
        <Route path="/details/:id" element={<PrivateRoute><Layout user={currentUser} handleLogout={logout}><Details /></Layout></PrivateRoute>} />
        <Route path="/tranRecord" element={<PrivateRoute><Layout user={currentUser} handleLogout={logout}><TransactionRecords /></Layout></PrivateRoute>} />
        <Route path="/buyerReq" element={<Layout user={currentUser} handleLogout={logout}><BuyerRequests /></Layout>} />
        <Route path="/soldprop" element={<PrivateRoute><Layout user={currentUser} handleLogout={logout}><SoldProperties /></Layout></PrivateRoute>} />
        <Route path="/contact-agent" element={<PrivateRoute><Layout user={currentUser} handleLogout={logout}><ContactAgent /></Layout></PrivateRoute>} />
        <Route path="/Favorites" element={<PrivateRoute><Layout user={currentUser} handleLogout={logout}><Favorites /></Layout></PrivateRoute>} />
        <Route path="/admin" element={<PrivateRoute><Layout user={currentUser} handleLogout={logout}><Admin /></Layout></PrivateRoute>} />
        <Route path="/agent" element={<PrivateRoute><Layout user={currentUser} handleLogout={logout}><Agent /></Layout></PrivateRoute>} />
        <Route path="/buyer" element={<PrivateRoute><Layout user={currentUser} handleLogout={logout}><Buyer /></Layout></PrivateRoute>} />
        <Route path="/properties" element={<Layout user={currentUser} handleLogout={logout}><Properties /></Layout>} />
        <Route path="/sellform" element={<PrivateRoute><Layout user={currentUser} handleLogout={logout}><SellProperty addProperty={addProperty} /></Layout></PrivateRoute>} />
        <Route path="/profile" element={<PrivateRoute><Layout user={currentUser} handleLogout={logout}><Profile /></Layout></PrivateRoute>} />
        <Route path="/buy" element={<PrivateRoute><Layout user={currentUser} handleLogout={logout}><Buy /></Layout></PrivateRoute>} />
        <Route path="*" element={<NoPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
