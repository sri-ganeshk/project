import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { AiOutlineMenu, AiOutlineClose } from 'react-icons/ai';

const AppBar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    setMenuOpen(false);
  }, [location]);

  const handleNavigation = (type) => {
    navigate(`/movies/${type}`);
  };

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <nav className="bg-black p-4 flex justify-between items-center relative w-full">
      <div className="flex items-center">
        <button onClick={() => navigate("/")}>
          <h2 className="text-white text-2xl font-bold">Film Sphere</h2>
        </button>
      </div>
      <div className="hidden md:flex space-x-8 text-lg">
        <button className="text-white hover:text-gray-400 transition" onClick={() => navigate("/")}>Home</button>
        <button className="text-white hover:text-gray-400 transition" onClick={() => handleNavigation("popular")}>Popular</button>
        <button className="text-white hover:text-gray-400 transition" onClick={() => handleNavigation("top-rated")}>Top Rated</button>
        <button className="text-white hover:text-gray-400 transition" onClick={() => handleNavigation("upcoming-movies")}>Upcoming</button>
      </div>
      <div className="md:hidden">
        <button onClick={toggleMenu}>
          {menuOpen ? <AiOutlineClose className="w-6 h-6 text-white" /> : <AiOutlineMenu className="w-6 h-6 text-white" />}
        </button>
      </div>
      {menuOpen && (
        <div className="md:hidden absolute top-16 left-0 w-full bg-black flex flex-col items-center space-y-4 py-4 text-lg z-10">
          <button className="text-white hover:text-gray-400 transition" onClick={() => navigate("/")}>Home</button>
          <button className="text-white hover:text-gray-400 transition" onClick={() => handleNavigation("popular")}>Popular</button>
          <button className="text-white hover:text-gray-400 transition" onClick={() => handleNavigation("top-rated")}>Top Rated</button>
          <button className="text-white hover:text-gray-400 transition" onClick={() => handleNavigation("upcoming-movies")}>Upcoming</button>
        </div>
      )}
    </nav>
  );
};

export default AppBar;
