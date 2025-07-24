import React from 'react'
import  { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

import { useNavigate } from "react-router-dom";
import '../index.css';
const Buyer =(props) => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchRole = async () => {
      try {
        const userData = JSON.parse(localStorage.getItem("user"));
        if (!userData) {
          navigate("/login");
          return;
        }

        setUser(userData);
        
      } catch (error) {
        console.error("Error fetching role:", error);
      }
    };

    fetchRole();
  }, [navigate]);
  const handleLogout = () => {

   localStorage.removeItem("user");

    navigate("/home");
  };
  const contactagent=()=>{

    navigate("/contact-agent")
  }
  return (
    
    <div>
      

<h1 className="mb-4 text-center">
  Welcome to RealEstateIndia{user ? `, ${user.firstName} ${user.lastName}` : ""}!
</h1>

<div className="container text-center my-5">
  <div className="row justify-content-center g-4">
    <div className="col-md-5">
      <div className="card shadow-lg border-0 h-100">
        <img
          src="/agentreq.png"
          className="card-img-top"
          alt="Contact Agent"
          style={{height: "250px", objectFit: "cover"}}
        />
        <div className="card-body">
          <h5 className="card-title">Send a Request to Agents</h5>
          <p className="card-text">Get in touch with verified real estate agents for property inquiries.</p>
          <button
            className="btn btn-outline-primary rounded-pill px-4"
            onClick={contactagent}
          >
            Contact Agent
          </button>
        </div>
      </div>
    </div>

    
  </div>
</div>

    </div>
  )
}


export default Buyer
