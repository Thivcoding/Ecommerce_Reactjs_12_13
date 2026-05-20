import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createUserAPi } from "../../services/userService";

const UserCreate = () => {
  const navigate = useNavigate();
  const [isLoading , setLoading] = useState(false);

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    image: null,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleImage = (e) => {
    setForm({ ...form, image: e.target.files[0] });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);
    
    try {
        const res = await createUserAPi(form);
        console.log(res.data);
        

        if(res.data.status == "success"){
            alert(res.data.message);
            navigate("/admin/users");
        }
    } catch (error) {
        console.log(error);
    }finally{
        setLoading(false);
    }

  };

    if (isLoading) {
        return (
        <div
            className="vh-100 vw-100 d-flex justify-content-center align-items-center position-fixed top-0 start-0"
            style={{
            background: "rgba(0,0,0,0.85)",
            backdropFilter: "blur(10px)",
            zIndex: 9999,
            }}
        >
            <div className="text-center text-white">
            
            {/* Spinner */}
            <div
                className="spinner-border text-light mb-3"
                role="status"
                style={{ width: "3rem", height: "3rem" }}
            ></div>

            {/* Text */}
            <h5 className="fw-bold">Loading...</h5>
            <p className="text-secondary mb-0">
                Please wait while we prepare your data
            </p>
            </div>
        </div>
        );
    }

  return (
    <div className="container py-4">
      <div className="row justify-content-center">
        <div className="col-12 col-md-8 col-lg-6">

          <div className="card border-0 shadow-sm">
            <div className="card-body p-4">

              {/* Header + Back Button */}
              <div className="d-flex justify-content-between align-items-center mb-3">
                <div>
                  <h3 className="mb-0">Create User</h3>
                  <p className="text-muted mb-0">Add a new user to the system</p>
                </div>

                {/* BACK BUTTON */}
                <button
                  type="button"
                  className="btn btn-outline-secondary btn-sm"
                  onClick={() => navigate(-1)}
                >
                  <i className="bi bi-arrow-left me-1" />
                  Back
                </button>
              </div>

              <form onSubmit={handleSubmit}>

                {/* Name */}
                <div className="mb-3">
                  <label className="form-label">Full Name</label>
                  <input
                    type="text"
                    name="name"
                    className="form-control"
                    placeholder="Enter full name"
                    value={form.name}
                    onChange={handleChange}
                  />
                </div>

                {/* Email */}
                <div className="mb-3">
                  <label className="form-label">Email</label>
                  <input
                    type="email"
                    name="email"
                    className="form-control"
                    placeholder="Enter email"
                    value={form.email}
                    onChange={handleChange}
                  />
                </div>

                {/* Password */}
                <div className="mb-3">
                  <label className="form-label">Password</label>
                  <input
                    type="password"
                    name="password"
                    className="form-control"
                    placeholder="Enter password"
                    value={form.password}
                    onChange={handleChange}
                  />
                </div>

                {/* Image */}
                <div className="mb-4">
                  <label className="form-label">Profile Image</label>
                  <input
                    type="file"
                    className="form-control"
                    accept="image/*"
                    onChange={handleImage}
                  />
                </div>

                {/* Submit */}
                <button type="submit" className="btn btn-primary w-100">
                  Create User
                </button>

              </form>

            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default UserCreate;