import { Route, Routes } from "react-router-dom";
import HomePage from "./Pages/HomePage";
import Navbar from "./Components/Layout/Navbar";
import Footer from "./Components/Layout/Footer";
import BlogPage from "./Pages/BlogPage";

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/blogs" element={<BlogPage />} />
      </Routes>
      <Footer />
    </>
  );
}

export default App;
