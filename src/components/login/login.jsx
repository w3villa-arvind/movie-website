// src/components/LoginForm.js

import React, { useState, useEffect } from 'react';
import { loginAPI } from '../../apiService/axiosClient';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import './login.scss';

const LoginForm = ({ onLogin }) => {
  const navigate = useNavigate();
  const [errors, setErrors] = useState({});
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
    setErrors({
      ...errors,
      [name]: '',
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) {
      return;
    }
    try {
      const response = (await loginAPI(formData)).data;
      const token = response.token;
      onLogin(token);
      if (!!response) {
        navigate('/movieList');
        toast.success('login successful!');
        setFormData({
          email: '',
          password: '',
        });
      }
    } catch (error) {
      toast.error('login faild,user not found');
      console.log(error.response.data.error)
    }
  };
  const validateForm = () => {
    const newErrors = {};

    if (!formData.email.trim()) {
      newErrors.email = 'email is required';
    }

    if (!formData.password.trim()) {
      newErrors.password = 'password is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  return (
    <div className="login-form-container">
      <form className="login-form" onSubmit={handleSubmit}>
        <label htmlFor="email">Email:</label>
        <input
          type="text"
          id="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
        />
        {errors.email && <span className="error-message"> {errors.email}</span>}
        <label htmlFor="password">Password:</label>
        <input
          type="password"
          id="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
        />
        {errors.password && <span className="error-message"> {errors.password}</span>}
        <button type="submit">Login</button>
        <ToastContainer />
        <p>
          If you don't have an account,{' '}
          <Link to="/signup" style={{ color: '#3498db', textDecoration: 'none' }}>
            sign up here
          </Link>
          .
        </p>
      </form>
      <div>
      </div>
    </div>
  );
};

export default LoginForm;
