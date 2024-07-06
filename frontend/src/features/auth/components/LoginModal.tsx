const LoginModal = () => {
  return (
    <>
      <h1 className="-title">Login</h1>
      <div className="-login-modal">
        <form className="flex flex-col">
          <label htmlFor="email">Username or Email</label>
          <br />
          <input name="email" placeholder="Skibidi@gmail.com"></input>
          <br />
          <label htmlFor="password">Password</label>
          <br />
          <input name="password" placeholder="password"></input>
        </form>
      </div>
    </>
  );
};

export default LoginModal;
