import { createContext, useContext, useState } from "react";

const UserContext = createContext();

export function UserProvider({ children }) {
  const [user, setUser] = useState(null);
  const [scanHistory, setScanHistory] = useState([]);

  const addScan = (result) => {
    setScanHistory((prev) => [result, ...prev]);
  };

  return (
    <UserContext.Provider value={{ user, setUser, scanHistory, addScan }}>
      {children}
    </UserContext.Provider>
  );
}

export const useUser = () => useContext(UserContext);
