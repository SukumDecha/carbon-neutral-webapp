import Header, { HeaderSetting } from "./Header";
import Footer from "./Footer";

import { Outlet, useLocation } from "react-router-dom";

const Layout = () => {
  const { pathname } = useLocation();

  const renderHeader = () => {
    if (pathname === "/profile") {
      return null;
    } else if (
      pathname === "/cart" ||
      pathname.startsWith("/product") ||
      pathname === "/history" ||
      pathname.startsWith("/blogs") ||
      pathname.endsWith("/statistic") ||
      pathname === "/exchange" ||
      pathname === "/tracker"
    ) {
      return <HeaderSetting />;
    } else {
      return <Header />;
    }
  };

  return (
    <div
      style={{
        minHeight: "calc(100vh)",
        position: "relative",
      }}
    >
      {renderHeader()}
      <div
        style={{
          margin: "auto auto",
          paddingBottom: "64px",
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
