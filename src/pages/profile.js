import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import { useFormik } from 'formik';
import * as Yup from 'yup';
import 'bootstrap/dist/css/bootstrap.min.css';

const Profile = () => {
  const [userDetails, setUserDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [previewImage, setPreviewImage] = useState(null);
  const [selectedBase64, setSelectedBase64] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [showPasswordForm, setShowPasswordForm] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem("user"));
    if (!userData?.id) {
      navigate("/login");
      return;
    }

    const fetchUser = async () => {
      try {
        const res = await axios.get(`http://localhost:3000/users/${userData.id}`);
        const { password, ...cleanedUser } = res.data;
        setUserDetails(cleanedUser);
      } catch (err) {
        console.error("Error fetching user:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, []);

  const profileFormik = useFormik({
    enableReinitialize: true,
    initialValues: {
      first_name: userDetails?.first_name || '',
      last_name: userDetails?.last_name || '',
      email: userDetails?.email || '',
      contact: userDetails?.contact || '',
      street: userDetails?.address?.street || '',
      city: userDetails?.address?.city || '',
      pin: userDetails?.address?.pin || '',
      state: userDetails?.address?.state || '',
      country: userDetails?.address?.country || '',
    },
    validationSchema: Yup.object({
      first_name: Yup.string().required("Required"),
      last_name: Yup.string(),
      email: Yup.string().email("Invalid email").required("Required"),
      contact: Yup.string(),
    }),
    onSubmit: async (values) => {
      if (!userDetails) return;

      const currentValues = {
        first_name: userDetails.first_name || '',
        last_name: userDetails.last_name || '',
        email: userDetails.email || '',
        contact: userDetails.contact || '',
        street: userDetails.address?.street || '',
        city: userDetails.address?.city || '',
        pin: userDetails.address?.pin || '',
        state: userDetails.address?.state || '',
        country: userDetails.address?.country || '',
      };

      if (JSON.stringify(values) === JSON.stringify(currentValues)) {
        alert("No changes made.");
        setIsEditing(false);
        return;
      }

      try {
        const updatedUser = {
          ...userDetails,
          ...values,
          address: {
            street: values.street,
            city: values.city,
            pin: values.pin,
            state: values.state,
            country: values.country,
          },
        };

        await axios.patch(`http://localhost:3000/users/${userDetails.id}`, updatedUser);

        const { password, ...safeUser } = updatedUser;
        setUserDetails(safeUser);
        localStorage.setItem("user", JSON.stringify(safeUser));
        setIsEditing(false);
        alert("Profile updated!");
      } catch (error) {
        console.error("Update failed:", error);
        alert("Error updating profile.");
      }
    },
  });

  const passwordFormik = useFormik({
    initialValues: {
      newPassword: '',
      confirmPassword: '',
    },
    validationSchema: Yup.object({
      newPassword: Yup.string().min(6, "Minimum 6 characters").required("New password is required"),
      confirmPassword: Yup.string()
        .oneOf([Yup.ref('newPassword')], "Passwords must match")
        .required("Confirm password is required"),
    }),
    onSubmit: async (values, { resetForm }) => {
      try {
        await axios.patch(`http://localhost:3000/users/${userDetails.id}`, {
          password: values.newPassword,
        });
        alert("Password changed successfully!");
        setShowPasswordForm(false);
        resetForm();
      } catch (err) {
        console.error("Password update failed:", err);
        alert("Error changing password.");
      }
    }
  });

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onloadend = () => {
      const base64String = reader.result.split(',')[1];
      setSelectedBase64(base64String);
      setPreviewImage(reader.result);
    };
    reader.readAsDataURL(file);
  };

  const uploadImageToServer = async () => {
    if (!selectedBase64 || !userDetails) return;
    setUploading(true);
    try {
      await axios.patch(`http://localhost:3000/users/${userDetails.id}`, {
        img_url: selectedBase64,
      });
      setUserDetails(prev => ({ ...prev, img_url: selectedBase64 }));
      setPreviewImage(null);
      setSelectedBase64(null);
      alert("Profile photo updated successfully!");
    } catch (err) {
      console.error("Failed to upload image:", err);
      alert("Error uploading photo.");
    } finally {
      setUploading(false);
    }
  };

  if (loading) return <div className="container py-5 text-center">Loading profile...</div>;
  if (!userDetails) return <div className="container py-5 text-center">User not found.</div>;

  return (
    <div className="container py-5">
      <div className="card shadow-lg p-4 rounded-4">
        <h2 className="mb-4 text-center">User Profile</h2>

        <div className="mb-4 d-flex justify-content-center">
          {previewImage || userDetails.img_url ? (
            <img
              src={previewImage || `data:image/jpeg;base64,${userDetails.img_url}`}
              alt="Profile"
              className="rounded-circle shadow"
              style={{ width: "150px", height: "150px", objectFit: "cover" }}
            />
          ) : (
            <div
              className="rounded-circle bg-secondary d-flex align-items-center justify-content-center shadow"
              style={{ width: "150px", height: "150px" }}
            >
              <i className="bi bi-person fs-1 text-white"></i>
            </div>
          )}
        </div>

        <div className="text-center mb-3">
          <input
            type="file"
            accept="image/*"
            onChange={handleImageUpload}
            id="profile-photo"
            style={{ display: "none" }}
          />
          <label htmlFor="profile-photo" className="btn btn-outline-primary btn-sm me-2">
            Choose Photo
          </label>
          {previewImage && (
            <button
              onClick={uploadImageToServer}
              className="btn btn-success btn-sm"
              disabled={uploading}
            >
              {uploading ? "Uploading..." : "Confirm Upload"}
            </button>
          )}
        </div>

        <form onSubmit={profileFormik.handleSubmit}>
          {[{ label: "First Name", name: "first_name" },
            { label: "Last Name", name: "last_name" },
            { label: "Email", name: "email" },
            { label: "Contact", name: "contact" }].map(({ label, name }) => (
              <div className="row mb-3" key={name}>
                <label className="col-md-6 fw-bold">{label}:</label>
                <div className="col-md-6">
                  <input
                    name={name}
                    type="text"
                    className="form-control form-control-sm"
                    value={profileFormik.values[name]}
                    onChange={profileFormik.handleChange}
                    onBlur={profileFormik.handleBlur}
                    disabled={!isEditing}
                  />
                  {profileFormik.errors[name] && profileFormik.touched[name] && (
                    <div className="text-danger">{profileFormik.errors[name]}</div>
                  )}
                </div>
              </div>
          ))}

          <hr />
          <h5 className="fw-semibold mt-4 mb-3">🏠 Address</h5>

          {["street", "city", "pin", "state", "country"].map((field) => (
            <div className="row mb-2" key={field}>
              <label className="col-md-6 fw-bold">{field.charAt(0).toUpperCase() + field.slice(1)}:</label>
              <div className="col-md-6">
                <input
                  name={field}
                  type="text"
                  className="form-control form-control-sm"
                  value={profileFormik.values[field]}
                  onChange={profileFormik.handleChange}
                  onBlur={profileFormik.handleBlur}
                  disabled={!isEditing}
                />
              </div>
            </div>
          ))}
        </form>

        <div className="text-end mt-4">
          {!isEditing ? (
            <button
              type="button"
              className="btn btn-primary"
              onClick={() => setIsEditing(true)}
            >
              Edit Profile
            </button>
          ) : (
            <>
              <button
                type="button"
                className="btn btn-success me-2"
                onClick={profileFormik.handleSubmit}
              >
                Save Changes
              </button>
              <button
                type="button"
                className="btn btn-secondary"
                onClick={() => setIsEditing(false)}
              >
                Cancel
              </button>
            </>
          )}
        </div>

        <div className="text-end mt-3">
          <button
            className="btn btn-outline-danger btn-sm"
            onClick={() => setShowPasswordForm(prev => !prev)}
          >
            {showPasswordForm ? "cancel" : "Change Password"}
          </button>
        </div>

        {showPasswordForm && (
          <form onSubmit={passwordFormik.handleSubmit} className="mt-4">
            <h5 className="fw-semibold mb-3"> Change Password</h5>

            {[ "newPassword", "confirmPassword"].map((field) => (
              <div className="row mb-3" key={field}>
                <label className="col-md-6 fw-bold">
                  {
                   field === "newPassword" ? "New Password" : "Confirm Password"}:
                </label>
                <div className="col-md-6">
                  <input
                    type="password"
                    name={field}
                    className="form-control form-control-sm"
                    value={passwordFormik.values[field]}
                    onChange={passwordFormik.handleChange}
                    onBlur={passwordFormik.handleBlur}
                  />
                  {passwordFormik.touched[field] && passwordFormik.errors[field] && (
                    <div className="text-danger">{passwordFormik.errors[field]}</div>
                  )}
                </div>
              </div>
            ))}

            <div className="text-end">
              <button type="submit" className="btn btn-danger btn-sm">
                Update Password
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

export default Profile;
