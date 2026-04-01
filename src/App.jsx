import { Route, Routes } from "react-router-dom";
import HomePage from "./Pages/HomePage";
import Navbar from "./Components/Layout/Navbar";
import Footer from "./Components/Layout/Footer";
import BlogPage from "./Pages/BlogPage";
import "react-loading-skeleton/dist/skeleton.css";
import StoryModal from "./Components/StoryComponents/StoryModel";
import AboutPage from "./Pages/AboutPage";
import FootballBlogPage from "./Pages/BlogPages/FootballBlogPage";
import CricketBlogPage from "./Pages/BlogPages/CricketBlogPage";
import VolleyballBlogPage from "./Pages/BlogPages/VolleyballBlogPage";
import OthersBlogsPage from "./Pages/BlogPages/OthersBlogsPage";
import Register from "./Components/AuthComponent/Register";
import Login from "./Components/AuthComponent/Login";
import BlogsDescription from "./Components/BlogComponents/Description/BlogDescription";

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/blogs" element={<BlogPage />} />
        <Route path="/blog/:id" element={<BlogsDescription />} />
        <Route path="/blogs/:id" element={<BlogsDescription />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/story" element={<StoryModal />} />
        <Route path="/football" element={<FootballBlogPage />} />
        <Route path="/cricket" element={<CricketBlogPage />} />
        <Route path="/volleyball" element={<VolleyballBlogPage />} />
        <Route path="/others" element={<OthersBlogsPage />} />

        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
      <Footer />
    </>
  );
}

export default App;
