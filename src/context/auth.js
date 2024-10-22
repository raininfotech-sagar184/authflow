'use client';
import { createContext, useContext, useState, useEffect } from "react";
const AuthContext = createContext({
  authTkn: 'init',
  setAuthTkn: (authTkn) => { },
  pageLoader: true,
  setPageLoader: (pageLoader) => { }
}) 

export const AuthContextProvider = ({ children }) => {
  const [authTkn, setAuthTkn] = useState('init');
  const [pageLoader, setPageLoader] = useState(true);

  // useEffect(() => {
  //   async function fn() {
  //     await signOut({ redirect: false, callbackUrl: '/' + process.env.ADMFLDR })
  //   }
  //   if (authTkn == 'Unauthorized') {
  //     fn() 
  //   }
  // }, [authTkn])
  return (
    <AuthContext.Provider value={{ authTkn, setAuthTkn, pageLoader, setPageLoader }}>
      {children}
    </AuthContext.Provider>
  )
};

export const useAuthContext = () => useContext(AuthContext);