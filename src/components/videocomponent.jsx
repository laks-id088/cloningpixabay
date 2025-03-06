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
    <div className="video-container" style={{ display: "flex", flexWrap: "wrap", gap: "16px" }}>
      {posts?.map((post, index) => (
        post.videoURL ? (
          <div key={index} className="video-item" style={{ flex: "1 1 45%", maxWidth: "45%" }}>
            <video
              className="rounded-lg w-full"
              controls
              ref={(ref) => (post.videoRef = ref)} // Ref for controlling video
              onClick={() => handleVideoClick(post.videoRef)} // Play/pause on click
            >
              <source src={post.videoURL} type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          </div>
        ) : null
      ))}
    </div>
  );
};

export default VideoComponent;








