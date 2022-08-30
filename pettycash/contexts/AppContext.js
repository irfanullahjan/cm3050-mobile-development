import { createContext, useContext, useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth, firestore } from "../firebase";
import { collection, onSnapshot } from "firebase/firestore";

const AppContext = createContext({});

export const useAppContext = () => useContext(AppContext);

export function AppContextProvider(props) {
  const [user, setUser] = useState();
  const [userTransactions, setUserTransactions] = useState(null);

  useEffect(() => {
    return onAuthStateChanged(auth, (user) => {
      console.log("onAuthStateChanged", user);
      user ? setUser(user) : setUser(null);
    });
  }, []);

  useEffect(() => {
    if (user) {
      return onSnapshot(
        collection(firestore, "users", user.uid, "transactions"),
        (snapshot) => {
          const transactions = snapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
          }));
          setUserTransactions(transactions);
        }
      );
    }
  }, [user]);

  return (
    <AppContext.Provider value={{ user, userTransactions }}>
      {props.children}
    </AppContext.Provider>
  );
}
