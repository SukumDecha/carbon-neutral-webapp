import { ReactNode } from "react";

interface IProps {
  children: ReactNode;
  primary?: boolean;
  htmlType?: "button" | "reset" | "submit";
  onClick?: () => void;
}
const Button = ({
  children,
  htmlType = "button",
  primary = true,
  onClick,
}: IProps) => {
  return (
    <button
      className={`button -${primary ? "primary" : "secondary"}`}
      role="button"
      type={htmlType}
      onClick={onClick}
    >
      {children}
    </button>
  );
};

export default Button;
