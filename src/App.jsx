import { useEffect, useState } from 'react';
import { BrowserRouter, Routes, Route, useNavigate } from "react-router-dom";
import './App.css';
import AppBar from './components/AppBar';
import Home from './components/Home';
import Popular from './components/pages/PopularMovies';
import TopRatedMovies from './components/pages/TopRated';
import UpcomingMovies from './components/pages/UpcomingMovies';
import Movie from './components/Movie';
import Login from './components/Login';
import Register from './components/register';
import FavoritesDropdown from './components/FavoritesDropdown';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      setIsLoggedIn(true);
    } else {
      setIsLoggedIn(false);
    }
  }, []);

  return (
    <div>
      <BrowserRouter>
        <AppBar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path='/movie/:id' element={<Movie />} />
          <Route path='/movies/popular' element={<Popular />} />
          <Route path='/movies/top-rated' element={<TopRatedMovies />} />
          <Route path='/favorites' element={<FavoritesDropdown/>} />
          <Route path='/movies/upcoming-movies' element={<UpcomingMovies />} />
          {!isLoggedIn && (
            <>
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
            </>
          )}
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
