import { useContext, useState } from "react";
import { useHistory, NavLink } from "react-router-dom";
import { AuthContext } from "./AuthContext";

import logo from "../assets/hospital-svgrepo-com.svg";

function Navbar() {
  const history = useHistory();
  const Auth = useContext(AuthContext);
  const [isCollapse, setIsCollapse] = useState(true)

  function toggler (){
    if(isCollapse){
      setIsCollapse(false)
    } else{
      setIsCollapse(true)
    }
  }
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
      .then(() => {
        Auth.removeRole()
      })
      .catch((err) => {
        console.log(err);
      });
    history.push("/login");
  }

  const buttons = () => {
    if (Auth.role == "Patient") {
      return (
        <div
          className={`ml-auto navbar-collapse ${isCollapse ? "collapse" : ""}`}
          id="navbarSupportedContent"
        >
          <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <NavLink
                to="/dashboard"
                className="nav-link"
                activeClassName="nav-link active"
              >
                Dashboard
              </NavLink>
            </li>
          </ul>
          <button
            className="btn btn-outline-danger me-2"
            type="button"
            onClick={logoutHandler}
          >
            Sign Out
          </button>
        </div>
      );
    } else if (Auth.role == "Administrator") {
      return (
        <div className={`ml-auto navbar-collapse ${isCollapse ? 'collapse' : ''}`} id="navbarSupportedContent">
          <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <NavLink
                to="/admin"
                className="nav-link"
                activeClassName="nav-link active"
              >
                Dashboard
              </NavLink>
            </li>
          </ul>
          <button
            className="btn btn-outline-danger me-2"
            type="button"
            onClick={logoutHandler}
          >
            Sign Out
          </button>
        </div>
      );
    } else {
      return (
        <div
          className={`ml-auto navbar-collapse ${isCollapse ? "collapse" : ""}`}
          id="navbarSupportedContent"
        >
          <ul className="ms-auto">
          </ul>
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
      );
    }
  }
  return (
    <header>
      <nav className="navbar navbar-expand-lg navbar-light bg-light ml-auto">
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
          <button
            className="navbar-toggler"
            type="button"
            onClick={toggler}
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          {buttons()}
        </div>
      </nav>
    </header>
  );
}

export default Navbar;
