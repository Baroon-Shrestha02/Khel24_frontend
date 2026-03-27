import { Route, Routes } from "react-router-dom";
import HomePage from "./Pages/HomePage";
import Navbar from "./Components/Layout/Navbar";
import Footer from "./Components/Layout/Footer";
import BlogPage from "./Pages/BlogPage";
import "react-loading-skeleton/dist/skeleton.css";
import BlogDescription from "./Components/SharedComponents/BlogDescription";

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/blogs" element={<BlogPage />} />
        <Route path="/blog-description" element={<BlogDescription />} />
      </Routes>
      <Footer />
    </>
  );
}

export default App;
