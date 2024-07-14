import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AiOutlineMenu, AiOutlineClose } from 'react-icons/ai';

const AppBar = () => {
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);

  const handleNavigation = (type) => {
    navigate(`/movies/${type}`);
    setMenuOpen(false); 
  };

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <nav className="bg-black p-4 flex justify-between items-center">
      <div className="flex items-center space-x-10">
        <button onClick={() => navigate("/")}>
          <h2 className="text-black-800">Flim Shpere</h2>
        </button>
        <div className="hidden md:flex space-x-4 text-lg">
          <button onClick={() => navigate("/")}>Home</button>
          <button onClick={() => handleNavigation("popular")}>Popular</button>
          <button onClick={() => handleNavigation("top-rated")}>Top Rated</button>
          <button onClick={() => handleNavigation("upcoming-movies")}>Upcoming</button>
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
          {menuOpen ? <AiOutlineClose className="w-6 h-6" /> : <AiOutlineMenu className="w-6 h-6" />}
        </button>
      </div>
      {menuOpen && (
        <div className="md:hidden absolute top-16 left-0 w-full bg-black flex flex-col items-center space-y-4 py-4 text-lg">
          <button className = "hover:bg-red-900" onClick={() => navigate("/")}>Home</button>
          <button className = "hover:bg-red-900" onClick={() => handleNavigation("popular")}>Popular</button>
          <button className = "hover:bg-red-900" onClick={() => handleNavigation("top-rated")}>Top Rated</button>
          <button className = "hover:bg-red-900" onClick={() => handleNavigation("upcoming-movies")}>Upcoming</button>
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
