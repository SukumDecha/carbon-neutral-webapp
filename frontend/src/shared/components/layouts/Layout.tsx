import Header from "./Header";
import Footer from "./Footer";

import { Outlet } from "react-router-dom";

const Layout = () => {
  return (
    <div
      style={{
        position: "relative",
        border: "4px solid red",
      }}
    >
      <Header />
      <div
        style={{
          minHeight: "calc(100vh - 100px)",
        }}
      >
        <Outlet />
      </div>
      <Footer />
    </div>
  );
};

export default Layout;
