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
import ScrollToTop from "./Utils/ScrollToTop";
import { Toaster } from "react-hot-toast";
import NotFound from "./Utils/NotFound";
import Dashboard from "./Pages/Dashboard";
import ProtectedRoutes from "./Routes/ProtectedRoutes";
import PublicRoute from "./Routes/PublicRoutes";
import DashBlogs from "./Components/AdminDashboard/BlogDashboard/DashBlogs";
import DashStories from "./Components/AdminDashboard/DashStories/DashStories";
import DashUsers from "./Components/AdminDashboard/DashUsers/DashUsers";
import DashCards from "./Components/AdminDashboard/DashMain/DashCards";
import BlogBrowse from "./Components/BlogComponents/Components/BlogsBrowse";

function App() {
  return (
    <>
      <Toaster position="top-center" />
      <ScrollToTop />

      <Routes>
        <Route element={<PublicRoute />}>
          {/* <Route path="/" element={<HomePage />} /> */}
          <Route path="/" element={<BlogPage />} />
          <Route path="/browse" element={<BlogBrowse />} />
          <Route path="/blog/:id" element={<BlogsDescription />} />
          <Route path="/blogs/:id" element={<BlogsDescription />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/story" element={<StoryModal />} />
          <Route path="/football" element={<FootballBlogPage />} />
          <Route path="/cricket" element={<CricketBlogPage />} />
          <Route path="/volleyball" element={<VolleyballBlogPage />} />
          <Route path="/others" element={<OthersBlogsPage />} />
        </Route>

        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        <Route element={<ProtectedRoutes />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/dashboard-blogs" element={<DashBlogs />} />
          <Route path="/dashboard-stories" element={<DashStories />} />
          <Route path="/dashboard-users" element={<DashUsers />} />
          <Route path="/dashboard" element={<Dashboard />} />
        </Route>

        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
}

export default App;
