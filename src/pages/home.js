// Home.jsx (Enhanced with 5 properties in a row)
import React, { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js'; 
import "../index.css";

import { Container, Row, Col, Navbar, Nav } from 'react-bootstrap';
import { FaTwitter, FaFacebookF, FaInstagram } from 'react-icons/fa';


const Home = () => {
  const navigate = useNavigate();
  const [properties, setProperties] = useState([]);

  const gotologin = () => navigate("/login");
  const gotosignin = () => navigate("/signup");
  const handlePropertyClick = (property) => navigate(`/details/${property.id}`);

  useEffect(() => {
    const fetchProperties = async () => {
      try {
        const response = await fetch("http://localhost:3000/properties");
        const data = await response.json();
        setProperties(data);
      } catch (error) {
        console.error("Error fetching properties:", error);
      }
    };
    fetchProperties();
  }, []);

  return (
    <div className="home-container">
      <nav className="navbar navbar-expand-lg sticky-top navbar-dark bg-dark shadow-sm px-4">
        <Link className="navbar-brand fw-bold d-flex align-items-center" to="/">
          <span className="me-2" role="img" aria-label="house">🏠</span>
          <span style={{ fontSize: "1.2rem", color: "#9fd3ff" }}>RealEstateIndia</span>
        </Link>
        <div className="collapse navbar-collapse justify-content-center">
          <ul className="navbar-nav">
            <li className="nav-item px-3"><a className="nav-link text-white" href="#home">Home</a></li>
            <li className="nav-item px-3"><a className="nav-link text-white" href="#buy">Buy</a></li>
            <li className="nav-item px-3"><a className="nav-link text-white" href="#sell">Sell</a></li>
            <li className="nav-item px-3"><a className="nav-link text-white" href="#contact">Contact</a></li>
          </ul>
        </div>
        <div className="d-flex gap-2">
          <button className="btn btn-primary rounded-pill" onClick={gotosignin}>Sign Up</button>
          <button className="btn btn-outline-light rounded-pill" onClick={gotologin}>Login</button>
        </div>
      </nav>

      <div className="position-relative">
        <img src="/banner.png" alt="Luxury Property" className="img-fluid w-100" style={{ maxHeight: "500px", objectFit: "cover",borderRadius: "12px" }} />
        <div className="position-absolute top-50 start-50 translate-middle text-center text-white">
          <h1 className="display-5 fw-bold">Find Your Dream Home</h1>
          <p className="lead ">Affordable • Trusted • Verified Listings</p>
        </div>
      </div>



      <section className="property-section container py-5">
        <h2 className="text-center fw-bold mb-4">Featured Properties</h2>
        <div className="d-flex flex-wrap justify-content-center gap-4">
          {properties.slice(0, 5).map((prop) => (
            <div
              key={prop.id}
              className="card shadow-sm"
              onClick={() => handlePropertyClick(prop)}
              style={{
                width: "18%",
                minWidth: "200px",
                cursor: "pointer"
              }}
            >
              <img src={prop.image} alt={prop.title} className="card-img-top" style={{ height: "180px", objectFit: "cover" }} />
              <div className="card-body">
                <h5 className="card-title">{prop.title}</h5>
                <p className="card-text text-muted">{prop.location}</p>
                <span className="badge bg-success">{prop.price}</span>
              </div>
            </div>
          ))}
        </div>
        <div className="text-center mt-4">
          <button className="btn btn-outline-primary rounded-pill px-4" onClick={() => navigate("/properties")}>View More Properties</button>
        </div>
      </section>


      <section id="buy" className="py-5 bg-light">
        <div className="container text-center">
          <h2 className="mb-4 text-danger">Looking to Buy a Property?</h2>
          <div className="position-relative d-inline-block">
            <img src="/buy-banner.png" alt="Buy property" className="img-fluid rounded-circle border border-3 border-primary" style={{ width: "320px", height: "320px", objectFit: "cover" }} />
            <div className="position-absolute top-50 translate-middle-y bg-white shadow rounded p-2" style={{ left: "-120px", width: "180px" }}>
              <small>3000+ Customers got their desired home through Our Platform</small>
            </div>
            <div className="position-absolute bottom-0 start-50 translate-middle-x" style={{ bottom: "-20px" }}>
              <button className="btn btn-primary px-4 py-2 rounded-pill shadow" onClick={() => {
                const user = JSON.parse(localStorage.getItem("user"));
                if (user) navigate("/buy");
                else {
                  alert("Please login to continue!");
                  navigate("/login");
                }
              }}>Buy Now</button>
            </div>
          </div>
        </div>
      </section>

     <section id="sell" className="py-5 bg-white">
  <div className="container text-center">
    <h2 className="mb-4 text-danger">Want to Sell Your Property?</h2>

    <div className="d-flex flex-column align-items-center">
      <img
        src="/sell-banner.png"
        alt="Sell Property"
        className="img-fluid mb-4"
        style={{
          maxWidth: "600px",
          borderRadius: "15px",
          width: "100%", 
        }}
      />

      <button
        className="btn btn-primary px-4 py-2 rounded-pill"
        onClick={() => {
          const user = JSON.parse(localStorage.getItem("user"));
          if (user) {
            navigate("/sellform");
          } else {
            alert("Please login to continue!");
            navigate("/login");
          }
        }}
      >
        Sell Property
      </button>
    </div>
  </div>
</section>

<section className="container py-5">
  <h3 className="text-center mb-4 fw-bold">Explore By Categories</h3>
  <div className="row text-center justify-content-center">
    <div className="col-6 col-md-4 col-lg-3 mb-4">
      <div className="d-flex flex-column align-items-center">
        <img
          src="/flat-icon.png"
          alt="Flats"
          style={{ width: "320px", height: "250px", objectFit: "cover", borderRadius: "10px" }}
        />
        <p className="mt-2 fw-bold">Flats</p>
      </div>
    </div>
    <div className="col-6 col-md-4 col-lg-3 mb-4">
      <div className="d-flex flex-column align-items-center">
        <img
          src="/villa-icon.png"
          alt="Villas"
          style={{ width: "320px", height: "250px", objectFit: "cover", borderRadius: "10px" }}
        />
        <p className="mt-2 fw-bold">Villas</p>
      </div>
    </div>
    <div className="col-6 col-md-4 col-lg-3 mb-4">
      <div className="d-flex flex-column align-items-center">
        <img
          src="/plot-icon.png"
          alt="Plots"
          style={{ width: "320px", height: "250px", objectFit: "cover", borderRadius: "10px" }}
        />
        <p className="mt-2 fw-bold">Plots</p>
      </div>
    </div>
  </div>
</section>

<section className="bg-light py-5">
  <div className="container py-5">
  <h3 className="text-center mb-4 fw-bold">What Our Clients Say</h3>
  <div className="row g-3">
    <div className="col-md-4">
      <div className="card shadow-sm p-3 h-100">
        <p>"Thanks to RealEstateIndia, I found my dream home within days. The process was smooth and stress-free!"</p>
        <h6 className="text-primary mt-3">- Ramesh Kumar</h6>
      </div>
    </div>
    <div className="col-md-4">
      <div className="card shadow-sm p-3 h-100">
        <p>"As a first-time buyer, I was nervous, but the platform helped me compare properties and get the best deal!"</p>
        <h6 className="text-primary mt-3">- Sneha Verma</h6>
      </div>
    </div>
    <div className="col-md-4">
      <div className="card shadow-sm p-3 h-100">
        <p>"I listed my apartment and got multiple responses in just 2 days. Highly recommend RealEstateIndia for sellers!"</p>
        <h6 className="text-primary mt-3">- Amit Singh</h6>
      </div>
    </div>
  </div>
</div>

</section>
<section className="bg-white py-5">
  <div className="container text-center">
    <h3 className="mb-4">Why Choose Us?</h3>
    <div className="row">
      <div className="col"><h1>10K+</h1><p>Properties Listed</p></div>
      <div className="col"><h1>5K+</h1><p>Satisfied Buyers</p></div>
      <div className="col"><h1>1K+</h1><p>Verified Agents</p></div>
    </div>
  </div>
</section>



      <section id="contact" className="py-5 bg-light">
        <div className="container text-center">
          <h3 className="fw-bold text-uppercase">Contact Us</h3>
          <p className="text-muted">Have questions or need assistance? Our team is here to help you find the perfect property. Reach out and we’ll get back to you as soon as possible.</p>
        </div>
      </section>

      <footer className="footer py-4 bg-white border-top">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-md-4 text-center text-md-start mb-2 mb-md-0">
              &copy; RealEstateIndia 2025
            </div>
            <div className="col-md-4 text-center">
              <a className="btn btn-dark btn-social mx-2" href="#"><i className="fab fa-twitter"></i></a>
              <a className="btn btn-dark btn-social mx-2" href="#"><i className="fab fa-facebook-f"></i></a>
              <a className="btn btn-dark btn-social mx-2" href="#"><i className="fab fa-linkedin-in"></i></a>
            </div>
            <div className="col-md-4 text-center text-md-end">
              <a className="text-muted me-3" href="#">Privacy Policy</a>
              <a className="text-muted" href="#">Terms of Use</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Home;





// <div style={{ backgroundColor: "#e6f0ff", padding: "100px 0", position: "relative" }}>
//       <Container>
//         <Row className="align-items-center">
//           {/* Left Side */}
//           <Col md={6} className="text-center text-md-start mb-4 mb-md-0">
//             <h6
//               className="text-uppercase"
//               style={{
//                 fontSize: "14px",
//                 fontWeight: "600",
//                 letterSpacing: "1px",
//                 color: "#1a2e4d"
//               }}
//             >
//               Time to meet your
//             </h6>
//             <h1
//               style={{
//                 fontSize: "64px",
//                 fontWeight: "900",
//                 lineHeight: "1.1",
//                 color: "#1a2e4d"
//               }}
//             >
//               NEW <br /> HOME
//             </h1>
//             <p
//               className="mt-4"
//               style={{
//                 maxWidth: "500px",
//                 fontSize: "16px",
//                 color: "#4a4a4a",
//                 lineHeight: "1.6"
//               }}
//             >
//               Finding the perfect place to call home can be hard. Our team of
//               creatives and specialists makes real estate easy.
//             </p>
//             <div className="d-flex gap-3 mt-3">
//               <FaTwitter size={22} />
//               <FaFacebookF size={22} />
//               <FaInstagram size={22} />
//             </div>
//           </Col>

//           {/* Right Side */}
//           <Col md={6} className="position-relative d-flex justify-content-center">
//             <div style={{ position: "relative" }}>
//               <img
//                 src="/banner.png" // Make sure this path is correct
//                 alt="Modern Home"
//                 style={{
//                   width: "450px",
//                   borderRadius: "20px",
//                   boxShadow: "0 20px 60px rgba(0, 0, 0, 0.1)",
//                   objectFit: "cover"
//                 }}
//               />
//               <div
//                 style={{
//                   position: "absolute",
//                   top: "-20px",
//                   right: "-20px",
//                   width: "40px",
//                   height: "40px",
//                   backgroundColor: "#111",
//                   borderRadius: "50%",
//                   boxShadow: "0px 0px 15px rgba(0,0,0,0.2)"
//                 }}
//               />
//             </div>
//           </Col>
//         </Row>
//       </Container>
//     </div>