import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Search from "./pages/Search";
import Login from "./pages/Login";
import VideoComponent from "./components/videocomponent";  // Update the import path
 // Import VideoComponent
import "./App.css";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/search/:keyword" element={<Search />} />
        <Route path="/login" element={<Login />} />
        <Route path="/video" element={<VideoComponent />} /> {/* Add Video route */}
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default App;

