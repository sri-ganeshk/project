import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { AiOutlineMenu, AiOutlineClose } from 'react-icons/ai';

const AppBar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  useEffect(() => {
    setMenuOpen(false);
    const token = localStorage.getItem('token');
    if (token) {
      setIsLoggedIn(true);
    } else {
      setIsLoggedIn(false);
    }
  }, [location]);

  const handleNavigation = (type) => {
    navigate(`/movies/${type}`);
  };

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    setIsLoggedIn(false);
  
  };

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
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
        {isLoggedIn ? (
          <div className="relative">
            <img
              src="https://wallpapers.com/images/high/cool-profile-pictures-monkey-face-0jxwmq6bpm3hs9cb.webp"
              alt="Profile"
              className="rounded-full w-10 h-10 cursor-pointer"
              onClick={toggleDropdown}
            />
            {dropdownOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg py-2 z-10">
                <button
                  onClick={handleLogout}
                  className="block w-full text-left px-4 py-2 text-gray-800 hover:bg-gray-200"
                >
                  Logout
                </button>
              </div>
            )}
          </div>
        ) : (
          <button className="text-white hover:text-gray-400 transition" onClick={() => navigate("/login")}>Login</button>
        )}
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
          {isLoggedIn ? (
            <div className="relative">
              <img
                src="https://wallpapers.com/images/high/cool-profile-pictures-monkey-face-0jxwmq6bpm3hs9cb.webp"
                alt="Profile"
                className="rounded-full w-10 h-10 cursor-pointer"
                onClick={toggleDropdown}
              />
              {dropdownOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg py-2 z-10">
                  <button
                    onClick={handleLogout}
                    className="block w-full text-left px-4 py-2 text-gray-800 hover:bg-gray-200"
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>
          ) : (
            <button className="text-white hover:text-gray-400 transition" onClick={() => navigate("/login")}>Login</button>
          )}
        </div>
      )}
    </nav>
  );
};

export default AppBar;
