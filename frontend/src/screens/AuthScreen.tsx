import LoginModal from "../features/auth/components/LoginModal";
import RegisterModal from "../features/auth/components/RegisterModal";

interface IProps {
  state: "login" | "register";
}

const AuthScreen = ({ state }: IProps) => {
  if (state === "login")
    return (
      <div className={`authScreen`}>
        <div className="-login">
          <img src="'./../../../../../public/login-bg.png" alt="login-bg" />
        </div>
        <LoginModal />
      </div>
    );

  return (
    <div className={`authScreen`}>
      <div className="-register">
        <img src="'./../../../../../public/register-bg.png" alt="register-bg" />
      </div>

      <RegisterModal />
    </div>
  );
};

export default AuthScreen;
