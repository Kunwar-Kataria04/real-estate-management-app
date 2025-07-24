import React from "react";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { Link } from "react-router-dom";


const Signup = () => {
  const navigate = useNavigate();

  const gotologin = () => {
    navigate("/login");
  };

  const formik = useFormik({
    initialValues: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      role: "",
      contact: "",
      street: "",
      city: "",
      pin: "",
      state: "",
      country: "",
    },
    validationSchema: Yup.object({
      firstName: Yup.string().required("First name is required"),
      email: Yup.string().email("Invalid email").required("Email is required"),
      password: Yup.string().required("Password is required"),
      role: Yup.string()
        .oneOf(["buyer", "seller"], "Please select a role")
        .required("Role is required"),
      contact: Yup.string().required("Contact is required"),
      street: Yup.string().required("Street is required"),
      city: Yup.string().required("City is required"),
      pin: Yup.string().required("PIN is required"),
      state: Yup.string().required("State is required"),
      country: Yup.string().required("Country is required"),
    }),
    onSubmit: async (values) => {
      try {
        const response = await axios.get("http://localhost:3000/users");
        const currentUsers = response.data;
        const nextId = currentUsers.length
          ? String(Number(currentUsers[currentUsers.length - 1].id) + 1)
          : "1";

        const role_id = values.role === "buyer" ? 3 : 2;

        const newUser = {
          id: nextId,
          email: values.email,
          first_name: values.firstName,
          last_name: values.lastName,
          contact: values.contact,
          address: {
            street: values.street,
            city: values.city,
            pin: values.pin,
            state: values.state,
            country: values.country,
          },
          role_id,
          password: values.password,
        };

        await axios.post("http://localhost:3000/users", newUser);
        toast.success("Signup successful!");
        setTimeout(() => {
          navigate("/login");
        }, 1500);
      } catch (error) {
        console.error(error);
        toast.error("Error creating user");
      }
    },
  });

  return (
    <div className="signup-container">
      <form onSubmit={formik.handleSubmit}>
        <h2>Signup Form</h2>

        <label htmlFor="firstName">First Name</label>
        <input
          id="firstName"
          name="firstName"
          type="text"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.firstName}
        />
        {formik.touched.firstName && formik.errors.firstName && (
          <div style={{ color: "red" }}>{formik.errors.firstName}</div>
        )}

        <label htmlFor="lastName">Last Name</label>
        <input
          id="lastName"
          name="lastName"
          type="text"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.lastName}
        />

        <label htmlFor="email">Email</label>
        <input
          id="email"
          name="email"
          type="email"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.email}
        />
        {formik.touched.email && formik.errors.email && (
          <div style={{ color: "red" }}>{formik.errors.email}</div>
        )}

        <label htmlFor="password">Password</label>
        <input
          id="password"
          name="password"
          type="password"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.password}
        />
        {formik.touched.password && formik.errors.password && (
          <div style={{ color: "red" }}>{formik.errors.password}</div>
        )}

        <label>Role</label>
        <div className="radio-group">
          <label>
            <input
              type="radio"
              name="role"
              value="buyer"
              checked={formik.values.role === "buyer"}
              onChange={formik.handleChange}
            />
            Buyer
          </label>
          <label>
            <input
              type="radio"
              name="role"
              value="seller"
              checked={formik.values.role === "seller"}
              onChange={formik.handleChange}
            />
            Seller
          </label>
        </div>
        {formik.touched.role && formik.errors.role && (
          <div className="error">{formik.errors.role}</div>
        )}

        <label htmlFor="contact">Contact Number</label>
        <input
          id="contact"
          name="contact"
          type="text"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.contact}
        />
        {formik.touched.contact && formik.errors.contact && (
          <div style={{ color: "red" }}>{formik.errors.contact}</div>
        )}

        <h4>Address</h4>

        <label htmlFor="street">Street</label>
        <input
          id="street"
          name="street"
          type="text"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.street}
        />
        {formik.touched.street && formik.errors.street && (
          <div style={{ color: "red" }}>{formik.errors.street}</div>
        )}

        <label htmlFor="city">City</label>
        <input
          id="city"
          name="city"
          type="text"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.city}
        />
        {formik.touched.city && formik.errors.city && (
          <div style={{ color: "red" }}>{formik.errors.city}</div>
        )}

        <label htmlFor="pin">PIN</label>
        <input
          id="pin"
          name="pin"
          type="text"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.pin}
        />
        {formik.touched.pin && formik.errors.pin && (
          <div style={{ color: "red" }}>{formik.errors.pin}</div>
        )}

        <label htmlFor="state">State</label>
        <input
          id="state"
          name="state"
          type="text"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.state}
        />
        {formik.touched.state && formik.errors.state && (
          <div style={{ color: "red" }}>{formik.errors.state}</div>
        )}

        <label htmlFor="country">Country</label>
        <input
          id="country"
          name="country"
          type="text"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.country}
        />
        {formik.touched.country && formik.errors.country && (
          <div style={{ color: "red" }}>{formik.errors.country}</div>
        )}

       <div style={{ display: "flex", justifyContent: "center", marginTop: "1rem" }}>
  <button type="submit" style={{ padding: "0.5rem 1.5rem", fontWeight: "bold", backgroundColor: "#4285f4", color: "#fff", border: "none", borderRadius: "8px" }}>
    Signup
  </button>
</div>

<div style={{ textAlign: "center", marginTop: "0.8rem" }}>
  <p style={{ display: "inline", marginRight: "5px" }}>Already have an account?</p>
  <Link to="/login" style={{ textDecoration: "none", color: "#4285f4", fontWeight: "bold" }}>
    Login
  </Link>
</div>
<div style={{ textAlign: "center", marginTop: "0.8rem" }}>
  <Link to="/" style={{ textDecoration: "none", color: "gray", fontSize: "14px" }}>
    ← Back to Home
  </Link>
</div>
   <ToastContainer />
      </form>
    </div>
  );
};

export default Signup;
