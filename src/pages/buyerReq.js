import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
const BuyerRequests = () => {
  const [requests, setRequests] = useState([]);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user")); // current logged-in seller
    const allMessages = JSON.parse(localStorage.getItem("messages")) || [];

    if (user) {
      const myMessages = allMessages.filter(msg => msg.receiverId === user.id);
      setRequests(myMessages);
    }
  }, []);
const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem("user"));
    if (!userData) {
      navigate("/login");
    } else {
      setUser(userData);
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate("/home");
  };

  return (
    
    <div>
      
    <div className="container py-4">
      <h2 className="mb-4 text-center">📩 Buyer Requests</h2>

      {requests.length === 0 ? (
        <p className="text-center text-muted">No requests received yet.</p>
      ) : (
        <div className="row g-4">
          {requests.map((req) => (
            <div className="col-md-6 col-lg-4" key={req.id}>
              <div className="card shadow-sm h-100">
                <div className="card-body">
                  <h5 className="card-title">{req.senderName}</h5>
                  
                  <p><strong>Email:</strong> {req.senderEmail}</p>
                  <p><strong>Message:</strong> {req.message}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
    </div>
  );
};

export default BuyerRequests;
