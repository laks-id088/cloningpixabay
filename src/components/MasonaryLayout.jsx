import React, { useState } from "react";
import { FaHeart, FaRegHeart } from "react-icons/fa"; // Import filled and unfilled heart icons
import { MdOutlineFileDownload } from "react-icons/md"; // Import download icon
import { saveAs } from "file-saver";

const MasonaryLayout = ({ posts }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [likedImages, setLikedImages] = useState({}); // To track which images are liked

  const handleImageClick = (imageURL) => {
    setSelectedImage(imageURL);  // Set the clicked image URL to the state
    setIsModalOpen(true);  // Open the modal with the download option
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);  // Close the modal
  };

  const handleImageDownload = (url) => {
    saveAs(url, "image.jpg");  // Trigger image download
  };

  const handleLikeClick = (imageURL) => {
    setLikedImages((prevState) => ({
      ...prevState,
      [imageURL]: !prevState[imageURL], // Toggle liked state for the image
    }));
  };

  return (
    <div>
      <div className="grid grid-cols-3 gap-4">
        {posts.map((post, index) => (
          <div key={index} className="relative">
            <img
              src={post.largeImageURL}
              alt={`Post ${index}`}
              className="w-full h-auto cursor-pointer"
              onClick={() => handleImageClick(post.largeImageURL)} // Handle image click
            />

            {/* Heart Icon on each image */}
            <button
              onClick={() => handleLikeClick(post.largeImageURL)} // Handle heart click
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
        <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex justify-center items-center z-50">
          <div className="relative">
            <img
              src={selectedImage}
              alt="Selected"
              className="w-96 h-auto cursor-pointer" // Keep the image size smaller than full screen
            />
            <button
              onClick={() => handleImageDownload(selectedImage)} // Download image on button click
              className="absolute bottom-4 right-16 p-3 bg-black text-white rounded-full"
            >
              <MdOutlineFileDownload className="w-6 h-6" />
            </button>
            <button
              onClick={handleCloseModal} // Close modal on button click
              className="absolute top-4 right-4 p-3 bg-black text-white rounded-full"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default MasonaryLayout;



