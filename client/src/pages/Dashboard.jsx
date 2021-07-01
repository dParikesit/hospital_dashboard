import { useState, useEffect, useContext } from "react";
import { AuthContext } from "../components/AuthContext";
import { useHistory } from "react-router-dom";

function Dashboard() {
  const Auth = useContext(AuthContext);
  const history = useHistory();
  if (Auth.role !== "Patient") {
    history.replace("/");
  }

  const [posts, setPosts] = useState([]);
  const [registeredIn, setRegisteredIn] = useState([]);
  const [update, setUpdate] = useState(false);
  let postCount = -1;

  useEffect(() => {
    fetch("/appointment", {
      method: "GET",
      credentials: "include",
    })
      .then((res) => res.json())
      .then((res) => {
        const regFound = res.result.filter((post) =>
          post.registrant.includes(Auth.name)
        );
        const index = regFound.map((temp) =>
          res.result.findIndex((item) => item === temp)
        );
        setRegisteredIn(index);
        setPosts(res.result);
      })
      .catch((err) => {
        alert(err.message);
      });
  }, [update, Auth.name]);

  function changeUpdate() {
    if (update === true) {
      setUpdate(false);
    } else {
      setUpdate(true);
    }
  }
  function cancelButton(e) {
    e.preventDefault();
    const id = e.target.id;
    let { registrant } = posts[id];
    const index = registrant.indexOf(Auth.name);
    registrant.splice(index, 1);
    const body = {
      id: posts[id]._id,
      doctor: posts[id].doctor,
      description: posts[id].description,
      registrant: registrant,
    };
    submitHandler(body);
  }
  function applyButton(e) {
    e.preventDefault();
    const id = e.target.id;
    let { registrant } = posts[id];
    registrant = [...registrant, Auth.name];
    const body = {
      id: posts[id]._id,
      doctor: posts[id].doctor,
      description: posts[id].description,
      registrant: registrant,
    };
    submitHandler(body);
  }
  function submitHandler(body) {
    fetch("/appointment", {
      method: "PUT",
      credentials: "same-origin",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    })
      .then((res) => res.json())
      .then((res) => {
        alert(res.message);
        changeUpdate();
      })
      .catch((err) => {
        alert(err.message);
      });
  }
  return (
    <div className="p-5 container-fluid">
      <table className="table table-hover">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">Doctor</th>
            <th scope="col">Description</th>
            <th scope="col">Registrant</th>
            <th scope="col">Button</th>
          </tr>
        </thead>
        <tbody>
          {posts.map((post) => {
            postCount += 1;
            return (
              <tr key={postCount}>
                <th scope="row">{postCount + 1}</th>
                <td>{post.doctor}</td>
                <td>
                  <p className="text-wrap">{post.description}</p>
                </td>
                <td>
                  <ul>
                    {post.registrant.map((reg) => {
                      return <li key={reg}>{reg}</li>;
                    })}
                  </ul>
                </td>
                <td>
                  {registeredIn.includes(postCount) ? (
                    <button
                      type="button"
                      className="btn btn-danger"
                      onClick={cancelButton}
                      id={postCount}
                    >
                      Cancel
                    </button>
                  ) : post.registrant.length === 5 ? (
                    <button
                      type="button"
                      className="btn btn-secondary"
                      disabled
                    >
                      Full
                    </button>
                  ) : (
                    <button
                      type="button"
                      className="btn btn-primary"
                      onClick={applyButton}
                      id={postCount}
                    >
                      Apply
                    </button>
                  )}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

export default Dashboard;
