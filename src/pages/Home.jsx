import React, { useEffect, useState } from "react";
import fetchPost from "../apiCalls";
import Loading from "../components/Loading";
import MasonaryLayout from "../components/MasonaryLayout";
import SearchBar from "../components/SearchBar";
import VideoComponent from "../components/videocomponent";

// Categories for navigation
const categories = [
  "Explore", "Images", "Illustrations", "Vectors", "Videos", "Music", "Sound Effects", "GIFs"
];

// Correct paths for Music and Sound Effects
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
  <div className="flex flex-col items-center gap-4">
    {tracks.map((track, index) => (
      <div key={index} className="w-full max-w-md p-4 bg-white rounded-lg shadow-md">
        <p className="text-lg font-semibold mb-2">{track.title}</p>
        <audio controls className="w-full">
          <source src={track.src} type="audio/mp3" />
          Your browser does not support the audio element.
        </audio>
      </div>
    ))}
  </div>
);

// Component to handle Sound Effects
const SoundEffectsComponent = ({ effects }) => (
  <div className="flex flex-col items-center gap-4">
    {effects.map((effect, index) => (
      <div key={index} className="w-full max-w-md p-4 bg-white rounded-lg shadow-md">
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

  return (
    <div className="text-center text-2xl bg-gray-200 py-12 md:py-24 relative">
      {/* Blurred Background */}
      <div className="absolute top-0 left-0 w-full h-full z-0">
        <div
          className="w-full h-full"
          style={{
            backgroundImage: "url(https://images.pexels.com/photos/3327630/pexels-photo-3327630.jpeg)",
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundAttachment: "fixed",
            filter: "blur(8px)",
          }}
        ></div>
      </div>

      {/* Dark Overlay */}
      <div className="absolute top-0 left-0 w-full h-full bg-black opacity-5"></div>

      <div className="w-full bg-transparent relative z-10">
        <div className="flex flex-col sm:flex-row justify-center items-center mt-4 sm:mt-6 md:mt-8 px-20">
          <p className="text-xl sm:text-2xl text-white tracking-wide font-bold mr-4">
            Stunning royalty-free images & royalty-free stock
          </p>
        </div>

        {/* Categories */}
        <div className="flex flex-wrap justify-center gap-4 p-4">
          {categories.map((category) => (
            <button
              key={category}
              className={`px-4 py-2 rounded-lg text-sm font-semibold transition duration-200 ${
                searchTerm === category ? "bg-blue-500 text-white" : "bg-gray-300 text-gray-700"
              }`}
              onClick={() => setSearchTerm(category)}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Search Bar */}
        <div className="flex relative justify-center flex-row mt-6">
          <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
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
            <div className="relative z-20 flex flex-wrap justify-center gap-4 bg-white p-4 rounded-lg shadow-lg">
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
            <div className="flex flex-wrap justify-center gap-6">
              <MasonaryLayout posts={posts} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Home;

