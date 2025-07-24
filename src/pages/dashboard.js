import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const [roleName, setRoleName] = useState("");
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchRole = async () => {
      try {
        const userData = JSON.parse(localStorage.getItem("user"));
        if (!userData) {
          navigate("/login");
          return;
        }

        setUser(userData);
        const roleid = userData.role_id;

        const response = await axios.get(`http://localhost:3000/roles?id=${roleid}`);
        if (response.data && response.data.length > 0) {
          const role = response.data[0].name.toLowerCase();
          setRoleName(role);

          // Redirect based on role
          switch (role) {
            case "admin":
              navigate("/admin");
              break;
            case "buyer":
              navigate("/buyer");
              break;
            case "agent":
              navigate("/agent");
              break;
            default:
              navigate("/home");
              break;
          }
        }
      } catch (error) {
        console.error("Error fetching role:", error);
        navigate("/home");
      }
    };

    fetchRole();
  }, [navigate]);

  return (
    <div className="container py-5 text-center">
      <h4>Redirecting to your dashboard...</h4>
    </div>
  );
};

export default Dashboard;
