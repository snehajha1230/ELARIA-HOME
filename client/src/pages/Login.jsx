import React, { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const { login } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:5000/api/auth/login', formData);
      
      // Ensure token and user are stored correctly
      const { token, user } = res.data;
      login({ token, user });

      toast.success('Login successful');
      setTimeout(() => {
        navigate('/home');
      }, 1500);
    } catch (error) {
      toast.error(error.response?.data?.message || 'Login failed!');
    }
  };

  return (
    <div className="flex min-h-screen bg-gradient-to-r from-amber-100 via-white to-white text-black">
      {/* Left Section – Message */}
      <div className="hidden md:flex w-1/2 flex-col justify-center items-center p-10 text-center">
        <img
          src="https://i.pinimg.com/736x/a6/4a/e0/a64ae073b6813f2548fec763bd5b18ac.jpg"
          alt="Emotional support illustration"
          className="w-60 h-auto mb-6"
        />
        <h2 className="text-3xl font-semibold mb-4">Welcome Back to Elaria 🤍</h2>
        <p className="text-lg text-gray-700 max-w-md">
          You’ve made it here and that means something.
          Whether you're here to talk, to be heard, or just breathe, Elaria is always your space.
        </p>
      </div>

      {/* Right Section – Login Form */}
      <div className="w-full md:w-1/2 flex items-center justify-center p-8">
        <form
          onSubmit={handleSubmit}
          className="w-full max-w-md space-y-6 bg-white bg-opacity-80 backdrop-blur-md p-8 border border-gray-200 shadow-md rounded-md"
        >
          <h1 className="text-3xl font-bold text-center">Log In to Your Account</h1>

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
            Log In
          </button>

          <p className="text-center text-sm text-gray-600">
            Don't have an account? <a href="/signup" className="underline hover:text-black">Sign Up</a>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Login;
