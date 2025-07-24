import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
const Favorites = () => {
  const [favoriteProps, setFavoriteProps] = useState([]);
const [user, setUser] = useState(null);
const navigate=useNavigate();
  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("favorites")) || [];
    setFavoriteProps(saved);
  }, []);
const handleLogout = () => {

   localStorage.removeItem("user");
    navigate("/home");
  };

  const contactagent=()=>{
    navigate("/contact-agent")
  }

  return (
    <>
   

    <div className="container py-4">
      <h2 className="mb-4 text-center"> Your Favorite Properties</h2>

      {favoriteProps.length === 0 ? (
        <p className="text-center text-muted">No properties added to favorites yet.</p>
      ) : (
        <div className="row g-4">
          {favoriteProps.map((prop) => (
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
                  <p className="text-muted">{prop.location}</p>
                  <p className="text-success fw-bold">{prop.price}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
    </>
  );
};

export default Favorites;



