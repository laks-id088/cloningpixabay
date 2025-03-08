import React, { useRef } from "react";

const VideoComponent = ({ posts }) => {
  // Store refs for videos
  const videoRefs = useRef([]);

  // Function to handle video play/pause on click
  const handleVideoClick = (index) => {
    const video = videoRefs.current[index];
    if (video) {
      video.paused ? video.play() : video.pause();
    }
  };

  // Handle category button clicks
  const handleCategoryClick = (category) => {
    console.log(`Category selected: ${category}`);
  };

  return (
    <div className="bg-white min-h-screen w-full flex flex-col items-center p-6 mt-48">
      {/* Text & Buttons Container */}
      <div className="w-full flex flex-col sm:flex-row justify-between items-center sm:items-start mb-4">
        {/* Left-aligned Text */}
        <div className="text-left text-sm sm:text-base lg:text-lg text-black font-bold tracking-tight w-full sm:w-auto">
          Over 5.3 million+ high-quality stock images, videos, and music shared by
          our talented community.
        </div>

        {/* Right-aligned Buttons */}
        <div className="mt-4 sm:mt-0 flex flex-wrap justify-center sm:justify-end gap-4">
          {["Editor's Choice", "Latest", "Trending"].map((category) => (
            <button
              key={category}
              onClick={() => handleCategoryClick(category)}
              className="px-4 py-2 text-sm md:text-base font-medium bg-gray-200 text-black rounded-lg shadow-md hover:bg-gray-300 transition"
            >
              {category}
            </button>
          ))}
        </div>
      </div>

      {/* Video Container */}
      <div className="mt-6 flex flex-wrap gap-6 justify-center w-full">
        {posts?.map((post, index) =>
          post.videoURL ? (
            <div
              key={index}
              className="w-full sm:w-1/2 lg:w-1/3 flex justify-center"
            >
              <video
                className="rounded-lg w-full max-w-md shadow-lg"
                controls
                ref={(el) => (videoRefs.current[index] = el)}
                onClick={() => handleVideoClick(index)}
              >
                <source src={post.videoURL} type="video/mp4" />
                Your browser does not support the video tag.
              </video>
            </div>
          ) : null
        )}
      </div>
    </div>
  );
};

export default VideoComponent;


