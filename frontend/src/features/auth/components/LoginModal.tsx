import { useNavigate } from "react-router-dom";
import Button from "../../../shared/components/Button";
import { ArrowRight } from "lucide-react";

const LoginModal = () => {
  const navigate = useNavigate();

  const redirectToRegister = () => {
    navigate("/auth/register");
  };
  return (
    <>
      <h1 className="-title">Login</h1>
      <div className="-auth-modal">
        <form>
          <label htmlFor="email">Username or Email</label>
          <input name="email" placeholder="Skibidi@gmail.com"></input>

          <label htmlFor="password">Password</label>
          <input name="password" placeholder="password"></input>

          <Button htmlType="submit">
            Login
            <div className="-icon">
              <ArrowRight />
            </div>
          </Button>
        </form>

        <div className="-footer">
          <p>Don't have an acco  unt?</p>

          <Button
            htmlType="submit"
            primary={false}
            onClick={redirectToRegister}
          >
            Sign-Up
            <div className="-icon">
              <ArrowRight />
            </div>
          </Button>
        </div>
      </div>
    </>
  );
};

export default LoginModal;
