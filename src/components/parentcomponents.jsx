import React from 'react';
import VideoComponent from './videocomponent';

const ParentComponent = () => {
  // Array of video URLs
  const videoURLs = [
    `${process.env.PUBLIC_URL}/videos/video1.mp4`,
    `${process.env.PUBLIC_URL}/videos/video2.mp4`,
    `${process.env.PUBLIC_URL}/videos/video3.mp4`
  ];

  return (
    <div>
      <h1>Video Gallery</h1>
      <VideoComponent videoURLs={videoURLs} />
    </div>
  );
};

export default ParentComponent;
