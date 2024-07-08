import { ReactNode } from "react";

interface IProps {
  children: ReactNode;
  type?: "primary" | "secondary";
  htmlType?: "button" | "reset" | "submit";
  onClick?: () => void;
}
const Button = ({
  children,
  htmlType = "button",
  type = "primary",
  onClick,
}: IProps) => {
  return (
    <button
      className={`button -${type}`}
      role="button"
      type={htmlType}
      onClick={onClick}
    >
      {children}
    </button>
  );
};

export default Button;
