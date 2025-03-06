import React, { useState, useRef } from "react";

const CardComponent = ({ post }) => {
  const [postHovered, setPostHovered] = useState(false);
  const [isOpen, setOpen] = useState(false);

  // Create a reference for the video element
  const videoRef = useRef(null);

  // Function to play the video when clicked
  const handleVideoClick = () => {
    if (videoRef.current) {
      if (videoRef.current.paused) {
        videoRef.current.play();  // Play the video if it's paused
      } else {
        videoRef.current.pause(); // Pause the video if it's playing
      }
    }
  };

  // Handle the image download
  const handleImageDownload = () => {
    const imageURL = post.webformatURL; // Get the image URL
    const link = document.createElement("a"); // Create a temporary <a> element
    link.href = imageURL;  // Set the image URL as the link's href
    link.download = imageURL.split("/").pop(); // Set the filename to be the image's name
    link.click();  // Simulate a click to start the download
  };

  // Render different types of media based on the post data
  const renderMedia = () => {
    if (post.webformatURL) {
      return (
        <img
          className="rounded-lg w-full cursor-pointer"
          src={post.webformatURL}
          alt="media"
          onError={(e) => {
            // Fallback to a default image if the original image fails to load
            e.target.onerror = null; // Prevent infinite loop
            e.target.src = "https://via.placeholder.com/300"; // Fallback image URL
          }}
          onClick={handleImageDownload}  // Trigger image download on click
        />
      );
    } else if (post.videoURL) {
      return (
        <video
          className="rounded-lg w-full"
          controls
          ref={videoRef}  // Attach the ref to the video element
          onClick={handleVideoClick}  // Play or pause video on click
        >
          <source src={post.videoURL} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      );
    } else {
      // Fallback to local videos in public/videos folder
      const videoIndex = Math.floor(Math.random() * 4) + 1;  // Randomly choose a video from v1 to v4
      const videoPath = `${process.env.PUBLIC_URL}/videos/v${videoIndex}.mp4`;

      return (
        <video
          className="rounded-lg w-full"
          controls
          ref={videoRef}
          onClick={handleVideoClick}
        >
          <source src={videoPath} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      );
    }
  };

  return (
    <div className="m-2">
      <div
        onMouseEnter={() => setPostHovered(true)}
        onMouseLeave={() => setPostHovered(false)}
        onClick={() => setOpen(!isOpen)}
        className="relative cursor-zoom-in w-auto hover:shadow-lg rounded-lg overflow-hidden transition-all duration-500 ease-in-out"
      >
        {renderMedia()}  {/* Render the correct media type */}

        {postHovered && (
          <div
            className="absolute top-0 w-full h-full flex flex-col justify-between p-1 pr-2 pt-2 pb-2 z-50 ease-in-out duration-300"
            style={{ height: "100%" }}
          >
            <div className="flex items-center justify-between">
              <div className="flex gap-2"></div>
            </div>
            <div className="flex items-center gap-2 w-full bg-black rounded-xl opacity-60 p-1">
              <div className="flex gap-2 items-center w-full h-full">
                <img
                  alt="User"
                  src={post?.userImageURL}
                  className="z-50 rounded-full h-10 w-10"
                />
                <div>
                  <p className="text-sm text-white">{post.user}</p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CardComponent;






