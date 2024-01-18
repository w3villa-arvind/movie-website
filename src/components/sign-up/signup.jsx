// src/components/LoginForm.js

import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { signUp } from '../../apiService/axiosClient';
import './../login/login.scss';

const SignUpForm = () => {
    const [formData, setFormData] = useState({
        email: '',
        password: '',
    });
    const [confirmPassword, setConfirmPassword] = useState(null);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        try {
         const signUpResponse =  (await signUp(formData)).data;
        
     } catch (error) {
        console.log(error.response.data.error)
     }

        setFormData({
            email: '',
            password: '',
        });
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
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                />
                <label htmlFor="password">Confirm Password:</label>
                <input
                    type="password"
                    id="cPassword"
                    name="cPassword"
                />
                <button type="submit">Create Account</button>
                <p>
                    Already a member?{' '}
                    <Link to="/" style={{ color: '#3498db' }}>
                        Login
                    </Link>
                    .
                </p>
            </form>
            <div>
            </div>
        </div>
    );
};

export default SignUpForm;
