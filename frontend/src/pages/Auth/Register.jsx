import React, { useState } from "react";
import Layout from "../../components/Layout/Layout";
import { toast } from "react-toastify";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./Register.css"; // new css file

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!name || !email || !password || !phone || !address) {
      toast.error("All fields are required!");
      return;
    }
    try {
      const res = await axios.post(`/api/v1/auth/register`, {
        name,
        email,
        password,
        phone,
        address,
      });
      if (res.data.success) {
        toast.success(res.data.message);
        navigate("/login");
      } else {
        toast.error(res.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error("something went wrong");
    }
  };

  return (
    <Layout title={"Register: UrbanBazaar"}>
      <div className="register-page">
        {/* Left side form */}
        <div className="register-form-container">
          <h2>Create your account</h2>

          <form onSubmit={handleSubmit} className="register-form">
            {/* Name */}
            <input
              type="text"
              placeholder="Enter your Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />

            {/* Email */}
            <input
              type="email"
              placeholder="Enter your Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />

            {/* Password */}
            <input
              type="password"
              placeholder="Enter your Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />

            {/* Phone */}
            <input
              type="tel"
              placeholder="Enter your Phone"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              required
            />

            {/* Address */}
            <textarea
              placeholder="Enter your Address"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              required
            />

            <div className="terms">
              <input type="checkbox" required /> I agree to all Terms & Conditions
            </div>

            <button type="submit" className="submit-btn">
              Sign Up
            </button>

            <p className="alt-link">
              Already have an account? <a href="/login">Log In</a>
            </p>
          </form>
        </div>

        {/* Right side image/promo */}
        <div className="register-image">
          <div className="overlay-text">
            <h1>UrbanBazaar</h1>
            <p>Shop Smart, Live Better.</p>
            <div className="badges">
              <span>✓ Fast Delivery</span>
              <span>✓ Secure Payment</span>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Register;
