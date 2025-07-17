import React, { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext'; 

const Signup = () => {
  const [formData, setFormData] = useState({
    username: '',
    age: '',
    email: '',
    password: ''
  });

  const { login } = useAuth(); // ✅
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:5000/api/auth/signup', {
        username: formData.username,
        age: formData.age,
        email: formData.email,
        password: formData.password,
        name: formData.username
      });

      login(res.data); 
      toast.success('Signup successful');
      setTimeout(() => {
        navigate('/login');
      }, 1500);
    } catch (error) {
      toast.error(error.response?.data?.message || 'Signup failed!');
    }
  };

  return (
    <div className="flex min-h-screen bg-gradient-to-r from-amber-100 via-white to-white text-black">
      {/* Left Section – Uplifting Message */}
      <div className="hidden md:flex w-1/2 flex-col justify-center items-center p-10 text-center">
        <img
          src="https://i.pinimg.com/1200x/1f/c9/6d/1fc96d0070bfafe41bb28cb22c7f2376.jpg"
          alt="Supportive illustration"
          className="w-60 h-auto mb-6"
        />
        <h2 className="text-3xl font-semibold mb-4">You're Taking a Brave Step 💛</h2>
        <p className="text-lg text-gray-700 max-w-md">
          At <strong>Elaria</strong>, you're never alone. This is your space to breathe, be heard, and begin again.  
          We believe healing starts with being seen and we see you.
        </p>
      </div>

      {/* Right Section – Signup Form */}
      <div className="w-full md:w-1/2 flex items-center justify-center p-8">
        <form
          onSubmit={handleSubmit}
          className="w-full max-w-md space-y-6 bg-white bg-opacity-80 backdrop-blur-md p-8 border border-gray-200 shadow-md rounded-md"
        >
          <h1 className="text-3xl font-bold text-center">Create Your Account</h1>

          <div>
            <label className="block text-sm font-medium mb-1">Username</label>
            <input
              type="text"
              name="username"
              value={formData.username}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-black"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Age</label>
            <input
              type="number"
              name="age"
              value={formData.age}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-black"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-black"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Password</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-black"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-black text-white py-2 uppercase font-medium tracking-wide hover:bg-white hover:text-black border border-black transition-all duration-300"
          >
            Sign Up
          </button>

          <p className="text-center text-sm text-gray-600">
            Already have an account? <a href="/login" className="underline hover:text-black">Login</a>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Signup;
