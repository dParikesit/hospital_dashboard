import { createContext } from "react";

// Context API creation
export const AuthContext = createContext({
  role: "",
  name: "",
  addRole: () => {},
  removeRole: () => {},
});
