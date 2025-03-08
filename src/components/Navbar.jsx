import React, { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import logo from "../assets/img/pixabay.png";

const Navbar = () => {
  const [user, setUser] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false); // State to control Explore modal visibility
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false); // State to control Auth modal visibility
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false); // State to control mobile menu visibility
  const mobileMenuRef = useRef(null); // Ref for mobile menu
  const mobileMenuToggleRef = useRef(null); // Ref for the hamburger button
  const navigate = useNavigate();

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  useEffect(() => {
    // Close the mobile menu when clicked outside
    const handleClickOutside = (event) => {
      if (
        mobileMenuRef.current &&
        !mobileMenuRef.current.contains(event.target) &&
        !mobileMenuToggleRef.current.contains(event.target)
      ) {
        setIsMobileMenuOpen(false);
      }
    };

    // Add event listener on mount
    document.addEventListener("mousedown", handleClickOutside);

    // Clean up event listener on unmount
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("user");
    setUser(null);
    navigate("/login");
  };

  const handleExploreClick = () => {
    setIsModalOpen(true); // Open the Explore modal
  };

  const handleCloseModal = () => {
    setIsModalOpen(false); // Close the Explore modal
  };

  const handleAuthModalToggle = () => {
    setIsAuthModalOpen((prev) => !prev); // Toggle the authentication modal
  };

  const handleMobileMenuToggle = () => {
    setIsMobileMenuOpen((prev) => !prev); // Toggle mobile menu visibility
  };

  // Handler for Join button click to show Auth modal
  const handleJoinClick = () => {
    setIsAuthModalOpen(true); // Open the auth modal
  };

  // Handler for Upload button click to show Auth modal
  const handleUploadClick = () => {
    setIsAuthModalOpen(true); // Open the auth modal
  };

  // Handler for Login button to navigate to login page
  const handleLoginClick = () => {
    navigate("/login"); // Navigate to login page
  };

  return (
    <div className="w-full absolute top-0 left-0 flex justify-between items-center h-16 px-6 z-50 bg-transparent">
      {/* Logo on the Left */}
      <Link to="/" className="no-underline text-inherit">
        <img src={logo} alt="Pixabay Logo" className="w-19 h-12" />
      </Link>

      {/* Hamburger Icon (Mobile View) */}
      <div
        className="sm:hidden flex items-center"
        onClick={handleMobileMenuToggle}
        ref={mobileMenuToggleRef}
      >
        <button className="text-white text-2xl">
          &#9776; {/* Hamburger icon */}
        </button>
      </div>

      {/* Nav Buttons on the Right (Desktop View) */}
      <div className="flex gap-6 ml-auto hidden sm:flex">
        <button
          onClick={handleExploreClick}
          className="text-white font-medium px-4 py-2 rounded-lg hover:bg-gray-700 transition"
        >
          Explore
        </button>

        {/* Use handleJoinClick for Join button */}
        <button
          onClick={handleJoinClick}
          className="text-white font-medium px-4 py-2 rounded-lg hover:bg-gray-700 transition"
        >
          Join
        </button>

        {/* Login/Logout Box */}
        {user ? (
          <button
            onClick={handleLogout}
            className="bg-transparent text-white px-4 py-2 rounded-lg shadow-md hover:bg-gray-700 transition"
          >
            Logout ({user.username})
          </button>
        ) : (
          <button
            onClick={handleLoginClick} // Trigger navigate to login page
            className="bg-transparent text-white px-4 py-2 rounded-lg shadow-md hover:bg-gray-200 transition"
          >
            Login
          </button>
        )}

        {/* Use handleUploadClick for Upload button */}<button
  onClick={handleUploadClick}
  className="text-white font-medium px-3 py-1 rounded-lg bg-green-600 hover:bg-gray-700 transition"
>
  <span className="mr-1 text-sm sm:text-base md:text-lg">↑</span> {/* Smaller arrow size */}
  Upload
</button>

      </div>

      {/* Mobile view: Show the buttons stacked and scrollable */}
      {isMobileMenuOpen && (
        <div
          className="sm:hidden flex flex-col gap-4 ml-auto max-h-80 overflow-y-auto w-full px-4 py-2 bg-black text-white"
          ref={mobileMenuRef}
        >
          <button
            onClick={handleExploreClick}
            className="text-white font-medium px-4 py-2 rounded-lg hover:bg-gray-700 transition"
          >
            Explore
          </button>

          {/* Use handleJoinClick for Join button */}
          <div className="flex justify-start">
  <button
    onClick={handleJoinClick}
    className="text-white font-medium px-4 py-2 rounded-lg hover:bg-gray-700 transition mt-12"
  >
    Join
  </button>
</div>




          {/* Wrap Login button in a div to align left */}
          <div className="w-full flex justify-start">
            {user ? (
              <button
                onClick={handleLogout}
                className="bg-transparent text-white px-4 py-2 rounded-lg shadow-md hover:bg-gray-700 transition"
              >
                Logout ({user.username})
              </button>
            ) : (
              <button
                onClick={handleLoginClick} // Trigger navigate to login page
                className="bg-transparent text-white px-4 py-2 rounded-lg shadow-md hover:bg-gray-200 transition"
              >
                Login
              </button>
            )}
          </div>

          {/* Use handleUploadClick for Upload button */}
          <button
  onClick={handleUploadClick}
  className="text-white font-medium px-4 py-2 rounded-md bg-green-800 hover:bg-green-700 transition flex items-center"
>
  <span className="mr-2 text-xl sm:text-2xl md:text-3xl">↑</span> {/* Responsive arrow size */}
  Upload
</button>



        </div>
      )}

      {/* Modal for Explore Button */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-black p-10 rounded-lg w-150 relative">
            {/* Close button as a cross */}
            <button
              onClick={handleCloseModal}
              className="absolute top-2 right-2 text-2xl text-gray-500 hover:text-gray-800"
            >
              &times;
            </button>

            <h2 className="text-xl font-semibold mb-4">Explore Options</h2>

            {/* Horizontal Layout for options */}
            <div className="flex flex-wrap justify-between gap-4">
              <button
                onClick={handleCloseModal}
                className="text-white hover:text-blue-700 w-full sm:w-auto"
              >
                Media
              </button>
              <button
                onClick={handleCloseModal}
                className="text-white hover:text-blue-700 w-full sm:w-auto"
              >
                Discover
              </button>
              <button
                onClick={handleCloseModal}
                className="text-white hover:text-blue-700 w-full sm:w-auto"
              >
                Trending
              </button>
              <button
                onClick={handleCloseModal}
                className="text-white hover:text-blue-700 w-full sm:w-auto"
              >
                Community
              </button>
              <button
                onClick={handleCloseModal}
                className="text-white hover:text-blue-700 w-full sm:w-auto"
              >
                About
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Authentication Modal (Join / Upload) */}
      {isAuthModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-lg w-96 relative">
            {/* Close button */}
            <button
              onClick={handleAuthModalToggle}
              className="absolute top-2 right-2 text-2xl text-gray-500 hover:text-gray-800"
            >
              &times;
            </button>
            <h2 className="text-xl font-semibold mb-4">Sign Up / Log In</h2>
            <div className="flex flex-col gap-4">
              {/* Google Login */}
              <button className="bg-red-600 text-white font-medium px-4 py-2 rounded-lg hover:bg-red-700 transition">
                Continue with Google
              </button>
              {/* Facebook Login */}
              <button className="bg-blue-600 text-white font-medium px-4 py-2 rounded-lg hover:bg-blue-700 transition">
                Continue with Facebook
              </button>
              {/* Gmail Login (ID + Password form) */}
              <div className="flex flex-col gap-2">
                <input
                  type="email"
                  placeholder="Enter your Gmail ID"
                  className="px-4 py-2 border rounded-lg"
                />
                <input
                  type="password"
                  placeholder="Enter your Password"
                  className="px-4 py-2 border rounded-lg"
                />
                <button
                  className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition"
                >
                  Log In
                </button>
                <button
                  className="text-blue-500 text-sm mt-2 hover:underline"
                >
                  Forgot password?
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Navbar;











