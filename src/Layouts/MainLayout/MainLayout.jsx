import { Outlet } from "react-router-dom";
import Footer from "../../Shared/Footer/Footer";
import Navbar from "../../Shared/Navbar/Navbar";

const MainLayout = () => {
  return (
    <>
      <div className="flex flex-col min-h-screen dark:bg-[#000] dark:text-white transition-colors duration-1000">
        <Navbar />
        <div className="flex-grow pt-32 lg:pt-40">
          <Outlet />
        </div>
      </div>
      <Footer />
    </>
  );
};

export default MainLayout;
