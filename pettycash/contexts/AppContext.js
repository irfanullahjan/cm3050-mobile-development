import { createContext, useEffect, useState } from "react";
import { firestore } from "../firebase";

export const AppContext = createContext({});

export function AppContextProvider(props) {
  const [user, setUser] = useState(null);
  const [userTransactions, setUserTransactions] = useState(null);

  useEffect(() => {
    if (user) {
      let unsubscribe = firestore
        .collection("users")
        .doc(user.uid)
        .collection("transactions")
        .orderBy("createdAt", "asc")
        .onSnapshot((snapshot) => {
          const transactions = snapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
          }));
          setUserTransactions(transactions);
        });
      return () => unsubscribe();
    }
  }, [user]);

  return (
    <AppContext.Provider value={{ user, setUser, userTransactions }}>
      {props.children}
    </AppContext.Provider>
  );
}