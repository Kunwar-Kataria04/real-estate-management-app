import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import PanoViewer from '../component/PanoViewer'; 

const Details = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [property, setProperty] = useState(null);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchProperty = async () => {
      try {
        const response = await fetch(`http://localhost:3000/properties/${id}`);
        const data = await response.json();
        setProperty(data);
      } catch (error) {
        console.error("Error fetching property:", error);
        setProperty(null);
      } finally {
        setLoading(false);
      }
    };

    fetchProperty();
  }, [id]);

  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem("user"));
    if (!userData) {
      navigate("/login");
    } else {
      setUser(userData);
    }
  }, [navigate]);

  if (loading) return <div className="text-center mt-5">Loading property details...</div>;
  if (!property || !property.id) return <div className="container py-5 text-center">Property not found.</div>;

  const handleEnquiry = () => {
    navigate("/contact-agent", {
      state: {
        name: property.name,
        email: property.email,
        mobile: property.mobile,
        title: property.title
      },
    });
  };

const fullAddress = property.address
  ? `${property.address.city || 'Unknown'}, ${property.address.country || 'Unknown'}`
  : 'Location not specified';

  return (
    <div className="container py-5">
      <div className="card border-0 shadow-lg rounded-4 overflow-hidden">
        <div className="row g-0">
          <div className="col-md-6 bg-dark">
            <img
              src={property.image}
              className="img-fluid h-100 w-100 object-fit-cover"
              alt={property.title}
              style={{ objectFit: 'cover', filter: 'brightness(90%)', transition: '0.3s ease' }}
              onMouseOver={(e) => (e.currentTarget.style.filter = 'brightness(100%)')}
              onMouseOut={(e) => (e.currentTarget.style.filter = 'brightness(90%)')}
            />
          </div>
          <div className="col-md-6 bg-white p-4 d-flex flex-column justify-content-between">
            <div>
              <h2 className="fw-bold mb-3">{property.title}</h2>
              <p className="text-muted mb-2">
                <i className="bi bi-geo-alt-fill me-2"></i>{property.location}
              </p>
              <p className="fs-5 text-success mb-4"><strong>{property.price}</strong></p>

              <div className="mb-3">
                <span className={`badge rounded-pill px-3 py-2 ${property.status === 'Available' ? 'bg-success' : 'bg-secondary'}`}>
                  {property.status}
                </span>
              </div>

              <ul className="list-unstyled">
                <li><strong>Type:</strong> {property.propertyType}</li>
                <li><strong>Area:</strong> {property.area}</li>
                <li><strong>Possession Date:</strong> {property.possessionDate}</li>
                <li><strong>Name:</strong> {property.name}</li>
                <li><strong>Email:</strong> <a href={`mailto:${property.email}`}>{property.email}</a></li>
                <li><strong>Mobile:</strong> <a href={`tel:${property.mobile}`}>{property.mobile}</a></li>
              </ul>

              <div className="mt-4">
                <h6 className="fw-semibold">Additional Notes:</h6>
                <p className="text-muted">{property.notes}</p>
              </div>
            </div>

            <div className="mt-4">
              <h5 className="fw-bold mb-3">Location Map</h5>
              <div className="ratio ratio-16x9">
                <iframe
                  title="Property Location"
                  src={`https://www.google.com/maps?q=${encodeURIComponent(fullAddress)}&output=embed`}
                  style={{ border: 0 }}
                  allowFullScreen=""
                  loading="lazy"
                ></iframe>
              </div>
            </div>

            {property.panoimage && (
  <div className="mt-4">
    <h5 className="fw-bold mb-3">360° Virtual Tour</h5>
    <PanoViewer src={property.panoimage} />
  </div>
)}

            <div className="text-center mt-4">
              <button className="btn btn-primary btn-lg px-4 rounded-pill" onClick={handleEnquiry}>
                Enquire Now
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Details;
