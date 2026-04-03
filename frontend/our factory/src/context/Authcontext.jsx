import React from 'react'
import { createContext } from 'react';
export const AuthDataContext = createContext();

function Authcontext({children}) 
{
  let serverUrl = import.meta.env.VITE_API_URL;
   console.log("Server URL:", serverUrl);
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