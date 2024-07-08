import Header from "./Header";
import Footer from "./Footer";

import { Outlet } from "react-router-dom";
import { Toaster } from "react-hot-toast";

const Layout = () => {
  return (
    <div
      style={{
        position: "relative",
      }}
    >
      <Toaster />
      <Header />
      <div
        style={{
          minHeight: "calc(100vh)",
          margin: "0 auto",
          paddingBottom: "32px",
          zIndex: 0,
        }}
      >
        <Outlet />
      </div>
      <Footer />
    </div>
  );
};

export default Layout;
