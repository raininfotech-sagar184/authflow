'use client';
import { fetchApi } from "@/utils/frondend";
import { deleteCookie, getCookie } from "cookies-next";
import { createContext, useContext, useState, useEffect } from "react";
const AuthContext = createContext({
  authTkn: 'init',
  setAuthTkn: (authTkn) => { },
  pageLoader: true,
  setPageLoader: (pageLoader) => { },
  loginUserData: {},
  setLoginUserdata: (loginUserData) => { },

}) 

export const AuthContextProvider = ({ children }) => {
  const [authTkn, setAuthTkn] = useState('init');
  const [pageLoader, setPageLoader] = useState(true);
  const [loginUserData, setLoginUserdata] = useState({});
  const getAuthData = async () => {
   
    const response = await fetchApi("/user-details", JSON.stringify({ a: 0 }))
    if (response.statusCode === 200) { 
      setLoginUserdata(response.data.data)
    } else {
      if (response.data.message == "Unauthorized") {
        setAuthTkn(response.data.message)
      }
    }
  }
  useEffect(() => {
    console.log("first20551")
    if (getCookie('vrfUsreuthTkN')) {
      getAuthData()
    }
  }, [])
  useEffect(() => {
    if (authTkn == 'Unauthorized') {
      // deleteCookie("vrfUsreuthTkN")
      // window.location.href = "/login"

    }
  }, [authTkn])
  return (
    <AuthContext.Provider value={{ authTkn, setAuthTkn, pageLoader, setPageLoader, loginUserData, setLoginUserdata }}>
      {children}
    </AuthContext.Provider>
  )
};

export const useAuthContext = () => useContext(AuthContext);