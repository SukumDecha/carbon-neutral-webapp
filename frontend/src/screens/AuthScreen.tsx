import { useState } from "react";
import LoginModal from "../features/auth/components/LoginModal";
import RegisterModal from "../features/auth/components/RegisterModal";

export type IState = "login" | "register";

const AuthScreen = () => {
  const [state, setState] = useState<IState>("login");

  return (
    <div className={`authScreen`}>
      {state === "login" ? (
        <div className="-login">
          <img src="'./../../../../../public/login-bg.png" alt="login-bg" />
        </div>
      ) : (
        <div className="-register"></div>
      )}
      {state === "login" && <LoginModal setState={setState} />}
      {state === "register" && <RegisterModal setState={setState} />}
    </div>
  );
};

export default AuthScreen;
