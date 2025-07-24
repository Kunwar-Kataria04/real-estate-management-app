import React, { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";
import axios from "axios";

const SoldProperties = () => {
  const [properties, setProperties] = useState([]);
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

  useEffect(() => {
    const fetchProperties = async () => {
      try {
        const response = await axios.get("http://localhost:3000/properties");
        setProperties(response.data);
      } catch (error) {
        console.error("Error fetching properties:", error);
      }
    };

    fetchProperties();
  }, []);

  const sold = properties.filter(
    (prop) => prop.status.toLowerCase() === "sold"
  );

  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate("/home");
  };

  return (
    <div className="container py-4">
      <h2 className="mb-4 text-center">🏠 Sold Properties</h2>

      {sold.length === 0 ? (
        <p className="text-center text-muted">No properties have been sold yet.</p>
      ) : (
        <div className="row g-4">
          {sold.map((prop) => (
            <div className="col-md-4" key={prop.id}>
              <div className="card shadow-sm h-100">
                <img
                  src={prop.image}
                  className="card-img-top"
                  alt={prop.title}
                  style={{ height: "200px", objectFit: "cover" }}
                />
                <div className="card-body">
                  <h5 className="card-title">{prop.title}</h5>
                  <p className="card-text text-muted">{prop.location}</p>
                  <p className="card-text text-success fw-semibold">{prop.price}</p>
                  <span className="badge bg-secondary">Sold</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default SoldProperties;
