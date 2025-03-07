import React from "react";

const VideoComponent = ({ posts }) => {
  // Function to handle video play/pause on click
  const handleVideoClick = (videoRef) => {
    if (videoRef.current.paused) {
      videoRef.current.play();
    } else {
      videoRef.current.pause();
    }
  };

  return (
    <div
      className="video-container"
      style={{
        display: "flex",
        flexWrap: "wrap",
        gap: "24px",
        justifyContent: "center", // Center videos horizontally
      }}
    >
      {posts?.map((post, index) =>
        post.videoURL ? (
          <div
            key={index}
            className="video-item"
            style={{
              flex: "1 1 100%", // Full width on mobile
              maxWidth: "90%", // Adjust width for mobile
              marginBottom: "20px",
              display: "flex",
              justifyContent: "center", // Center the video inside the div
            }}
          >
            <video
              className="rounded-lg w-full md:w-[60%] lg:w-[70%] xl:w-[80%]" // Larger size on desktop
              controls
              ref={(ref) => (post.videoRef = ref)} // Ref for controlling video
              onClick={() => handleVideoClick(post.videoRef)} // Play/pause on click
            >
              <source src={post.videoURL} type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          </div>
        ) : null
      )}
    </div>
  );
};

export default VideoComponent;


