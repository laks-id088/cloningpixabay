import React, { useState } from "react";
import { MdOutlineFileDownload } from "react-icons/md"; // Download icon
import { saveAs } from "file-saver";

const MasonaryLayout = ({ posts }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState("");

  const handleImageClick = (imageURL) => {
    console.log("Image clicked:", imageURL);
    setSelectedImage(imageURL);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedImage("");
  };

  const handleImageDownload = () => {
    if (selectedImage) {
      saveAs(selectedImage, "downloaded-image.jpg");
    }
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
          </div>
        ))}
      </div>

      {/* Modal for Enlarged Image */}
      {isModalOpen && selectedImage && (
        <div
          className="fixed inset-0 bg-black bg-opacity-80 flex justify-center items-center z-50 p-4"
          onClick={handleCloseModal}
        >
          <div
            className="relative flex flex-col items-center bg-white rounded-lg shadow-lg p-4 pointer-events-auto"
            onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside
          >
            <img
              src={selectedImage}
              alt="Selected"
              className="w-full max-w-lg max-h-[80vh] object-contain"
            />

            {/* Buttons */}
            <div className="mt-4 flex justify-between w-full">
              <button
                onClick={handleCloseModal}
                className="bg-gray-500 text-white px-4 py-2 rounded-lg hover:bg-gray-700 transition"
              >
                Close
              </button>

              <button
                onClick={handleImageDownload}
                className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition flex items-center"
              >
                <MdOutlineFileDownload className="w-6 h-6 mr-2" />
                Download
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MasonaryLayout;
