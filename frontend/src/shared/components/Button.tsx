import { ReactNode } from "react";

interface IProps {
  children: ReactNode;
  htmlType?: "button" | "reset" | "submit";
}
const Button = ({ children, htmlType }: IProps) => {
  return (
    <button className="button-90" role="button" type={htmlType}>
      {children}
    </button>
  );
};

export default Button;
