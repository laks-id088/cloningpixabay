import React from "react";
import { Link } from "react-router-dom";
import logo from "../assets/img/pixabay.png"; // Check and correct the path


const Navbar = () => {
  return (
    <div className="w-full bg-white flex justify-center items-center h-16">
      <Link to="/" className="no-underline text-inherit">
        <img src={logo} alt="Pixabay Logo" className="w-19 h-12" />
      </Link>
    </div>
  );
};

export default Navbar;
