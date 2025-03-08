import React, { useEffect, useState } from "react";
import fetchPost from "../apiCalls";
import Loading from "../components/Loading";
import MasonaryLayout from "../components/MasonaryLayout";
import SearchBar from "../components/SearchBar";
import VideoComponent from "../components/videocomponent";


// Existing Categories for navigation (Explore, Images, etc.)
const categories = [
  "Explore", "Images", "Illustrations", "Vectors", "Videos", "Music", "Sound Effects", "GIFs"
];

// Custom categories for the new buttons
const customCategories = [
  "nature", "flowers", "wallpaper", "landscape", "holi", "Cat","sky","fruits","trees"
];


const musicTracks = [
  { title: "Song 1", src: "/Music/song1.mp3" },
  { title: "Song 2", src: "/Music/song2.mp3" },
  { title: "Song 3", src: "/Music/song3.mp3" },
  { title: "Song 4", src: "/Music/song4.mp3" },
  { title: "Song 5", src: "/Music/song5.mp3" }
];

const soundEffects = [
  { title: "Sound 1", src: "/sounds/1.mp3" },
  { title: "Sound 2", src: "/sounds/2.mp3" },
  { title: "Sound 3", src: "/sounds/3.mp3" },
  { title: "Sound 4", src: "/sounds/4.mp3" }
];

const gifList = [
  { title: "GIF 1", src: "/gifs/gif1.gif" },
  { title: "GIF 2", src: "/gifs/gif2.gif" },
  { title: "GIF 3", src: "/gifs/gif3.gif" },
  { title: "GIF 4", src: "/gifs/gif4.gif" }
];

// Component to handle Music
const MusicComponent = ({ tracks }) => (
  <div className="flex flex-col items-center gap-4 bg-white p-6 w-full min-h-screen">
    {tracks.map((track, index) => (
      <div key={index} className="w-full max-w-md ">
        <p className="text-lg font-semibold mb-2">{track.title}</p>
        <audio controls className="w-full">
          <source src={track.src} type="audio/mp3" />
          Your browser does not support the audio element.
        </audio>
      </div>
    ))}
  </div>
);



const SoundEffectsComponent = ({ effects }) => (
  <div className="flex flex-col items-center gap-4 bg-white p-6 w-full min-h-screen">
    {effects.map((effect, index) => (
      <div key={index} className="w-full max-w-md ">
        <p className="text-lg font-semibold mb-2">{effect.title}</p>
        <audio controls className="w-full">
          <source src={effect.src} type="audio/mp3" />
          Your browser does not support the audio element.
        </audio>
      </div>
    ))}
  </div>
);






const Home = () => {
  const [searchTerm, setSearchTerm] = useState("Explore");
  const [isFetching, setIsFetching] = useState(false);
  const [posts, setPosts] = useState([]);
  const [showVideos, setShowVideos] = useState(false);
  const [showMusic, setShowMusic] = useState(false);
  const [showSoundEffects, setShowSoundEffects] = useState(false);
  const [showGIFs, setShowGIFs] = useState(false);

  useEffect(() => {
    setIsFetching(true);
    setShowVideos(false);
    setShowMusic(false);
    setShowSoundEffects(false);
    setShowGIFs(false);

    if (searchTerm === "Videos") {
      setPosts([
        { videoURL: "/videos/v1.mp4" },
        { videoURL: "/videos/v2.mp4" },
        { videoURL: "/videos/v3.mp4" },
        { videoURL: "/videos/v4.mp4" },
      ]);
      setShowVideos(true);
    } else if (searchTerm === "Music") {
      setShowMusic(true);
    } else if (searchTerm === "Sound Effects") {
      setShowSoundEffects(true);
    } else if (searchTerm === "GIFs") {
      setShowGIFs(true);
    } else {
      fetchPost(searchTerm)
        .then((res) => {
          setPosts(res);
        })
        .catch((err) => console.log(err));
    }
    setIsFetching(false);
  }, [searchTerm]);

  const handleCategoryClick = (categoryName) => {
    setSearchTerm(categoryName); // Update the search term and refresh the posts
  };

  const categoryBackgrounds = {
    Explore:"url('https://cdn.pixabay.com/photo/2018/07/31/23/03/lavender-3576129_1280.jpg')",
    Images: "url('https://cdn.pixabay.com/photo/2019/10/25/10/13/sunflower-4576573_1280.jpg')",
    Illustrations: "url('https://cdn.pixabay.com/photo/2024/02/28/11/36/magnolia-8601851_1280.png')",
    Vectors: "url('https://cdn.pixabay.com/photo/2022/10/03/23/41/house-7497002_1280.png')",
    Videos: "url('https://cdn.pixabay.com/animation/2025/02/20/20/10/20-10-19-416_512.gif')",
    Music: "url('https://cdn.pixabay.com/photo/2022/11/28/00/42/to-7620937_1280.jpg')",
    "Sound Effects": "url('https://cdn.pixabay.com/photo/2022/06/21/21/15/audio-7276511_1280.jpg')",
    GIFs: "url('https://cdn.pixabay.com/animation/2023/02/16/14/40/14-40-49-756_512.gif')"
  };
  const currentBackground = categoryBackgrounds[searchTerm] || categoryBackgrounds["Explore"];
  return (
    <div 
    className="text-center text-2xl py-12 md:py-24 relative"
    style={{
      backgroundImage: currentBackground,
      backgroundSize: "cover",
      backgroundPosition: "center",
      backgroundAttachment: "fixed",
    }}
  >
   

  {/* Dark Overlay */}
  <div className="absolute inset-0 bg-black opacity-40"></div>


      {/* Dark Overlay */}
      <div className="w-full bg-transparent relative z-10">
        <div className="flex flex-col sm:flex-row justify-center items-center mt-4 sm:mt-6 md:mt-8 px-20">
          <p className="text-xl sm:text-4xl text-white tracking-wide font-bold mr-4">
            Stunning royalty-free images & royalty-free stock
          </p>
        </div>

        {/* Categories (Explore, Images, etc.) */}
        <div className="flex flex-wrap justify-center gap-4 p-4">
          {categories.map((category) => (
            <button
              key={category}
              className={`px-4 py-2 rounded-lg text-sm font-semibold transition duration-200 mt-0 ${
                searchTerm === category ? "bg-white text-black rounded-full" : "bg-transparent text-white rounded-full hover:bg-gray-500 transition duration-300 "
              }`}
              onClick={() => handleCategoryClick(category)}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Search Bar */}
        <div className="flex relative justify-center flex-row mt-6 ">
          <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
        </div>

        {/* Custom Buttons for Categories (below Search Bar) */}
        <div className="relative mt-2 flex flex-wrap justify-center gap-4">
          {customCategories.map((categoryName) => (
            <button
              key={categoryName}
              onClick={() => handleCategoryClick(categoryName)}
                  className="w-16 h-8 text-xs sm:text-sm md:text-base lg:text-lg xl:text-xs text-white bg-gray-500 bg-opacity-70 backdrop-blur-md shadow-lg rounded-md border border-white hover:bg-white hover:text-black transition duration-300"
>
              {categoryName}
            </button>
          ))}
        </div>
      </div>

      {/* Content Section */}
      <div className="sm:px-5 px-1 mt-[80px]">
        <div id="Media-container" className="w-full">
          {isFetching ? (
            <Loading />
          ) : showVideos ? (
            <div className="relative z-20">
              <VideoComponent posts={posts} />
            </div>
          ) : showMusic ? (
            <MusicComponent tracks={musicTracks} />
          ) : showSoundEffects ? (
            <SoundEffectsComponent effects={soundEffects} />
          ) : showGIFs ? (
            <div className="relative z-20 flex flex-wrap justify-center gap-20 bg-white p-4 rounded-lg shadow-lg">
              {gifList.map((gif, index) => (
                <div key={index} className="w-full max-w-xs p-2 bg-white rounded-lg shadow-md flex flex-col sm:flex-row items-center sm:justify-between">
                  <img src={gif.src} alt={gif.title} className="w-32 h-auto rounded-md object-contain sm:mr-4" />
                  <a href={gif.src} download={gif.title + ".gif"}>
                    <button className="px-4 py-2 bg-blue-500 text-white text-sm font-semibold rounded-lg hover:bg-blue-600 transition duration-200">
                      Download
                    </button>
                  </a>
                </div>
              ))}
            </div>
          ) : (
            <div className="relative w-full py-10 md:py-16 mt-32 sm:mt-40 md:mt-52">
  {/* White Background */}
  <div className="absolute inset-0 bg-white bg-opacity-90 backdrop-blur-md rounded-lg shadow-lg"></div>

  {/* Responsive Header */}
  <div className="absolute top-2 left-2 right-2 sm:top-4 sm:left-4 sm:right-4 flex flex-col sm:flex-row sm:items-center justify-between z-20">
  {/* Responsive Text */}
  <div className="text-center sm:text-left text-[10px] xs:text-[12px] sm:text-sm md:text-base lg:text-lg text-black font-medium max-w-[95%] sm:max-w-none">
    Over 5.3 million+ high-quality stock images, videos, and music shared by our talented community.
  </div>

  {/* Responsive Buttons */}
  <div className="mt-2 sm:mt-0 flex flex-wrap justify-center sm:justify-end gap-2 sm:gap-3">
    {["Editor's Choice", "Latest", "Trending"].map((category) => (
      <button
        key={category}
        onClick={() => handleCategoryClick(category)}
        className="px-3 py-1 sm:px-4 sm:py-2 text-[9px] xs:text-[11px] sm:text-sm md:text-base font-medium bg-gray-200 text-black rounded-lg shadow-md hover:bg-gray-300 transition"
      >
        {category}
      </button>
    ))}
  </div>
</div>

<div className="absolute top-0 left-2 right-2 sm:top-2 sm:left-4 sm:right-4 flex flex-col sm:flex-row sm:items-center justify-between px-2 sm:px-3 md:px-10 z-20">
 </div> 
  {/* Responsive Text */}
  <div className="text-center sm:text-left text-[12px] xs:text-[14px] sm:text-sm md:text-base lg:text-lg !text-black font-black tracking-tight w-full sm:w-auto bg-white bg-opacity-80 p-2 rounded-md sm:bg-transparent">

    Over 5.3 million+ high-quality stock images, videos, and music shared by our talented community.
  </div>

  {/* Responsive Buttons */}
  <div className="mt-3 sm:mt-0 flex flex-wrap justify-center sm:justify-end gap-3 sm:gap-4 w-full sm:w-auto">
    {["Editor's Choice", "Latest", "Trending"].map((category) => (
      <button
        key={category}
        onClick={() => handleCategoryClick(category)}
        className="px-4 py-2 sm:px-5 sm:py-2 text-[12px] xs:text-[14px] sm:text-sm md:text-base font-medium bg-gray-200 text-black rounded-lg shadow-md hover:bg-gray-300 transition"
      >
        {category}
      </button>
    ))}
  </div>


{/* Post Section */}
<div className="relative z-100 flex flex-wrap justify-center gap-6 sm:gap-10 -mt-10 sm:-mt-16">

  {posts.length > 0 ? <MasonaryLayout posts={posts} /> : <p>Loading...</p>}
</div>
</div>

          )}
        </div>
      </div>
    </div>
  );
};

export default Home;
