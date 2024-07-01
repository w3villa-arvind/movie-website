import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import MovieList from "./components/movie-list/movie-list";
import MovieDetails from "./components/movie-details/movie-details";
import "./App.scss";
import CustomList from "./components/CustomList/CustomList";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/movieList" />} />
        <Route path="/movieList" element={<MovieList />} />
        <Route path="/movieList/page/:pageNo" element={<MovieList />} />
        <Route path="/search/:query" element={<CustomList />} />
        <Route path="/search/:query/page/:pageNo" element={<CustomList />} />
        <Route path="/movieDetails/:id" element={<MovieDetails />} />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Router>
  );
}

export default App;
