import React from 'react'
import { createContext } from 'react';
export const AuthDataContext = createContext();

function Authcontext({children}) 
{
  let serverUrl = "http://localhost:8400";
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