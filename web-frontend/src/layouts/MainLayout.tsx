import { Outlet } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";
import { Sidebar, SIDEBAR_WIDTH } from "../components/sidebar";
import { useIsMobile } from "../hooks/useIsMobile";
import { useSidebar } from "../contexts/SidebarContext";

const MainLayout = () => {
  const isMobile = useIsMobile();
  const { open } = useSidebar();
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <Sidebar />

      <main
        style={{
          flex: 1,
          marginLeft: !isMobile && open ? `${SIDEBAR_WIDTH}px` : 0,
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
