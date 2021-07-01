import { Link, useHistory } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../components/AuthContext";

import logo from "../assets/hospital-svgrepo-com.svg";

function Login() {
  const Auth = useContext(AuthContext)
  const history = useHistory()
  if(Auth.role){
    history.replace("/")
  }
  let userDetail = {
    userName: "",
    password: "",
  };

  const usernameHandler = (e) =>{
    userDetail.userName = e.target.value
  }
  const passwordHandler = (e) => {
    userDetail.password = e.target.value;
  };

  const submitHandler = (e) => {
    e.preventDefault();

    fetch("/user/login", {
      method: "POST",
      credentials: "same-origin",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userDetail),
    })
      .then((res) => res.json())
      .then((res) => {
        Auth.addRole(res.role, res.name);
        localStorage.setItem('expiry', res.expiry)
        if (Auth.role === "Patient") {
          history.push("/dashboard")
        } else if (Auth.role === "Administrator") {
          history.push("/admin")
        }
        
      });
  };

  return (
    <div className="container-fluid">
      <div className="d-flex flex-column align-items-center">
        <div className="p-4">
          <img src={logo} width="72" height="57" />
        </div>
        <form method="POST" onSubmit={submitHandler}>
          <div className="row mb-2">
            <div className="col">
              <label htmlFor="username" className="form-label">
                Username
              </label>
              <input id="username" type="text" className="form-control" autoComplete="on" onChange={usernameHandler}></input>
            </div>
          </div>
          <div className="row mb-4">
            <div className="col">
              <label htmlFor="password" className="form-label">
                Password
              </label>
              <input
                id="password"
                type="password"
                className="form-control"
                autoComplete="on"
                onChange={passwordHandler}
              ></input>
            </div>
          </div>
          <button className="btn btn-lg btn-primary w-100" type="submit">
            Sign in
          </button>
          <div className="text-center w-100">
            <p className="text-muted font-weight-bold">
              Don&apos;t have account? <Link to="/register">Sign Up</Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Login;
