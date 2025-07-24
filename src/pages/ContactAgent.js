import React, { useEffect, useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { useLocation } from "react-router-dom";
import { Link } from "react-router-dom";

import { useNavigate } from "react-router-dom";
const ContactAgent = () => {
  const location = useLocation();
  const navigate=useNavigate();
  const { name, email, mobile, title } = location.state || {};
 const [user, setUser] = useState(null);
  const [buyer, setBuyer] = useState(null);
  const [agent, setAgent] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const storedUser = JSON.parse(localStorage.getItem("user"));
        if (!storedUser || !storedUser.id) {
          console.error("No logged-in user found.");
          return;
        }

        const userRes = await axios.get(`http://localhost:3000/users/${storedUser.id}`);
        setBuyer(userRes.data);

        const allUsersRes = await axios.get("http://localhost:3000/users");
        const agents = allUsersRes.data.filter((u) => u.role_id === 2);

       const matched = agents.find(
  (a) => a.email.toLowerCase() === email?.toLowerCase()
);


        setAgent(matched);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [name]);



  const validationSchema = Yup.object({
    message: Yup.string().required("Message is required")
  });

  const handleSubmit = (values, { resetForm }) => {
    if (!buyer || !agent) {
      alert("No Agent found");
      return;
    }

    const newMessage = {
      id: Date.now(),
      senderId: buyer.id,
      senderName: `${buyer.first_name} ${buyer.last_name}`,
      senderEmail: buyer.email,
      receiverId: agent.id,
      receiverName: `${agent.first_name} ${agent.last_name}`,
      message: values.message,
      timestamp: new Date().toISOString()
    };

    const oldMessages = JSON.parse(localStorage.getItem("messages")) || [];
    localStorage.setItem("messages", JSON.stringify([...oldMessages, newMessage]));

    alert(`Message sent to ${agent.first_name} successfully!`);
    resetForm();
  };
  const handleLogout = () => {

   localStorage.removeItem("user");

    navigate("/home");
  };
  const contactagent=()=>{

    navigate("/contact-agent")
  }

  return (
    <>
     


    <div className="container mt-5">
      <div className="card shadow p-4">
        <h3 className="mb-4 text-center">Contact Agent</h3>

        {buyer ? (
          <Formik
            initialValues={{ message: "" }}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
          >
            <Form>
              <div className="mb-3">
                <label className="form-label">Your Name</label>
                <input
                  className="form-control"
                  value={`${buyer.first_name} ${buyer.last_name}`}
                  disabled
                />
              </div>

              <div className="mb-3">
                <label className="form-label">Your Email</label>
                <input className="form-control" value={buyer.email} disabled />
              </div>

              <div className="mb-3">
                <label className="form-label">Agent Name</label>
                <input
                  className="form-control"
                  value={agent ? `${agent.first_name} ${agent.last_name}` : name || ""}
                  disabled
                />
              </div>

              <div className="mb-3">
                <label className="form-label">Agent Email</label>
                <input className="form-control" value={email || ""} disabled />
              </div>

              <div className="mb-3">
                <label className="form-label">Agent Mobile</label>
                <input className="form-control" value={mobile || ""} disabled />
              </div>

              <div className="mb-3">
                <label className="form-label">Message</label>
                <Field
                  as="textarea"
                  name="message"
                  className="form-control"
                  rows="4"
                />
                
              </div>

              <div className="text-center">
                <button type="submit" className="btn btn-primary px-4">
                  Send Message
                </button>
              </div>
            </Form>
          </Formik>
        ) : (
          <div className="text-center text-muted">Please log in to contact an agent.</div>
        )}
      </div>
    </div>
    </>
  );
};

export default ContactAgent;
