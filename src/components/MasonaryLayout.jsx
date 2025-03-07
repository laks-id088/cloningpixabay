import React, { useState } from "react";
import { FaHeart, FaRegHeart } from "react-icons/fa"; // Heart icons
import { MdOutlineFileDownload } from "react-icons/md"; // Download icon
import { saveAs } from "file-saver";

const MasonaryLayout = ({ posts }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [likedImages, setLikedImages] = useState({});

  const handleImageClick = (imageURL) => {
    setSelectedImage(imageURL);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleImageDownload = (url) => {
    saveAs(url, "image.jpg");
  };

  const handleLikeClick = (imageURL) => {
    setLikedImages((prevState) => ({
      ...prevState,
      [imageURL]: !prevState[imageURL],
    }));
  };

  return (
    <div className="container mx-auto px-4">
      {/* Image Grid Layout */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {posts.map((post, index) => (
          <div key={index} className="relative">
            <img
              src={post.largeImageURL}
              alt={`Post ${index}`}
              className="w-full h-auto cursor-pointer transition-transform duration-300 transform hover:scale-105"
              onClick={() => handleImageClick(post.largeImageURL)}
            />

            {/* Like (Heart) Icon */}
            <button
              onClick={() => handleLikeClick(post.largeImageURL)}
              className="absolute top-2 right-2 p-2 bg-white bg-opacity-50 rounded-full"
            >
              {likedImages[post.largeImageURL] ? (
                <FaHeart className="w-6 h-6 text-red-500" />
              ) : (
                <FaRegHeart className="w-6 h-6 text-gray-500" />
              )}
            </button>
          </div>
        ))}
      </div>

      {/* Modal for Enlarged Image */}
      {isModalOpen && selectedImage && (
        <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex justify-center items-center z-50 p-4">
          <div className="relative flex justify-center items-center max-w-[90vw] max-h-[90vh]">
            <img
              src={selectedImage}
              alt="Selected"
              className="w-80 sm:w-96 md:w-[500px] lg:w-[600px] xl:w-[750px] max-h-[80vh] object-contain"
            />

            {/* Close Button: Round Shape on Desktop (Top Center), Normal on Mobile (Top Right) */}
            <button
              onClick={handleCloseModal}
              className="absolute bg-black bg-opacity-70 text-white rounded-full p-2 text-xs sm:text-sm md:text-base
                top-2 right-2 sm:top-2 sm:right-2 md:top-4 md:left-1/2 md:-translate-x-1/2 md:w-10 md:h-10 md:flex md:items-center md:justify-center"
            >
              ✕
            </button>

            {/* Download Button - Always on Image */}
            <button
              onClick={() => handleImageDownload(selectedImage)}
              className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-black bg-opacity-70 text-white rounded-full p-2"
            >
              <MdOutlineFileDownload className="w-6 h-6" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default MasonaryLayout;







