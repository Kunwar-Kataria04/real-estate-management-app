import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';

const TransactionRecords = () => {
  const [transactions, setTransactions] = useState([]);
  const [users, setUsers] = useState([]);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem("user"));
    if (!userData) {
      navigate("/login");
    } else {
      setUser(userData);
      fetchUsers(); // fetch only user list from backend
      fetchTransactions(); // fetch transaction data from localStorage
    }
  }, [navigate]);

  const fetchUsers = async () => {
    try {
      const res = await axios.get("http://localhost:3000/users");
      setUsers(res.data || []);
    } catch (err) {
      console.error("Error fetching user data:", err);
    }
  };

  const fetchTransactions = () => {
    const localTx = JSON.parse(localStorage.getItem("transactions")) || [];
    setTransactions(localTx);
    setLoading(false);
  };

  const getUser = (id) => users.find(u => u.id?.toString() === id?.toString());

  const getInitials = (name) => {
    const names = name?.split(" ") || [];
    return (names[0]?.charAt(0) || "") + (names[1]?.charAt(0) || "");
  };

  const formatAmount = (amt) =>
    new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR' }).format(amt);

  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate("/home");
  };

  return (
    <div className="container py-5">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2 className="text-primary fw-bold">📋 Transaction Records</h2>
        
      </div>

      {loading ? (
        <p className="text-center text-muted">Loading records...</p>
      ) : transactions.length === 0 ? (
        <p className="text-center text-muted">No transactions found.</p>
      ) : (
        <div className="row justify-content-center g-4">
          {transactions.map((tx, idx) => {
            const buyer = getUser(tx.buyerId);
            const seller = getUser(tx.sellerId);
            const buyerName = buyer ? `${buyer.first_name} ${buyer.last_name}` : "Unknown";
            const sellerName = seller ? `${seller.first_name} ${seller.last_name}` : tx.sellerEmail || "Unknown";
            const buyerInitials = buyer ? getInitials(buyerName) : "??";

            return (
              <div key={idx} className="col-md-6 col-lg-5">
                <div className="tx-card d-flex p-3 rounded-4 shadow-sm align-items-center bg-dark text-white">
                  <div className="tx-avatar me-3 d-flex align-items-center justify-content-center bg-secondary rounded-circle" style={{ width: 50, height: 50 }}>
                    <span className="tx-initials fw-bold text-white">{buyerInitials}</span>
                  </div>

                  <div>
                    <h6 className="fw-bold mb-1">{tx.propertyTitle || "Unnamed Property"}</h6>
                    <p className="mb-1 text-warning small">Buyer: {buyer?.email || "N/A"}</p>
                    <p className="mb-1 small">Seller: <span className="text-light">{sellerName}</span></p>
                    <p className="mb-1 small">Amount: <span className="text-success">{formatAmount(tx.amount)}</span></p>
                    {tx.date && (
                      <p className="mb-0 small text-muted">
                        Date: {new Date(tx.date).toLocaleDateString()}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default TransactionRecords;
