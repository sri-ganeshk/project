import { useEffect, useState } from 'react';
import axios from 'axios';
import { BrowserRouter, Routes, Route, useNavigate } from "react-router-dom";
import MovieList from './components/MovieList';
import SearchBar from './components/SearchBar';
import './App.css';
import AppBar from './components/AppBar';
import Home from './components/Home';
import Popular from './components/pages/PopularMovies';
import TopRatedMovies from './components/pages/TopRated';
import UpcomingMovies from './components/pages/UpcomingMovies';
function App() {
  return (
    <div>
      
      <BrowserRouter>
      <AppBar />
        <Routes >
          
          <Route path="/" element={<Home />} />
          <Route path='/movie/:id' element={ <p>single movie</p>}></Route>
          <Route path='/movies/popular' element={ <Popular/>}></Route>
          <Route path='/movies/top-rated' element={ <TopRatedMovies/>}></Route>
          <Route path='/movies/upcoming-movies'element={<UpcomingMovies/>}></Route>
          <Route path='/movies/signin' element={<p> hi there</p>}/>
        </Routes>
      </BrowserRouter>
    </div>
  );
}


export default App;