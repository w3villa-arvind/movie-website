// src/components/LoginForm.js

import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { signUp } from '../../apiService/axiosClient';
import './../login/login.scss';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const SignUpForm = () => {
    const [formData, setFormData] = useState({
        email: '',
        password: '',
    });
    const [confirmPassword, setConfirmPassword] = useState('');

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!formData.email.trim() || !formData.password.trim() || !confirmPassword.trim()) {
            toast.error('Please enter a value in the empty field');
            return;
          }
          
        if (confirmPassword !== formData.password) {
            toast.error('Password does not meet requirements. Please check and try again.');
            setConfirmPassword('');
            setFormData({
                email: '',
                password: '',
            });
            return;
        }
        try {
            const signUpResponse = (await signUp(formData)).data;
            if (signUpResponse) {
                toast.success('Register Successfuly. please login');
                setConfirmPassword('');
                setFormData({
                    email: '',
                    password: '',
                });
            }

        } catch (error) {
            toast.error('Note: Only defined users succeed registration');
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
                <label htmlFor="password">Confirm Password:</label>
                <input
                    type="password"
                    id="cPassword"
                    name="cPassword"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                />
                <button type="submit">Create Account</button>
                <ToastContainer />
                <p>
                    Already a member?{' '}
                    <Link to="/" style={{ color: '#3498db', textDecoration: 'none ' }}>
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
