import { useContext } from "react";
import { useHistory, Redirect } from "react-router-dom";
import { AuthContext } from "./AuthContext";

import logo from "../assets/hospital-svgrepo-com.svg";

function Navbar() {
  const history = useHistory();
  const Auth = useContext(AuthContext);

  function loginButton() {
    history.push("/login");
  }

  function registerButton() {
    history.push("/register");
  }
  function logoutHandler(e){
    e.preventDefault();
    fetch("/user/logout", {
      method: "POST",
      mode: "cors",
      credentials: "include",
      headers: {
        "Content-Type": "text/plain",
      },
      body: "",
    })
      .then((res) => res.json())
      .then((res) => {
        Auth.removeRole()
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
    <Redirect to="/" />
  }
  
  return (
    <header>
      <nav className="navbar navbar-light bg-light">
        <div className="container-fluid">
          <a className="navbar-brand" href="/">
            <img
              src={logo}
              alt=""
              width="30"
              height="24"
              className="d-inline-block align-text-top me-2"
            />
            Compfest Hospital
          </a>
          {Auth.role !== 'Administrator' ? (
            <div>
              <button
                className="btn btn-outline-success me-2"
                type="button"
                onClick={loginButton}
              >
                Login
              </button>
              <button
                className="btn btn-outline-success me-2"
                type="button"
                onClick={registerButton}
              >
                Sign Up
              </button>
            </div>
          ) : (
            <div>
              <button
                className="btn btn-outline-success me-2"
                type="button"
                onClick={logoutHandler}
              >
                Sign Out
              </button>
            </div>
          )}
        </div>
      </nav>
    </header>
  );
}

export default Navbar;
