import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../firebase";

const AuthContext = createContext({});

export const useAuthContext = () => useContext(AuthContext);

export function AuthContextProvider(props) {
  const [user, setUser] = useState();

  useEffect(() => {
    return onAuthStateChanged(auth, (user) => {
      user ? setUser(user) : setUser(null);
    });
  }, []);

  // memo user
  const value = useMemo(() => ({ user }), [user]);

  return (
    <AuthContext.Provider value={value}>{props.children}</AuthContext.Provider>
  );
}
