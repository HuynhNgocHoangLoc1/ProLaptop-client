import { createContext, useState, useEffect, useMemo } from "react";
import axiosClient from "../api/axiosClient";

const AccountContext = createContext({});

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(null);
  const [account, setAccount] = useState(null);

  const providerValue = useMemo(
    () => ({ token, setToken, account, setAccount }),
    [token, setToken, account, setAccount]
  );

  useEffect(() => {
    if (token !== "null") {
      // Set authenticate token to axios
      axiosClient.application.defaults.headers.common["Authorization"] =
        `Bearer ${token}`;
    } else {
      // User logout
      delete axiosClient.application.defaults.headers.common["Authorization"];
    }
  }, [token]);

  return (
    <AccountContext.Provider value={providerValue}>
      {children}
    </AccountContext.Provider>
  );
};

export default AccountContext;
