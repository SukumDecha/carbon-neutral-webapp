import Button from "../../../shared/components/Button";
import { IState } from "../../../screens/AuthScreen";

interface IProps {
  setState: (state: IState) => void;
}
const RegisterModal = ({ setState }: IProps) => {
  const redirectToLogin = () => {
    setState("login");
  };

  return (
    <>
      <h1 className="-title">Register</h1>
      <div className="-auth-modal">
        <form>
          <label htmlFor="name">Username</label>
          <input name="name" placeholder="jonathan"></input>

          <label htmlFor="email">Email</label>
          <input name="email" placeholder="jonathan123@gmail.com"></input>

          <label htmlFor="password">Password</label>
          <input name="password" placeholder="password"></input>

          <Button htmlType="submit">Register</Button>
        </form>

        <div className="-footer">
          <p>Already have an account?</p>

          <Button htmlType="submit" primary={false} onClick={redirectToLogin}>
            Sign-in
          </Button>
        </div>
      </div>
    </>
  );
};

export default RegisterModal;
