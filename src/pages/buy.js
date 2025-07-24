import React, { useMemo, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';

const Buy = () => {
  const [properties, setProperties] = useState([]);
  const [selected, setSelected] = useState([]);
  const [total, setTotal] = useState(0);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProperties = async () => {
      try {
        const response = await fetch('http://localhost:3000/properties');
        const data = await response.json();
        setProperties(data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching properties:', error);
        alert('Failed to load properties. Please try again later.');
      }
    };

    fetchProperties();

    const userData = JSON.parse(localStorage.getItem("user"));
    if (!userData) {
      navigate("/login");
    } else {
      setUser(userData);
    }
  }, [navigate]);

  const unsoldProperties = useMemo(() => {
    return properties.filter(prop => prop.status?.toLowerCase() !== 'sold');
  }, [properties]);

  const handleSelect = (property) => {
    const updatedSelected = selected.some(p => p.id === property.id)
      ? selected.filter(p => p.id !== property.id)
      : [...selected, property];

    setSelected(updatedSelected);

   const totalPrice = updatedSelected.reduce((sum, p) => {
      let priceValue = p.price;

      if (typeof priceValue === 'string') {
        priceValue = priceValue.replace(/[₹,]/g, '');
      }

      const numericPrice = parseFloat(priceValue) || 0;
      return sum + numericPrice;
    }, 0);

    setTotal(totalPrice);
  };

  const handleBuy = async () => {
    const buyer = JSON.parse(localStorage.getItem('user'));
    if (!buyer || buyer.role_id !== 3) {
      alert('Only buyers can make a purchase');
      return;
    }

    try {
      for (const prop of selected) {
        await fetch(`http://localhost:3000/properties/${prop.id}`, {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            status: 'Sold',
            buyerId: buyer.id,
            ownerId: prop.name || '',
          }),
        });
      }

      const oldTransactions = JSON.parse(localStorage.getItem('transactions')) || [];
      const newTransactions = selected.map(prop => ({
        buyerId: buyer.id,
        sellerId: prop.name,
        amount: prop.price,
        propertyId: prop.id,
        propertyTitle: prop.title,
        timestamp: Date.now(),
      }));

      localStorage.setItem('transactions', JSON.stringify([...oldTransactions, ...newTransactions]));

      alert('Purchase successful!');
      setSelected([]);
      setTotal(0);
      window.location.reload();
    } catch (error) {
      console.error('Error updating properties:', error);
      alert('Failed to complete purchase. Please try again.');
    }
  };

  if (loading) return <div className="text-center mt-5">Loading properties...</div>;

  return (
    <div className="container my-5">
      <h2 className="text-center mb-4 fw-bold">Available Properties for Purchase</h2>

      {unsoldProperties.length === 0 ? (
        <p className="text-center text-muted">No properties available for purchase.</p>
      ) : (
        <div className="row g-4 justify-content-center">
          {unsoldProperties.map((property) => (
            <div key={property.id} className="col-md-6 col-lg-4">
              <div className="card h-100 shadow-sm">
                <img
                  src={property.image}
                  alt={property.title}
                  className="card-img-top"
                  style={{ height: "200px", objectFit: "cover" }}
                />
                <div className="card-body d-flex flex-column justify-content-between">
                  <h5 className="card-title">{property.title}</h5>
                  <p className="card-text text-muted mb-1">Location: {property.location}</p>
                  <p className="card-text mb-1">Price: {property.price}</p>
                  <p className="card-text small text-muted">Owner: {property.name}</p>
                  <div className="form-check mt-2">
                    <input
                      type="checkbox"
                      className="form-check-input"
                      id={`select-${property.id}`}
                      checked={selected.some(p => p.id === property.id)}
                      onChange={() => handleSelect(property)}
                    />
                    <label className="form-check-label" htmlFor={`select-${property.id}`}>
                      Select to Buy
                    </label>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      <div className="text-center mt-5">
        <h4>Total Amount: <span className="text-success">₹{total.toLocaleString('en-IN')}</span></h4>
        <button
          onClick={handleBuy}
          disabled={selected.length === 0}
          className="btn btn-success btn-lg mt-3 px-5 rounded-pill"
        >
          Buy Now
        </button>
      </div>
    </div>
  );
};

export default Buy;
