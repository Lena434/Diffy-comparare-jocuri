import { Outlet } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";
import Sidebar from "../components/Sidebar";

const SIDEBAR_WIDTH = 220;

const MainLayout = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <Sidebar />

      <main
        style={{
          flex: 1,
          marginLeft: `${SIDEBAR_WIDTH}px`,
          transition: "margin-left 0.25s cubic-bezier(0.4,0,0.2,1)",
        }}
      >
        <Outlet />
      </main>

      <Footer />
    </div>
  );
};

export default MainLayout;
