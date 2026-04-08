import React from 'react'
import { createContext } from 'react';
export const AuthDataContext = createContext();

function Authcontext({children}) 
{
  let serverUrl;

if (window.location.hostname === "localhost") {
  serverUrl = "http://localhost:8400";   // local backend
} else {
  serverUrl = "https://servicehub02.onrender.com"; // live backend
}
  console.log('server' ,serverUrl);
  
  let value ={
    serverUrl

  }
  return (
    
      <AuthDataContext.Provider value={value}>
       {children}
      </AuthDataContext.Provider>
    
  )
}

export default Authcontext