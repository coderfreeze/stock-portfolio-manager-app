import React, { createContext, useContext, useState, useEffect } from 'react';

const UserContext = createContext<any>(null);

// Custom hook that allows any component to access the UserContext 
export const useUser = () => {
  return useContext(UserContext);
};


export const UserProvider = ({ children }: { children: React.ReactNode }) => {

  // User holds current user data (set to null at start because logged out)
  const [user, setUser] = useState<any>(null);

  // use "side code" when app is first loaded, if token (user) exists then it setUser(userData)
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      const userData = JSON.parse(atob(token.split('.')[1]));
      setUser(userData);
    }
  }, []);




  // When a user logs in, the JWT token is stored in localStorage (setUser(userData))
  const login = (token: string) => {
    localStorage.setItem("token", token);
    const userData = JSON.parse(atob(token.split('.')[1]));
    localStorage.setItem("userId", userData.userId);
    setUser(userData);
  };



  // When a user logs out, we remove the token and setUser(null)
  const logout = () => {
    localStorage.removeItem("token");
    setUser(null);
  };



  return (
    <UserContext.Provider value={{ user, login, logout }}>
      {children}
    </UserContext.Provider>
  );
};
