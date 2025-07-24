// import React, { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";
// import 'bootstrap/dist/css/bootstrap.min.css';
// import 'bootstrap/dist/js/bootstrap.bundle.min.js';
// import { Link } from "react-router-dom";

// const Admin = () => {
//   const [user, setUser] = useState(null);
//   const navigate = useNavigate();

//   useEffect(() => {
//     const userData = JSON.parse(localStorage.getItem("user"));
//     if (!userData) {
//       navigate("/login");
//     } else {
//       setUser(userData);
//     }
//   }, [navigate]);

//   const handleLogout = () => {
//    localStorage.removeItem("user");

//     navigate("/home");
//   };

//   return (
//     <>
//       {/* Full-Width Bootstrap Navbar */}
//       <nav className="navbar navbar-expand-lg" style={{ backgroundColor: "#eaf4fc" }}>
//   <div className="container-fluid px-4">
//     {/* Brand */}
//     <a className="navbar-brand fw-bold d-flex align-items-center" href="#">
//       <img src="/logo.png" alt="Logo" width="30" className="me-2" />
//       <span style={{ fontSize: "1.2rem", color: "#084298" }}>RealEstateIndia</span>
//     </a>

//     {/* Navigation Links */}

// <div className="collapse navbar-collapse justify-content-center">
//   <ul className="navbar-nav mb-2 mb-lg-0">
//     {[
//       { label: "Buy", path: "/buy" },
//       { label: "Sell", path: "/sell" },
//            { label: "Properties", path: "/properties" },
//       { label: "Profile", path: "/profile" }
//     ].map((item, index) => (
//       <li key={index} className="nav-item px-3">
//         <Link
//           className="nav-link text-dark fw-semibold"
//           to={item.path}
//           style={{ transition: "color 0.2s" }}
//         >
//           {item.label}
//         </Link>
//       </li>
//     ))}
//   </ul>
// </div>


//     {/* Right Buttons */}
//     <div className="d-flex align-items-center gap-3">
//       <button className="btn btn-outline-primary rounded-pill px-3">Post Property</button>
//       {user && (
//         <button className="btn btn-danger rounded-pill px-3" onClick={handleLogout}>
//           Logout
//         </button>
//       )}
//     </div>
//   </div>
// </nav>


//       {/* Full-Width Admin Content */}
//       <div className="container-fluid min-vh-100 py-5 bg-light">
//         <div className="text-center">
//           <h1 className="mb-3">
//             Welcome to RealEstateIndia{user ? `, ${user.firstName} ${user.lastName}` : ""}!
//           </h1>
//           <h4 className="text-muted mb-5">
//             Manage your users and transactions with ease.
//           </h4>
//         </div>

//        <div className="row justify-content-center">
//   {/* User Management Card */}
//   <div className="col-md-4 mb-4">
//     <div className="card h-100 border-0 shadow-sm text-center">
//       <div className="overflow-hidden">
//         <img
//           src="/userM.png"
//           className="img-fluid rounded-top"
//           alt="User Management"
//           style={{
//             transition: "transform 0.4s",
//             height: "220px",
//             width: "100%",
//             objectFit: "cover",
//           }}
//           onMouseOver={(e) => (e.currentTarget.style.transform = "scale(1.05)")}
//           onMouseOut={(e) => (e.currentTarget.style.transform = "scale(1)")}
//         />
//       </div>
//       <div className="card-body">
//         <h5 className="card-title mb-3">👥 User Management</h5>
//         <button
//           className="btn btn-primary rounded-pill px-4"
//           onClick={() => navigate("/adminusers")}
//         >
//           Manage Users
//         </button>
//       </div>
//     </div>
//   </div>

//   {/* Transaction Records Card */}
//   <div className="col-md-4 mb-4">
//     <div className="card h-100 border-0 shadow-sm text-center">
//       <div className="overflow-hidden">
//         <img
//           src="/transaction.png"
//           className="img-fluid rounded-top"
//           alt="Transaction Records"
//           style={{
//             transition: "transform 0.4s",
//             height: "220px",
//             width: "100%",
//             objectFit: "cover",
//           }}
//           onMouseOver={(e) => (e.currentTarget.style.transform = "scale(1.05)")}
//           onMouseOut={(e) => (e.currentTarget.style.transform = "scale(1)")}
//         />
//       </div>
//       <div className="card-body">
//         <h5 className="card-title mb-3">📊 Transaction Records</h5>
//         <button
//           className="btn btn-success rounded-pill px-4"
//           onClick={() => navigate("/tranRecord")}
//         >
//           View Transactions
//         </button>
//       </div>
//     </div>
//   </div>
// </div>

//       </div>
//     </>
//   );
// };

// export default Admin;
import React, { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import Navbar from "../component/navbar";
const Admin = () => {
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
    <>
      {/* <nav className="navbar navbar-expand-lg" style={{ backgroundColor: "#eaf4fc" }}>
        <div className="container-fluid px-4">
          <a className="navbar-brand fw-bold d-flex align-items-center" href="#">
            <img src="/logo.png" alt="Logo" width="30" className="me-2" />
            <span style={{ fontSize: "1.2rem", color: "#084298" }}>RealEstateIndia</span>
          </a>

          <div className="collapse navbar-collapse justify-content-center">
            <ul className="navbar-nav mb-2 mb-lg-0">
              {[
                { label: "Buy", path: "/buy" },
                { label: "Sell", path: "/sellForm" },
                { label: "Properties", path: "/properties" },
                { label: "Profile", path: "/profile" }
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
            <button className="btn btn-outline-primary rounded-pill px-3">Post Property</button>
            {user && (
              <button className="btn btn-danger rounded-pill px-3" onClick={handleLogout}>
                Logout
              </button>
            )}
          </div>
        </div>
      </nav> */}

      <div className="container-fluid min-vh-100 py-5 bg-light">
        <div className="text-center mb-5">
          <h1 className="mb-3">
            Welcome to RealEstateIndia{user ? `, ${user.firstName} ${user.lastName}` : ""}!
          </h1>
          <h4 className="text-muted mb-4">
            Manage your users and transactions with ease.
          </h4>
          <h2 className="fw-bold">🛠️ Admin Dashboard Tools</h2>
          <p className="text-muted">Quick access to manage users and view transactions.</p>
        </div>

        <div className="row justify-content-center">
          <div className="col-md-4 mb-4">
            <div className="card h-100 border-0 shadow-sm rounded-4 overflow-hidden">
              <img
                src="/userM.png"
                className="img-fluid rounded-top"
                alt="User Management"
                style={{
                  height: "220px",
                  width: "100%",
                  objectFit: "cover",
                  transition: "transform 0.4s ease",
                }}
                onMouseOver={(e) => (e.currentTarget.style.transform = "scale(1.05)")}
                onMouseOut={(e) => (e.currentTarget.style.transform = "scale(1)")}
              />
              <div className="card-body d-flex flex-column gap-2">
                <h5 className="card-title fw-semibold">👥 User Management</h5>
                <p className="text-muted small">Add, remove, or update user information with ease.</p>
                <div className="mt-3">
                  <button
                    className="btn btn-primary rounded-pill px-4"
                    onClick={() => navigate("/adminusers")}
                  >
                    Manage Users
                  </button>
                </div>
              </div>
            </div>
          </div>

          <div className="col-md-4 mb-4">
            <div className="card h-100 border-0 shadow-sm rounded-4 overflow-hidden">
              <img
                src="/transaction.png"
                className="img-fluid rounded-top"
                alt="Transaction Records"
                style={{
                  height: "220px",
                  width: "100%",
                  objectFit: "cover",
                  transition: "transform 0.4s ease",
                }}
                onMouseOver={(e) => (e.currentTarget.style.transform = "scale(1.05)")}
                onMouseOut={(e) => (e.currentTarget.style.transform = "scale(1)")}
              />
              <div className="card-body d-flex flex-column gap-2">
                <h5 className="card-title fw-semibold">📊 Transaction Records</h5>
                <p className="text-muted small">Review sold and bought property history with amounts.</p>
                <div className="mt-3">
                  <button
                    className="btn btn-success rounded-pill px-4"
                    onClick={() => navigate("/tranRecord")}
                  >
                    View Transactions
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Admin;
