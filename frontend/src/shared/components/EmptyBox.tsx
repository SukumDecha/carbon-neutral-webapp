import { Button, Empty } from "antd";
import { ReactNode } from "react";
import { useNavigate } from "react-router-dom";

interface IProps {
  children?: ReactNode;
}

const EmptyBox = ({ children }: IProps) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate("/");
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#f0f0f0",
        borderRadius: "24px",
        padding: "24px",
        margin: "24px",
      }}
    >
      <Empty />
      {children}
      <Button onClick={handleClick}>Go back home</Button>
    </div>
  );
};

export default EmptyBox;