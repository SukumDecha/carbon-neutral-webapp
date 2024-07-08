import { Spin } from "antd";
import { CSSProperties } from "react";

const Loading = () => {
  const styles: CSSProperties = {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  };
  return (
    <div className="loading" style={styles}>
      <Spin />
      <h1>Loading...</h1>
    </div>
  );
};

export default Loading;
