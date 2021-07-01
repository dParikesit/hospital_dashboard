import { useState, useEffect, useContext } from "react";
import { AuthContext } from "../components/AuthContext";
import { useHistory } from "react-router-dom";

function Admin() {
  const Auth = useContext(AuthContext);
  const history = useHistory();
  if (Auth.role !== "Administrator") {
    history.replace("/");
  }
  const [isOpen, setIsOpen] = useState(false);
  const [patientsList, setPatientsList] = useState([]);
  const [count, setCount] = useState(1);
  const [posts, setPosts] = useState([]);
  const [postMode, setPostMode] = useState("POST");
  const [registrant, setRegistrant] = useState([]);
  const [doctor, setDoctor] = useState("");
  const [description, setDescription] = useState("");
  const [id, setId] = useState(0);
  const [update, setUpdate] = useState(false);
  let postCount = -1;

  useEffect(() => {
    fetch("/user", {
      method: "GET",
      credentials: "include",
    })
      .then((res) => res.json())
      .then((res) => {
        let temp = [
          "Patient name",
          ...res.map((person) => person.firstName + " " + person.lastName),
        ];
        setPatientsList(temp);
      });
    fetch("/appointment", {
      method: "GET",
      credentials: "include",
    })
      .then((res) => res.json())
      .then((res) => {
        setPosts(res.result);
      })
      .catch((err) => {
        alert(err.message);
      });
  }, [update]);

  function changeUpdate() {
    if (update === true) {
      setUpdate(false);
    } else {
      setUpdate(true);
    }
  }

  const options = patientsList.map((patient) => {
    if (patient === "Patient name") {
      return (
        <option value={patient} key={patient} registrant disabled hidden>
          {patient}
        </option>
      );
    } else {
      return (
        <option value={patient} key={patient}>
          {patient}
        </option>
      );
    }
  });
  const selectCreator = () => {
    let item = [];
    for (let i = 0; i < count; i++) {
      if (i !== count - 1) {
        item.push(
          <div className="input-group mb-3">
            <select
              name="registrantSelection"
              id="registrant"
              className="form-select"
              value={registrant[i]}
              onChange={selectCapture}
            >
              {options}
            </select>
            <button
              type="button"
              className="btn btn-success"
              onClick={() => removeSelect(i)}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="currentColor"
                className="bi bi-dash"
                viewBox="0 0 16 16"
              >
                <path d="M4 8a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7A.5.5 0 0 1 4 8z" />
              </svg>
            </button>
          </div>
        );
      } else if (count == 5 && i == 4) {
        item.push(
          <div className="input-group mb-3">
            <select
              name="registrantSelection"
              id="registrant"
              className="form-select"
              value={
                registrant.length == count - 1 ? "Patient name" : registrant[i]
              }
              onChange={selectCapture}
            >
              {options}
            </select>
            <button
              type="button"
              className="btn btn-success"
              onClick={() => removeSelect(i)}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="currentColor"
                className="bi bi-dash"
                viewBox="0 0 16 16"
              >
                <path d="M4 8a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7A.5.5 0 0 1 4 8z" />
              </svg>
            </button>
          </div>
        );
      } else {
        item.push(
          <div className="input-group mb-3">
            <select
              name="registrantSelection"
              id="registrant"
              className="form-select"
              value={
                registrant.length == count - 1 ? "Patient name" : registrant[i]
              }
              onChange={selectCapture}
            >
              {options}
            </select>
            <button
              type="button"
              className="btn btn-success"
              onClick={addSelect}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="currentColor"
                className="bi bi-plus"
                viewBox="0 0 16 16"
              >
                <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z" />
              </svg>
            </button>
          </div>
        );
      }
    }
    return item.map((comp) => comp);
  };
  const submitHandler = (e) => {
    e.preventDefault();
    let post = {
      id: id,
      doctor: doctor,
      description: description,
      registrant: registrant,
    };
    fetch("/appointment", {
      method: postMode,
      credentials: "same-origin",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(post),
    })
      .then((res) => res.json())
      .then((res) => {
        alert(res.message);
        changeUpdate();
      })
      .catch((err) => {
        alert(err.message);
      });
    setPostMode("POST");
    setId(0);
    setCount(1);
    setDoctor("");
    setDescription("");
    setRegistrant([]);
  };
  const selectCapture = (e) => {
    if (registrant.includes(e.target.value)) {
      e.target.value = "Patient name";
    } else if (registrant.length == count) {
      let temp = [...registrant];
      temp.pop();
      setRegistrant([...temp, e.target.value]);
    } else {
      setRegistrant([...registrant, e.target.value]);
    }
  };
  const addSelect = () => {
    if (registrant.length == count) {
      setCount(count + 1);
    }
  };
  const removeSelect = (id) => {
    let temp = [...registrant];
    temp.splice(id, 1);
    setRegistrant(temp);
    setCount(count - 1);
  };
  const doctorHandler = (e) => {
    setDoctor(e.target.value);
  };
  const descriptionHandler = (e) => {
    setDescription(e.target.value);
  };
  function editButton(e) {
    e.preventDefault();
    const idPost = e.target.id;
    setPostMode("PUT");
    setId(posts[idPost]._id);
    setDoctor(posts[idPost].doctor);
    setDescription(posts[idPost].description);
    setCount(posts[idPost].registrant.length);
    setRegistrant(posts[idPost].registrant);
    setIsOpen(true);
  }
  function deleteButton(e) {
    e.preventDefault();
    const idPost = e.target.id;
    fetch("/appointment", {
      method: "DELETE",
      credentials: "same-origin",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id: posts[idPost]._id,
      }),
    })
      .then(() => {
        alert("Delete successful");
        changeUpdate();
      })
      .catch((err) => {
        alert("Delete error");
        console.log(err);
      });
  }

  function formViewHandler() {
    if (isOpen == false) {
      setIsOpen(true);
    } else {
      setPostMode("POST");
      setDoctor("");
      setDescription("");
      setCount(1);
      setRegistrant([]);
      setIsOpen(false);
    }
  }

  return (
    <div className="p-5 container-fluid">
      <button
        type="button"
        className="btn btn-primary"
        onClick={formViewHandler}
      >
        Create Appointment
      </button>
      <form
        className={`p-3 border border-primary mt-3 rounded ${
          isOpen ? "" : "d-none"
        }`}
      >
        <div className="mb-3">
          <label htmlFor="docName" className="form-label">
            Doctor name
          </label>
          <input
            type="text"
            className="form-control"
            id="docName"
            value={doctor}
            onInput={doctorHandler}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="description" className="form-label">
            Description
          </label>
          <input
            type="text"
            className="form-control"
            id="description"
            value={description}
            onInput={descriptionHandler}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="registrant">Registrant</label>
          {selectCreator()}
        </div>
        <button
          type="button"
          className="btn btn-success"
          onClick={submitHandler}
        >
          {postMode === "POST" ? "Submit" : "Edit"}
        </button>
      </form>
      <table className="table table-hover">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">Doctor</th>
            <th scope="col">Description</th>
            <th scope="col">Registrant</th>
            <th scope="col"></th>
            <th scope="col"></th>
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
                  <button
                    type="button"
                    className="btn btn-primary"
                    id={postCount}
                    onClick={editButton}
                  >
                    Edit
                  </button>
                </td>
                <td>
                  <button
                    type="button"
                    className="btn btn-danger"
                    id={postCount}
                    onClick={deleteButton}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

export default Admin;
