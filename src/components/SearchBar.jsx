import React from "react";
import { IoMdSearch } from "react-icons/io";
import { useNavigate} from "react-router-dom";
const SearchBar = ({ searchTerm, setSearchTerm }) => {
  const navigate = useNavigate();

 

  return (
    <div className="flex justify-start items-center w-[300px] sm:h-14 sm:w-[500px] lg:w-[700px] lg:h-16 xl:w-[800px] xl:h-18 top-[-20px] px-2 bg-gray-700 bg-opacity-40 backdrop-blur-md rounded-full shadow-lg border-none outline-none focus-within:shadow-lg">

      <IoMdSearch fontSize={21} className="ml-1 text-white" />
      <form
        type="submit"
        onSubmit={(e) => {
          e.preventDefault();
          navigate(`/search/${searchTerm}`);
        }}
        className="flex items-center w-full"
      >
       <input
  type="text"
  onChange={(e) => setSearchTerm(e.target.value)}
  placeholder="Search free Images, Videos, Music & more"
  value={searchTerm}
  className="p-2 px-4 w-full text-white text-xs sm:text-sm md:text-base bg-transparent bg-opacity-20 backdrop-blur-md shadow-lg outline-none rounded-xl"
/>

      </form>
    </div>
  );
};

export default SearchBar;
