import React from "react";
import { Link, useNavigate } from "react-router-dom";

const Navbar = ({ user, handleLogout }) => {
   
const navigate=useNavigate();
const Path = user?.role_id === 1 ? "/admin" :
                        user?.role_id === 2 ? "/agent" :
                        user?.role_id === 3 ? "/buyer" : "/dasboard";

                        const sellprop=()=>{
                          navigate('/sellForm');
                        }
  return (
    <nav className="navbar navbar-expand-lg" style={{ backgroundColor: "#eaf4fc" }}>
      <div className="container-fluid px-4">
        <a className="navbar-brand fw-bold d-flex align-items-center" href="#">
          <img src="/logo.png" alt="Logo" width="30" className="me-2" />
          <span style={{ fontSize: "1.2rem", color: "#084298" }}>
            RealEstateIndia
          </span>
        </a>

        <div className="collapse navbar-collapse justify-content-center">
          <ul className="navbar-nav mb-2 mb-lg-0">
            {[
              {label:"Home",path:Path},
              { label: "Buy", path: "/buy" },
              { label: "Sell", path: "/sellForm" },
              { label: "Properties", path: "/properties" },
              { label: "Profile", path: "/profile" },
            ].map((item, index) => (
              <li key={index} className="nav-item px-3">
                <Link className="nav-link text-dark fw-semibold" to={item.path}>
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div className="d-flex align-items-center gap-3">
          <button className="btn btn-outline-primary rounded-pill px-3" onClick={sellprop}>
            Post Property
          </button>
          {user && (
            <button className="btn btn-danger rounded-pill px-3" onClick={handleLogout}>
              Logout
            </button>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
