import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import logo from "../assets/img/pixabay.png";

const Navbar = () => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("user");
    setUser(null);
    navigate("/login");
  };

  return (
    <div className="w-full bg-white flex justify-between items-center h-16 px-6 shadow-md">
      {/* Logo on the Left */}
      <Link to="/" className="no-underline text-inherit">
        <img src={logo} alt="Pixabay Logo" className="w-19 h-12" />
      </Link>

      {/* Login/Logout Box on the Right */}
      <div className="ml-auto">
        {user ? (
          <button 
            onClick={handleLogout} 
            className="bg-red-500 text-white px-4 py-2 rounded-lg shadow-md hover:bg-red-700 transition">
            Logout ({user.username})
          </button>
        ) : (
          <Link 
            to="/login" 
            className="bg-blue-500 text-white px-4 py-2 rounded-lg shadow-md hover:bg-blue-700 transition">
            Login
          </Link>
          
        )}
      </div>
    </div>
  );
};

export default Navbar; 