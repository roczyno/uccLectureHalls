import "./login.scss";


const Login = () => {
  const handleSubmit = () => {};
  return (
    <div className="login">
      <span className="loginTitle">
        Welcome, login to select a lecture hall
      </span>
      <form className="loginForm" onSubmit={handleSubmit}>
        <label>Username</label>
        <input
          type="text"
          className="loginInput"
          placeholder="Enter your username..."
          //   ref={userRef}
        />
        <label>Password</label>
        <input
          type="password"
          className="loginInput"
          placeholder="Enter your password..."
          //   ref={passwordRef}
        />
        <button className="loginButton" type="submit">
          Login
        </button>
      </form>
    </div>
  );
};

export default Login;
