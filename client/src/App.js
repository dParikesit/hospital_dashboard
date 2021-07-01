import "./App.css";
import { useState } from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import { AuthContext } from "./components/AuthContext";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Admin from "./pages/Admin";
import Dashboard from "./pages/Dashboard";

function App() {
  const [role, setRole] = useState(
    typeof window !== "undefined" ? localStorage.getItem("role") : ""
  );
  const [name, setName] = useState(
    typeof window !== "undefined" ? localStorage.getItem("name") : ""
  );

  const addRole = (newRole, newName) => {
    localStorage.setItem("role", newRole);
    localStorage.setItem("name", newName);
    setRole(newRole);
    setName(newName);
  };
  const removeRole = () => {
    localStorage.removeItem("role");
    localStorage.removeItem("name");
    setRole("");
    setName("");
  };

  return (
    <AuthContext.Provider value={{ role, name, addRole, removeRole }}>
      <BrowserRouter>
        <Navbar />
        <Switch>
          <Route exact path="/">
            <Home />
          </Route>
          <Route path="/register">
            <Register />
          </Route>
          <Route path="/login">
            <Login />
          </Route>
          <Route path="/admin">
            <Admin />
          </Route>
          <Route path="/dashboard">
            <Dashboard />
          </Route>
        </Switch>
      </BrowserRouter>
    </AuthContext.Provider>
  );
}

export default App;
