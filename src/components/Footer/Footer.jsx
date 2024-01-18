import React from 'react';

import './footer.scss';

import { Link } from 'react-router-dom';

import bg from '../../assets/footer-bg.jpg';

const Footer = () => {
    return (
        <div className="footer" style={{backgroundImage: `url(${bg})`}}>
            <div className="container">
                <div className="footer-title">
                    <div className="logo">
                        <Link style={{ textDecoration: 'none',color:'white' }} to="/">MoviesClone</Link>
                    </div>
                </div>
                <div className="footer-content">
                    <div className="footer-text-list">
                        <Link style={{ textDecoration: 'none',color:'white',padding:'5px 0px' }} to="/">Home</Link>
                        <Link style={{ textDecoration: 'none',color:'white',padding:'5px 0px' }}>Contact us</Link>
                        <Link style={{ textDecoration: 'none',color:'white',padding:'5px 0px' }}>Term of services</Link>
                        <Link style={{ textDecoration: 'none',color:'white',padding:'5px 0px' }}>About us</Link>
                    </div>
                    <div className="footer-text-list">
                        <Link style={{ textDecoration: 'none',color:'white',padding:'5px 0px' }}>Live</Link>
                        <Link style={{ textDecoration: 'none',color:'white',padding:'5px 0px' }}>FAQ</Link>
                        <Link style={{ textDecoration: 'none',color:'white',padding:'5px 0px' }}>Premium</Link>
                        <Link style={{ textDecoration: 'none',color:'white',padding:'5px 0px' }}>Pravacy policy</Link>
                    </div>
                    <div className="footer-text-list">
                        <Link style={{ textDecoration: 'none',color:'white',padding:'5px 0px' }}>You must watch</Link>
                        <Link style={{ textDecoration: 'none',color:'white',padding:'5px 0px' }}>Recent release</Link>
                        <Link style={{ textDecoration: 'none',color:'white',padding:'5px 0px' }}>Top IMDB</Link>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Footer;
