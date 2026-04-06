import { Outlet } from "react-router-dom";

import Footer from "../Components/Layout/Footer";
import Navbar from "../Components/Layout/Navbar";

export default function PublicRoute() {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <div className="grow">
        <Outlet />
      </div>
      <Footer />
    </div>
  );
}
