import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

const Properties = () => {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));

  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [users, setUsers] = useState(null);
  const [selectedloc, setSelectedloc] = useState("All");
  const [status, setstatus] = useState("All");

  const [currentPage, setCurrentPage] = useState(1);
  const propertiesPerPage = 9;

  useEffect(() => {
    const fetchProperties = async () => {
      try {
        const response = await fetch("http://localhost:3000/properties");
        const data = await response.json();
        setProperties(data);
      } catch (error) {
        console.error("Error fetching properties:", error);
        alert("Failed to load properties. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchProperties();
  }, []);

  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem("user"));
    setUsers(userData);
  }, []);

  const uniqueCities = [...new Set(properties.map((p) => p.address?.city).filter(Boolean))];
  const uniqueStatuses = [...new Set(properties.map((p) => p.status).filter(Boolean))];

  const filteredProperties = properties.filter((prop) => {
    const matchesLocation = selectedloc === "All" || prop.address?.city === selectedloc;
    const matchesStatus = status === "All" || prop.status === status;
    return matchesLocation && matchesStatus;
  });

  const indexOfLastProperty = currentPage * propertiesPerPage;
  const indexOfFirstProperty = indexOfLastProperty - propertiesPerPage;
  const currentProperties = filteredProperties.slice(indexOfFirstProperty, indexOfLastProperty);
  const totalPages = Math.ceil(filteredProperties.length / propertiesPerPage);

  const handlePageChange = (pageNum) => {
    setCurrentPage(pageNum);
    window.scrollTo(0, 0); // Optional: scroll to top when page changes
  };

  const handlePropertyClick = (property) => {
    navigate(`/details/${property.id}`);
  };

  const handleAddToFavorites = (property, e) => {
    e.stopPropagation();
    const favorites = JSON.parse(localStorage.getItem("favorites")) || [];
    const alreadyExists = favorites.find((fav) => fav.id === property.id);

    if (alreadyExists) {
      alert("Property already in favorites!");
      return;
    }

    favorites.push(property);
    localStorage.setItem("favorites", JSON.stringify(favorites));
    alert("Added to favorites!");
  };

  if (loading) {
    return <div className="text-center mt-5">Loading properties...</div>;
  }

  return (
    <section className="property-section container my-5">
      <h2 className="text-center mb-4">Featured Properties</h2>

      {/* Filters */}
      <div
        className="d-flex justify-content-between align-items-start p-4 mb-4 bg-light border rounded shadow-sm"
        style={{ gap: "2rem", flexWrap: "wrap" }}
      >
        <div className="d-flex flex-column">
          <label className="form-label fw-semibold text-primary mb-2">Location</label>
          <select
            className="form-select"
            value={selectedloc}
            onChange={(e) => {
              setSelectedloc(e.target.value);
              setCurrentPage(1); // Reset to page 1 on filter change
            }}
            style={{ minWidth: "200px" }}
          >
            <option value="All">All</option>
            {uniqueCities.map((city, idx) => (
              <option key={idx} value={city}>{city}</option>
            ))}
          </select>
        </div>

        <div className="d-flex flex-column">
          <label className="form-label fw-semibold text-primary mb-2">Status</label>
          <select
            className="form-select"
            value={status}
            onChange={(e) => {
              setstatus(e.target.value);
              setCurrentPage(1); // Reset to page 1 on filter change
            }}
            style={{ minWidth: "200px" }}
          >
            <option value="All">All</option>
            {uniqueStatuses.map((stat, idx) => (
              <option key={idx} value={stat}>{stat}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Properties */}
      <div className="row g-4 justify-content-center">
        {currentProperties.map((prop) => (
          <div
            key={prop.id}
            className="col-md-4"
            onClick={() => handlePropertyClick(prop)}
            style={{ cursor: "pointer" }}
          >
            <div className="card shadow-sm h-100">
              <img
                src={prop.image}
                alt={prop.title}
                className="card-img-top"
                style={{ height: "200px", objectFit: "cover" }}
              />
              <div className="card-body text-center">
                <h5 className="card-title">{prop.title}</h5>
                <p className="card-text text-muted">{prop.address?.city}</p>
                <p className="card-text">
                  <strong>Owned by:</strong> {prop.name}
                </p>
                <span className="badge bg-success fs-6 mb-3">{prop.price}</span>

                {user?.role_id === 3 && (
                  <button
                    className="btn btn-outline-danger rounded-pill px-3"
                    onClick={(e) => handleAddToFavorites(prop, e)}
                  >
                    Add to Favorite
                  </button>
                )}
              </div>
            </div>
          </div>
        ))}

        {currentProperties.length === 0 && (
          <div className="text-center mt-5">
            <h5>No properties match your filters.</h5>
          </div>
        )}
      </div>

      {totalPages > 1 && (
  <div className="d-flex justify-content-center mt-4">
    <nav>
      <ul className="pagination">

        
        <li className={`page-item ${currentPage === 1 ? "disabled" : ""}`}>
          <button
            className="page-link"

            onClick={() => handlePageChange(currentPage - 1)}
            
            disabled={currentPage === 1}
          >
            Previous
          </button>
        </li>

        {/* Page Numbers */}
        {Array.from({ length: totalPages }, ( _,idx) => (
          <li
            key={idx}
            className={`page-item ${currentPage === idx + 1 ? "active" : ""}`}
          >
            <button
              className="page-link"
              onClick={() => handlePageChange(idx + 1)}
            >
              {idx + 1}
            </button>
          </li>
        ))}

        
        <li className={`page-item ${currentPage === totalPages ? "disabled" : ""}`}>
          <button
            className="page-link"
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
          >
            Next
          </button>
        </li>

      </ul>
    </nav>
  </div>
)}

    </section>
  );
};

export default Properties;
