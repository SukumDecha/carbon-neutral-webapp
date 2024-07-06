import Button from "../../../shared/components/Button";

const LoginModal = () => {
  return (
    <>
      <h1 className="-title">Login</h1>
      <div className="-login-modal">
        <form>
          <label htmlFor="email">Username or Email</label>
          <input name="email" placeholder="Skibidi@gmail.com"></input>

          <label htmlFor="password">Password</label>
          <input name="password" placeholder="password"></input>

          <Button htmlType="submit">Login</Button>
        </form>
      </div>
    </>
  );
};

export default LoginModal;
