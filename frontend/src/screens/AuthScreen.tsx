import LoginModal from "../features/auth/components/LoginModal";
import RegisterModal from "../features/auth/components/RegisterModal";

interface IProps {
  state: "login" | "register";
}

const AuthScreen = ({ state }: IProps) => {
  return (
    <div className={`authScreen`}>
      {state === "login" ? (
        <div className="-login">
          <img src="'./../../../../../public/login-bg.png" alt="login-bg" />
        </div>
      ) : (
        <div className="-register"></div>
      )}
      {state === "login" ? <LoginModal /> : <RegisterModal />}
    </div>
  );
};

export default AuthScreen;
