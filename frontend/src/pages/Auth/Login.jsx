import React, { useState } from "react";
import Layout from "../../components/Layout/Layout";
import { toast } from "react-toastify";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/auth";
import "./Login.css"; // new css file

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [auth, setAuth] = useAuth();

  const navigate = useNavigate();
  // Handle form submit
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      toast.error("All fields are required!");
      return;
    }
    try {
      const res = await axios.post(`/api/v1/auth/login`, { email, password });
      if (res && res.data.success) {
        toast.success(res.data.message);
        setAuth({
          ...auth,
          user: res.data.user,
          token: res.data.token,
        });
        localStorage.setItem("auth",JSON.stringify(res.data));
        navigate("/");
      } else {
        toast.error(res.data.message);
      };
    } catch (error) {
      console.log(error.response?.data||error.message);
      toast.error("Login failed, please try again");
    }
  };

  return (
    <>
      <Layout title={"Login: UrbanBazaar"}>
        <div className="login-page">
          {/* Left side form */}
          <div className="login-form-container">
            <h2>Welcome back</h2>

            <form onSubmit={handleSubmit} className="login-form">
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

              <button type="submit" className="submit-btn">
                Log In
              </button>

              <p className="alt-link">
                Don't have an account? <a href="/register">Sign Up</a>
              </p>
            </form>
          </div>

          {/* Right side image/promo */}
          <div className="login-image">
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
    </>
  );
};

export default Login;