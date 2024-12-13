import React, { createContext, useState, useContext } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  const login = (userData) => {
    setUser(userData); // Set user state
    localStorage.setItem("user", JSON.stringify(userData)); // Persist user in localStorage
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("user");
  };

  // On app load, restore user from localStorage
  React.useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// Hook to use Auth context
export const useAuth = () => useContext(AuthContext);
