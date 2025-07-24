import React from "react";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import "../login.css";
import "../index.css";
import { Link } from "react-router-dom";



const Login = () => {
  const navigate = useNavigate();

  const gotosignup = () => {
    navigate("/signup");
  };

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },

    validationSchema: Yup.object({
      email: Yup.string()
        .email("Invalid email address")
        .required("Email is required"),
      password: Yup.string().required("Password is required"),
    }),

    onSubmit: async (values) => {
      try {
        const response = await axios.get(
          `http://localhost:3000/users?email=${values.email}&password=${values.password}`
        );

        const users = response.data;

        if (users && users.length > 0) {
          const user = users[0];
          toast.success("Login successful!");
          const userData = {
            id: user.id,
            role_id: user.role_id,
            firstName: user.first_name,
            lastName: user.last_name,
            email: user.email,
          };

          localStorage.setItem("user", JSON.stringify(userData));
          setTimeout(() => {
            navigate("/dashboard", { state: { user } });
          }, 1500);
        } else {
          toast.error("Invalid email or password");
        }
      } catch (error) {
        console.error(error);
        toast.error("Error connecting to server");
      }
    },
  });

  return (
    <div className="login-container">
      <form onSubmit={formik.handleSubmit}>
        <h2>Login Form</h2>

        <label htmlFor="email">Email</label>
        <input
          id="email"
          name="email"
          type="email"
          placeholder="Enter your email"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.email}
        />
        {formik.touched.email && formik.errors.email && (
          <div className="error">{formik.errors.email}</div>
        )}

        <label htmlFor="password">Password</label>
        <input
          id="password"
          name="password"
          type="password"
          placeholder="Enter your password"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.password}
        />
        {formik.touched.password && formik.errors.password && (
          <div className="error">{formik.errors.password}</div>
        )}

        <div style={{ display: "flex", justifyContent: "center", marginTop: "1rem" }}>
  <button type="submit" style={{ padding: "0.5rem 1.5rem", fontWeight: "bold", backgroundColor: "#4285f4", color: "#fff", border: "none", borderRadius: "8px" }}>
    Login
  </button>
</div>

<div style={{ textAlign: "center", marginTop: "0.8rem" }}>
  <p style={{ display: "inline", marginRight: "5px" }}>Don’t have an account?</p>
  <Link to="/signup" style={{ textDecoration: "none", color: "#4285f4", fontWeight: "bold" }}>
    Signup
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

export default Login;
