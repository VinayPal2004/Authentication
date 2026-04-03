import React from 'react'
import { createContext } from 'react';
export const AuthDataContext = createContext();

function Authcontext({children}) 
{
  let serverUrl = "https://servicehub02.onrender.com";
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