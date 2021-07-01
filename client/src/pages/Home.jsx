
import image from "../assets/medical.svg";
import { useHistory } from "react-router-dom";
import { AuthContext } from "../components/AuthContext";
import { useContext } from "react";

function Home() {
  const history = useHistory();
  const Auth = useContext(AuthContext)
  const now = new Date(Date.now());
  localStorage.getItem('expiry') < now ? Auth.removeRole() : ""
  console.log(Auth.role)
  function loginButton() {
    history.push("/login");
  }
  return (
    <main>
      <div className="d-flex align-items-center justify-content-start">
        <div className="container-fluid p-5 h1 d-flex flex-column align-items-center h-50 w-100 text-center">
          <p>Selamat datang di Compfest Hospital</p>
          {Auth.role ? (
            ""
          ) : (
            <button
              className="btn btn-outline-success me-2 btn-lg"
              type="button"
              onClick={loginButton}
            >
              Login
            </button>
          )}
        </div>
        <div className="w-100 d-none d-md-block">
          <img src={image} alt="Freepik Medical Image" className="w-100"/>
          <a href="https://www.freepik.com/free-photos-vectors/medical"></a>
        </div>
      </div>
    </main>
  );
}

export default Home;
