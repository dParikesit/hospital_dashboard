import { createContext } from "react";

export const AuthContext = createContext({
  role: "",
  addRole: () => {},
  removeRole: () => {},
});
