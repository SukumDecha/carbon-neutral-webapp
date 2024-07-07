import Header from "./Header";
import Footer from "./Footer";

import { Outlet } from "react-router-dom";

const AuthLayout = () => {
  return (
    <div
      style={{
        position: "relative",
      }}
    >
      <Header />
      <div
        style={{
          minHeight: "100vh",
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

export default AuthLayout;
