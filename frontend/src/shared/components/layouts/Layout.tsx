import Header, { HeaderSetting } from "./Header";
import Footer from "./Footer";

import { Outlet, useLocation } from "react-router-dom";

const Layout = () => {
  const { pathname } = useLocation();
  
  
  return (
    <div
      style={{
        position: "relative",
      }}
    >
      {
         pathname === "/profile" || pathname === "/personal" ? <></> : <></>
      }
      {
         pathname === "/personal" || "/cart" ? <HeaderSetting/> : <Header/>
      }
      
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
