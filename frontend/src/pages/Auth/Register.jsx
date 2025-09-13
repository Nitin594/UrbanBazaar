import React, { useState } from "react";
import Layout from "../../components/Layout/Layout";
import { toast } from "react-toastify";
import axios from 'axios'
import {useNavigate} from 'react-router-dom'

const Register = () => {
  // State variables
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
    const navigate = useNavigate()
  // Handle form submit
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!name || !email || !password || !phone || !address) {
      toast.error("All fields are required!");
      return;
    }
    try {
        const res = await axios.post(`/api/v1/auth/register`,{name,email,password,phone,address});
        if(res.data.success){
            toast.success(res.data.message);
            navigate("/login");
        }else{
            toast.error(res.data.message)
        }
    } catch (error) {
        console.log(error)
        toast.error('something went wrong')
    }

    // For now, just log data
    console.log({ name, email, password, phone, address });

    // Example: You can send it to your API here
    // await axios.post("/api/register", { name, email, password, phone, address });

    toast.success("Registration successful!");
  };

  return (
    <Layout title={'Register: UrbanBazaar'}>
      <div style={{ maxWidth: "400px", margin: "0 auto" }}>
        <h1>Register</h1>

        <form onSubmit={handleSubmit}>
          {/* Name */}
          <div style={{ marginBottom: "10px" }}>
            <label>Name:</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              style={{ width: "100%" }}
            />
          </div>

          {/* Email */}
          <div style={{ marginBottom: "10px" }}>
            <label>Email:</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              style={{ width: "100%" }}
            />
          </div>

          {/* Password */}
          <div style={{ marginBottom: "10px" }}>
            <label>Password:</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              style={{ width: "100%" }}
            />
          </div>

          {/* Phone */}
          <div style={{ marginBottom: "10px" }}>
            <label>Phone:</label>
            <input
              type="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              required
              style={{ width: "100%" }}
            />
          </div>

          {/* Address */}
          <div style={{ marginBottom: "10px" }}>
            <label>Address:</label>
            <textarea
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              required
              style={{ width: "100%" }}
            />
          </div>

          {/* Submit Button */}
          <button type="submit">Register</button>
        </form>
      </div>
    </Layout>
  );
};

export default Register;
