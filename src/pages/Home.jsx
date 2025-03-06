import React, { useEffect, useState } from "react";
import fetchPost from "../apiCalls";  // Import the function to fetch posts
import Loading from "../components/Loading";  // Loading indicator component
import MasonaryLayout from "../components/MasonaryLayout";  // Layout component for displaying media
import SearchBar from "../components/SearchBar";  // Search bar component
import VideoComponent from "../components/videocomponent"; // Import VideoComponent


const categories = [
  "Explore", "Images", "Illustrations", "Vectors", "Videos", "Music", "Sound Effects", "GIFs"
];

const Home = () => {
  const [searchTerm, setSearchTerm] = useState("Explore");  // Initially set to "Explore"
  const [isFetching, setIsFetching] = useState(false);  // Loading state
  const [posts, setPosts] = useState([]);  // State to hold fetched posts
  const [showVideos, setShowVideos] = useState(false);  // State to control video display
  
  // Fetch data whenever the selected category changes, excluding "Videos"
  useEffect(() => {
    setIsFetching(true);
    if (searchTerm !== "Videos") {
      fetchPost(searchTerm)  // Fetch posts based on category
        .then((res) => {
          console.log(res);  // Log the fetched data
          setPosts(res);  // Set the posts data
          setIsFetching(false);
        })
        .catch((err) => {
          setIsFetching(false);
          console.log(err);  // Log any errors
        });
    } else {
      // For "Videos" category, use static data
      setPosts([
        { videoURL: "/videos/v1.mp4" },
        { videoURL: "/videos/v2.mp4" },
        { videoURL: "/videos/v3.mp4" },
        { videoURL: "/videos/v4.mp4" },
      ]);
      setIsFetching(false);
    }
  }, [searchTerm]);  // Re-fetch whenever searchTerm changes

  // Toggle showVideos when "Videos" category is selected
  useEffect(() => {
    if (searchTerm === "Videos") {
      setShowVideos(true);
    } else {
      setShowVideos(false);
    }
  }, [searchTerm]);

  return (
    <div className="text-center text-2xl bg-gray-200 py-32 md:py-52 relative">
      {/* Background container */}
      <div className="absolute top-0 left-0 w-full h-full z-0">
        <div
          className="w-full h-full"
          style={{
            backgroundImage: "url(https://images.pexels.com/photos/3327630/pexels-photo-3327630.jpeg)",
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundAttachment: "fixed",
            filter: "blur(8px)", // Apply blur effect only to the background image
          }}
        ></div>
      </div>

      {/* Overlay to make the background image lighter */}
      <div
        className="absolute top-0 left-0 w-full h-full bg-black opacity-5" // Semi-transparent black overlay
        style={{
          backgroundColor: "rgba(0, 0, 0, 0.05)", // Adjust opacity to make the background lighter
        }}
      ></div>

      <div className="w-full bg-transparent relative z-10"> {/* Make sure the content is above the overlay */}

        
        <div className="flex flex-col sm:flex-row justify-center items-center mt-4 sm:mt-6 md:mt-8 px-20">
          <p className="text-xl sm:text-2xl text-white tracking-wide font-bold mr-4">
            Stunning royalty-free images & royalty-free stock
          </p>
          </div>

        {/* Category buttons */}
        <div className="flex flex-wrap justify-center gap-4 p-4">
          {categories.map((category) => (
            <button
              key={category}
              className={`px-4 py-2 rounded-lg text-sm font-semibold transition duration-200 ${searchTerm === category ? "bg-blue-500 text-white" : "bg-gray-300 text-gray-700"}`}
              onClick={() => setSearchTerm(category)}  // Update the searchTerm when a category is clicked
            >
              {category}
            </button>
          ))}
        </div>
       
        {/* Search bar */}
        <div className="flex relative justify-center flex-row mt-6">
          <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
        </div>

        {/* Description - Make both lines appear in a straight line on larger screens */}
        </div>

      {/* Posts section */}
      <div className="sm:px-5 px-1 mt-[120px]">
        <div id="Media-container" className="w-full">
          {isFetching ? (
            <Loading />
          ) : showVideos ? (
            // If "Videos" category is selected, show VideoComponent (without blur effect)
            <div className="relative z-20">
              <VideoComponent posts={posts} />
            </div>
          ) : (
            // Otherwise, render MasonaryLayout for other categories
            <MasonaryLayout posts={posts} />
          )}
        </div>
      </div>
    </div>
  );
};

export default Home;




