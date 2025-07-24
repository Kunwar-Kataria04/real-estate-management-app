import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../index.css";


const Agent = () => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();
 const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [status, setStatus] = useState('');

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('Submitting…');

    try {
      const res = await fetch('https://api.yourdomain.com/sell', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        setStatus('Thank you! We’ll be in touch.');
        setFormData({ name: '', email: '', message: '' });
      } else {
        setStatus('Something went wrong. Please try again.');
      }
    } catch (err) {
      console.error(err);
      setStatus('Server error. Try again later.');
    }
  };

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
      
      <h1 className="mb-4 text-center">
        Welcome to RealEstateIndia{user ? `, ${user.firstName} ${user.lastName}` : ""}!
      </h1>

      <div className="container my-5">
        <div className="row g-4 justify-content-center">

          <div className="col-md-5">
            <div className="agent-card d-flex p-3 rounded-4 shadow-sm align-items-center">
              <div className="agent-avatar me-3">
                <img src="/req.jpg" alt="Requests" className="img-fluid rounded-circle" style={{ width: "60px", height: "60px", objectFit: "cover" }} />
              </div>
              <div className="text-light">
                <h5 className="mb-1 text-white fw-bold">Buyer Requests</h5>
                <p className="mb-2 text-warning small">View property requests submitted by buyers.</p>
                <button className="btn btn-primary btn-sm rounded-pill" onClick={() => navigate("/buyerReq")}>
                  View Requests
                </button>
              </div>
            </div>
          </div>

          <div className="col-md-5">
            <div className="agent-card d-flex p-3 rounded-4 shadow-sm align-items-center">
              <div className="agent-avatar me-3">
                <img src="/sold.jpg" alt="Sold" className="img-fluid rounded-circle" style={{ width: "60px", height: "60px", objectFit: "cover" }} />
              </div>
              <div className="text-light">
                <h5 className="mb-1 text-white fw-bold">Sold Properties</h5>
                <p className="mb-2 text-warning small">Check the properties you've successfully sold.</p>
                <button className="btn btn-success btn-sm rounded-pill" onClick={() => navigate("/soldprop")}>
                  View Sold
                </button>
              </div>
            </div>
          </div>

        </div>

<div>
      {/* Hero Section */}
   <section
  className="text-white text-center d-flex align-items-center"
  style={{
    backgroundImage: 'url(https://source.unsplash.com/1600x600/?luxury,house)',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    minHeight: '400px',
  }}
>
  <div className="container bg-dark bg-opacity-50 p-5 rounded">
    <h1 className="display-4 fw-bold">Sell With Us</h1>
    <p className="lead">Leverage global prestige and an exclusive international client base.</p>
  </div>
</section>



      {/* Why Choose Us */}
      <section className="py-5 bg-white">
        <div className="container text-center">
          <h2 className="mb-4">Why Choose Us?</h2>
          <div className="row">
            {[
              {
                title: 'Global Exposure',
                desc: 'Our network spans 70+ countries and 1,100+ offices.',
              },
              {
                title: 'Expert Insights',
                desc: 'Local agents backed by global research and marketing teams.',
              },
              {
                title: 'Premium Branding',
                desc: 'Luxury positioning that attracts high-net-worth buyers.',
              },
            ].map((item, idx) => (
              <div className="col-md-4 mb-4" key={idx}>
                <div className="card h-100 shadow-sm">
                  <div className="card-body">
                    <h5 className="card-title">{item.title}</h5>
                    <p className="card-text">{item.desc}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      
    </div>


        
      </div>
    </div>
  );
};

export default Agent;
