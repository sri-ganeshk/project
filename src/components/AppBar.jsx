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
    <nav className="bg-black p-4 flex justify-between items-center relative">
      <div className="flex items-center space-x-4 md:space-x-10">
        <button onClick={() => navigate("/")}>
          <h2 className="text-white text-xl md:text-2xl">Film Sphere</h2>
        </button>
        <div className="hidden md:flex space-x-4 text-lg">
          <button className="text-white" onClick={() => navigate("/")}>Home</button>
          <button className="text-white" onClick={() => handleNavigation("popular")}>Popular</button>
          <button className="text-white" onClick={() => handleNavigation("top-rated")}>Top Rated</button>
          <button className="text-white" onClick={() => handleNavigation("upcoming-movies")}>Upcoming</button>
        </div>
      </div>
      <div className="hidden md:flex ml-auto">
        <button
          className="bg-red-700 text-white px-5 py-2 rounded-full hover:bg-red-900 text-lg"
          onClick={() => handleNavigation("signin")}
        >
          Sign In
        </button>
      </div>
      <div className="md:hidden">
        <button onClick={toggleMenu}>
          {menuOpen ? <AiOutlineClose className="w-6 h-6 text-white" /> : <AiOutlineMenu className="w-6 h-6 text-white" />}
        </button>
      </div>
      {menuOpen && (
        <div className="md:hidden absolute top-16 left-0 w-full bg-black flex flex-col items-center space-y-4 py-4 text-lg z-10">
          <button className="text-white" onClick={() => navigate("/")}>Home</button>
          <button className="text-white" onClick={() => handleNavigation("popular")}>Popular</button>
          <button className="text-white" onClick={() => handleNavigation("top-rated")}>Top Rated</button>
          <button className="text-white" onClick={() => handleNavigation("upcoming-movies")}>Upcoming</button>
          <button
            className="bg-red-700 text-white px-5 py-2 rounded-full hover:bg-red-900"
            onClick={() => handleNavigation("signin")}
          >
            Sign In
          </button>
        </div>
      )}
    </nav>
  );
};

export default AppBar;
