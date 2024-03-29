import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import Login from './components/login/login';
import Signup from './components/sign-up/signup';
import MovieList from './components/movie-list/movie-list';
import MovieDetails from './components/movie-details/movie-details';
import './App.scss'
import CustomList from './components/CustomList/CustomList';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  useEffect(() => {
    // Check if a valid token exists in localStorage on page load
    const token = localStorage.getItem('token');
    if (token) {
      setIsLoggedIn(true);
    }
  }, []);

  const handleLogin = (userToken) => {
    localStorage.setItem('token', userToken);
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    setIsLoggedIn(false);
  };

  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={
            isLoggedIn ? (
              <Navigate to="/movieList" />
            ) : (
              <Login onLogin={handleLogin} />
            )
          }
        />
        <Route
          path="/signup"
          element={
            isLoggedIn ? (
              <Navigate to="/movieList" />
            ) : (
              <Signup />
            )
          }
        />
        <Route
          path="/movieList"
          element={
            isLoggedIn ? (
              <MovieList />
            ) : (
              <Login onLogin={handleLogin} />
            )
          }
        />
        <Route
          path="/movieList/page/:pageNo"
          element={
            isLoggedIn ? (
              <MovieList onLogout={handleLogout} />
            ) : (
              <Login onLogin={handleLogin} />
            )
          }
        />
        <Route
          path="/search/:query"
          element={
            isLoggedIn ? (
              <CustomList />
            ) : (
              <Login onLogin={handleLogin} />
            )
          }
        />
        <Route
          path="/search/:query/page/:pageNo"
          element={
            isLoggedIn ? (
              <CustomList />
            ) : (
              <Login onLogin={handleLogin} />
            )
          }
        />
        <Route
          path="/movieDetails/:id"
          element={
            isLoggedIn ? (
              <MovieDetails />
            ) : (
              <Login onLogin={handleLogin} />
            )
          }
        />
        <Route path="*"
          element={
            isLoggedIn ? (
              <Navigate to="/" />
            ) : (
              <Login onLogin={handleLogin} />
            )
          }
        />



      </Routes>
    </Router>
  );
}

export default App;
