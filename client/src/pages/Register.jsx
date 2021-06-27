import { Link, Redirect } from "react-router-dom";

import logo from "../assets/hospital-svgrepo-com.svg";

function Register() {
  const submitHandler = (e) => {
    e.preventDefault();
    let userDetail = {}
    userDetail.firstName = document.getElementById("firstName").value;
    userDetail.lastName = document.getElementById("lastName").value;
    userDetail.email = document.getElementById("email").value;
    userDetail.age = document.getElementById("age").value;
    userDetail.userName = document.getElementById("username").value;
    userDetail.password = document.getElementById("password").value;
    fetch("/user/register", {
      method: "POST",
      mode: "cors",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userDetail),
    })
      .then((res) => res.json())
      .then((res) => {
        console.log(res.message);
        <Redirect to="/login" />
      })
      .catch((error) => console.log(error));
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
              <label htmlFor="firstName" className="form-label">
                First Name
              </label>
              <input
                id="firstName"
                type="text"
                className="form-control"
              ></input>
            </div>
            <div className="col">
              <label htmlFor="lastName" className="form-label">
                Last Name
              </label>
              <input id="lastName" type="text" className="form-control"></input>
            </div>
          </div>
          <div className="row mb-2">
            <div className="col">
              <label htmlFor="age" className="form-label">
                Age
              </label>
              <input id="age" type="number" className="form-control"></input>
            </div>
          </div>
          <div className="row mb-2">
            <div className="col">
              <label htmlFor="email" className="form-label">
                Email
              </label>
              <input id="email" type="email" className="form-control"></input>
            </div>
          </div>
          <div className="row mb-2">
            <div className="col">
              <label htmlFor="username" className="form-label">
                Username
              </label>
              <input id="username" type="text" className="form-control"></input>
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
              ></input>
            </div>
          </div>
          <button className="btn btn-lg btn-primary w-100" type="submit">
            Sign Up
          </button>
          <div className="text-center w-100">
            <p className="text-muted font-weight-bold">
              Already registered? <Link to="/login">Login</Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Register;
