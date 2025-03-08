import React from "react";

const Footer = () => {
  return (
    <footer className="bg-white text-gray-600 dark:bg-gray-800 dark:text-gray-400 p-6">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">
        {/* Left Section: Logo & Description */}
        <div className="md:col-span-1">
          <h1 className="text-xl font-bold text-gray-800 dark:text-white">Pixabay</h1>
          <p className="text-sm text-gray-500 mt-2">
            Over 5.3 million+ high-quality stock images, videos, and music shared by our talented community.
          </p>
        </div>

        {/* Middle Section: Discover, Community, About (Moved towards right) */}
        <div className="md:col-span-2 md:col-start-3 grid grid-cols-2 md:grid-cols-3 gap-6 text-sm">
          <div>
            <h3 className="font-semibold text-gray-700 dark:text-white mb-2">Discover</h3>
            <ul className="space-y-1">
              <li><a href="/" className="hover:underline">Editor's Choice</a></li>
              <li><a href="/" className="hover:underline">Curated Collections</a></li>
              <li><a href="/" className="hover:underline">Pixabay Radio <span className="text-green-600 font-bold">NEW</span></a></li>
              <li><a href="/" className="hover:underline">Popular Images</a></li>
              <li><a href="/" className="hover:underline">Popular Videos</a></li>
              <li><a href="/" className="hover:underline">Popular Music</a></li>
              <li><a href="/" className="hover:underline">Popular Searches</a></li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-gray-700 dark:text-white mb-2">Community</h3>
            <ul className="space-y-1">
              <li><a href="/" className="hover:underline">Blog</a></li>
              <li><a href="/" className="hover:underline">Forum</a></li>
              <li><a href="/" className="hover:underline">Creators</a></li>
              <li><a href="/" className="hover:underline">Cameras</a></li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-gray-700 dark:text-white mb-2">About</h3>
            <ul className="space-y-1">
              <li><a href="/" className="hover:underline">About Us</a></li>
              <li><a href="/" className="hover:underline">FAQ</a></li>
              <li><a href="/" className="hover:underline">License Summary</a></li>
              <li><a href="/" className="hover:underline">Terms of Service</a></li>
              <li><a href="/" className="hover:underline">Privacy Policy</a></li>
              <li><a href="/" className="hover:underline">Cookies Policy</a></li>
              <li><a href="/" className="hover:underline">Digital Services Act</a></li>
              <li><a href="/" className="hover:underline">Report Content</a></li>
              <li><a href="/" className="hover:underline">API</a></li>
            </ul>
          </div>
        </div>

        {/* Social Icons */}
        <div className="md:col-span-1 flex justify-center md:justify-start mt-6 md:mt-0 space-x-4">
          <a href="https://instagram.com" className="text-gray-500 hover:text-gray-800" target="_blank" rel="noopener noreferrer">
            <i className="fab fa-instagram"></i>
          </a>
          <a href="https://pinterest.com" className="text-gray-500 hover:text-gray-800" target="_blank" rel="noopener noreferrer">
            <i className="fab fa-pinterest"></i>
          </a>
          <a href="https://twitter.com" className="text-gray-500 hover:text-gray-800" target="_blank" rel="noopener noreferrer">
            <i className="fab fa-twitter"></i>
          </a>
          <a href="https://facebook.com" className="text-gray-500 hover:text-gray-800" target="_blank" rel="noopener noreferrer">
            <i className="fab fa-facebook"></i>
          </a>
        </div>
      </div>

      {/* Legal Disclaimer */}
      <div className="text-center text-xs text-gray-500 mt-4">
        This site is protected by reCAPTCHA and the Google <a href="/" className="underline">Privacy Policy</a> and <a href="/" className="underline">Terms of Service</a> apply.
      </div>
    </footer>
  );
};

export default Footer;