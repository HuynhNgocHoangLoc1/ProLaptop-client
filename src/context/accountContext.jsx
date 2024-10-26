import { createContext, useState, useEffect, useMemo } from "react";
import axiosClient from "../api/axiosClient";

const AccountContext = createContext({});

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(() => localStorage.getItem('token') || null); // Lấy token từ localStorage
  const [account, setAccount] = useState(() => JSON.parse(localStorage.getItem('account')) || null); // Lấy account từ localStorage
  const providerValue = useMemo(
    () => ({ token, setToken, account, setAccount }),
    [token, setToken, account, setAccount]
  );

  useEffect(() => {
    if (token) {
      // Lưu token vào localStorage
      localStorage.setItem('token', token);

      // Set authenticate token to axios
      axiosClient.application.defaults.headers.common["Authorization"] = `Bearer ${token}`;

      // Gọi API để lấy thông tin tài khoản và lưu vào localStorage
      getAccountInfoFromToken(token).then((accountData) => {
        setAccount(accountData);
        localStorage.setItem('account', JSON.stringify(accountData));
      });
    } else {
      // User logout
      delete axiosClient.application.defaults.headers.common["Authorization"];
      localStorage.removeItem('token');
      localStorage.removeItem('account');
      setAccount(null); // Reset account
    }
  }, [token]);

  return (
    <AccountContext.Provider value={providerValue}>
      {children}
    </AccountContext.Provider>
  );
};

const getAccountInfoFromToken = async (token) => {
  // Gọi API để lấy thông tin tài khoản dựa trên token
  // Ví dụ: return await accountInfoAPI.getInfoByToken(token);
  return {}; // Thay thế bằng logic thực tế của bạn
};

export default AccountContext;
