import React from "react";
import Dialog from "@mui/material/Dialog";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import { IoMdClose } from "react-icons/io";
import Slide from "@mui/material/Slide";
import { Avatar } from "@mui/material";
import { MdOutlineFileDownload } from "react-icons/md";
import { saveAs } from "file-saver";  // Import file-saver

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const BigDialog = ({ isOpen, setOpen, post }) => {
  const handleClose = () => {
    setOpen(false);
  };

  const downloadMedia = () => {
    // Check for the available media URL (image, video, gif, audio)
    if (post?.largeImageURL) {
      const imageURL = post.largeImageURL;
      console.log('Downloading image from:', imageURL); // Log URL for debugging
  
      // Fetch the image as a Blob and download it
      fetch(imageURL)
        .then((response) => response.blob())  // Convert the response to a Blob
        .then((blob) => {
          saveAs(blob, "image.jpg"); // Use saveAs to download the image as 'image.jpg'
        })
        .catch((error) => {
          console.error('Error downloading image:', error); // Log any errors
        });
    } else if (post?.videoURL) {
      const videoURL = post.videoURL;
      console.log('Downloading video from:', videoURL); // Log URL for debugging
      saveAs(videoURL, "video.mp4"); // Download the video
    } else if (post?.gifURL) {
      const gifURL = post.gifURL;
      console.log('Downloading gif from:', gifURL); // Log URL for debugging
      saveAs(gifURL, "animation.gif"); // Download the gif
    } else if (post?.audioURL) {
      const audioURL = post.audioURL;
      console.log('Downloading audio from:', audioURL); // Log URL for debugging
      saveAs(audioURL, "audio.mp3"); // Download the audio file
    } else {
      console.log("No media URL found for download.");
    }
  };
  

  if (!post) return null; // Handle the case where post data is not available

  return (
    <Dialog
      fullScreen
      open={isOpen}
      onClose={handleClose}
      TransitionComponent={Transition}
    >
      <AppBar sx={{ position: "relative" }} className="bg-slate-200">
        <Toolbar className="flex justify-between">
          <div className="flex gap-x-2 md:gap-x-5 items-center">
            <IconButton
              edge="start"
              color="inherit"
              onClick={handleClose}
              aria-label="close"
            >
              <IoMdClose />
            </IconButton>
            <Avatar alt="User Avatar" src={post?.userImageURL || ""} />
            <p>{post?.user}</p>
          </div>

          <button
            className="h-5 w-5 md:h-7 md:w-7 animate-bounce"
            onClick={downloadMedia}
          >
            <MdOutlineFileDownload className="w-full h-full" />
          </button>
        </Toolbar>
      </AppBar>

      {/* Show the media */}
      {post?.largeImageURL ? (
        <img
          src={post.largeImageURL}
          alt="Post"
          className="h-full w-full object-cover"
        />
      ) : post?.videoURL ? (
        <video
          className="h-full w-full object-cover"
          controls
        >
          <source src={post.videoURL} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      ) : post?.gifURL ? (
        <img
          src={post.gifURL}
          alt="GIF"
          className="h-full w-full object-cover"
        />
      ) : post?.audioURL ? (
        <audio className="w-full">
          <source src={post.audioURL} type="audio/mp3" />
          Your browser does not support the audio element.
        </audio>
      ) : (
        <div className="h-full w-full flex justify-center items-center text-gray-500">
          No media available
        </div>
      )}
    </Dialog>
  );
};

export default BigDialog;


