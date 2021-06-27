import "./App.css";
import { useState } from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import { AuthContext } from "./components/AuthContext";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Register from "./pages/Register";
import Login from "./pages/Login";

function App() {
  const [role, setRole] = useState(
    typeof window !== "undefined" ? localStorage.getItem("role") : ""
  );
  const addRole = (newRole) => {
    localStorage.setItem("role", newRole);
    setRole(newRole);
  };
  const removeRole = () => {
    localStorage.removeItem("role");
    setRole("");
  };
  return (
    <AuthContext.Provider value={{ role, addRole, removeRole }}>
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
        </Switch>
      </BrowserRouter>
    </AuthContext.Provider>
  );
}

export default App;
