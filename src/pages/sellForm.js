import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";

const SellProperty = () => {
  const navigate = useNavigate();
  const [properties, setProperties] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:3000/properties")
      .then((res) => setProperties(res.data))
      .catch((err) => console.error("Error fetching properties:", err));
  }, []);

  const initialValues = {
    location: "",
    title: "",
    propertyType: "",
    area: "",
    price: "",
    status: "",
    possessionDate: "",
    name: "",
    email: "",
    mobile: "",
    notes: "",
    image: ""
  };

  const validationSchema = Yup.object({
    location: Yup.string().required("Required"),
    propertyType: Yup.string().required("Required"),
    area: Yup.number().required("Required"),
    price: Yup.number().required("Required"),
    title: Yup.string().required("Required"),
    status: Yup.string().required("Required"),
    possessionDate: Yup.date().required("Required"),
    name: Yup.string().required("Required"),
    email: Yup.string().email("Invalid email").required("Required"),
    mobile: Yup.string().required("Required"),
    notes: Yup.string(),
    image: Yup.string().url("Must be a valid URL").required("Required")
  });

 const handleSubmit = async (values, { resetForm }) => {
  try {
    const user = JSON.parse(localStorage.getItem("user"));
    const lastId = properties.length > 0
      ? Math.max(...properties.map((p) => p.id))
      : 0;

    const newProperty = {
      ...values,
      id: lastId + 1,
      createdAt: new Date().toISOString(),
      submittedBy: user?.email || "anonymous"
    };

    await axios.post("http://localhost:3000/properties", newProperty);

 
    const prevTxns = JSON.parse(localStorage.getItem("transactions")) || [];
    const newTransaction = {
      propertyTitle: newProperty.title,
      sellerEmail: user?.email || "unknown",
      sellerId: user?.id || null,
      amount: newProperty.price,
      date: new Date().toISOString()
    };

    localStorage.setItem(
      "transactions",
      JSON.stringify([...prevTxns, newTransaction])
    );

    alert("Property Submitted Successfully!");
    resetForm();
    navigate("/properties");
  } catch (error) {
    console.error("Error adding property:", error);
    alert("Failed to submit property.");
  }
};


  return (
    <div className="container mt-5">
      <div className="card shadow p-4">
        <h2 className="mb-4 text-center">Sell Your Property</h2>

        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          <Form>
            {/* Fields remain unchanged from your original version */}
            <div className="mb-3">
              <label className="form-label">Title</label>
              <Field name="title" className="form-control" />
              <div className="text-danger"><ErrorMessage name="title" /></div>
            </div>
            <div className="mb-3">
              <label className="form-label">Location</label>
              <Field name="location" className="form-control" />
              <div className="text-danger"><ErrorMessage name="location" /></div>
            </div>
            <div className="mb-3">
              <label className="form-label">Property Type</label>
              <Field as="select" name="propertyType" className="form-select">
                <option value="">Select Type</option>
                <option value="Apartment">Apartment</option>
                <option value="Villa">Villa</option>
                <option value="Plot">Plot</option>
                <option value="Commercial">Commercial</option>
              </Field>
              <div className="text-danger"><ErrorMessage name="propertyType" /></div>
            </div>
            <div className="mb-3">
              <label className="form-label">Area (sq.ft)</label>
              <Field name="area" type="number" className="form-control" />
              <div className="text-danger"><ErrorMessage name="area" /></div>
            </div>
            <div className="mb-3">
              <label className="form-label">Expected Price (₹)</label>
              <Field name="price" type="number" className="form-control" />
              <div className="text-danger"><ErrorMessage name="price" /></div>
            </div>
            <div className="mb-3">
              <label className="form-label">Construction Status</label><br />
              <div className="form-check form-check-inline">
                <Field type="radio" name="status" value="Ready to Move" className="form-check-input" />
                <label className="form-check-label">Ready to Move</label>
              </div>
              <div className="form-check form-check-inline">
                <Field type="radio" name="status" value="Under Construction" className="form-check-input" />
                <label className="form-check-label">Under Construction</label>
              </div>
              <div className="text-danger"><ErrorMessage name="status" /></div>
            </div>
            <div className="mb-3">
              <label className="form-label">Possession Date</label>
              <Field name="possessionDate" type="date" className="form-control" />
              <div className="text-danger"><ErrorMessage name="possessionDate" /></div>
            </div>
            <div className="mb-3">
              <label className="form-label">Your Name</label>
              <Field name="name" className="form-control" />
              <div className="text-danger"><ErrorMessage name="name" /></div>
            </div>
            <div className="mb-3">
              <label className="form-label">Email Address</label>
              <Field name="email" type="email" className="form-control" />
              <div className="text-danger"><ErrorMessage name="email" /></div>
            </div>
            <div className="mb-3">
              <label className="form-label">Mobile Number</label>
              <Field name="mobile" className="form-control" />
              <div className="text-danger"><ErrorMessage name="mobile" /></div>
            </div>
            <div className="mb-3">
              <label className="form-label">Image URL</label>
              <Field name="image" className="form-control" />
              <div className="text-danger"><ErrorMessage name="image" /></div>
            </div>
            <div className="mb-3">
              <label className="form-label">Additional Notes</label>
              <Field as="textarea" name="notes" className="form-control" rows="4" />
            </div>

            <div className="text-center">
              <button type="submit" className="btn btn-primary px-5">Submit Property</button>
            </div>
          </Form>
        </Formik>
      </div>
    </div>
  );
};

export default SellProperty;
