// src/components/LoginForm.js

import React, { useState,useEffect } from 'react';
import { loginAPI } from '../../apiService/axiosClient';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

import './login.scss';

const LoginForm = ({onLogin}) => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
        const response = (await loginAPI(formData)).data;
        const token = response.token;
        onLogin(token);
          if(!!response){
            navigate('/movieList');
              setFormData({
                email: '',
                password: '',
              });
          }
    } catch (error) {
        console.log(error.response.data.error)
    }
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

        <label htmlFor="password">Password:</label>
        <input
          type="password"
          id="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
        />
        <button type="submit">Login</button>
        <p>
        If you don't have an account,{' '}
        <Link to="/signup" style={{ color: '#3498db' }}>
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
