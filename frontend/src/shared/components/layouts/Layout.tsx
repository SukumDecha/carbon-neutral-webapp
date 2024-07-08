import Header, { HeaderSetting } from "./Header";
import Footer from "./Footer";

import { Outlet, useLocation } from "react-router-dom";

const Layout = () => {
  const { pathname } = useLocation();

  return (
    <div
      style={{
        minHeight: "calc(100vh)",
        position: "relative",
      }}
    >
      {pathname === "/profile" || pathname === "/personal" ? <></> : <></>}
      {pathname === "/personal" || pathname === "/cart" ? (
        <HeaderSetting />
      ) : (
        <Header />
      )}

      <div
        style={{
          margin: "0 auto",
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
