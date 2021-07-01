import { createContext } from "react";

export const AuthContext = createContext({
  role: "",
  name: "",
  addRole: () => {},
  removeRole: () => {},
});
