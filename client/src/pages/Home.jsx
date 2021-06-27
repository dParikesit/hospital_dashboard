import image from "../assets/medical.svg";

function Home() {
  return (
    <main>
      <div className="d-flex align-items-center mw-100">
        <div className="container-fluid p-5 h1 d-flex flex-column align-items-center h-50 w-50">
          <p>Selamat datang di Compfest Hospital</p>
          <p>Silahkan login untuk mengakses fitur situs</p>
          <button className="btn btn-outline-success me-2 btn-lg" type="button">
            Login
          </button>
        </div>
        <div className="w-50">
          <img src={image} alt="Freepik Medical Image" className="w-100" />
          <a href="https://www.freepik.com/free-photos-vectors/medical"></a>
        </div>
      </div>
    </main>
  );
}

export default Home;
