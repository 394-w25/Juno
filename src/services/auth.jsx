import React, { useEffect, useState, createContext, useContext } from "react";
import { getAuth, onAuthStateChanged, signOut } from "firebase/auth";
import { getBusinessConfig } from "../firebase/FirestoreFunctions";

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [businessConfig, setBusinessConfig] = useState(null)
  const [authLoading, setAuthLoading] = useState(true);
  const auth = getAuth();

  const logOut = async () => {
    await signOut(auth)
  }

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      if (currentUser) { // user is logged in
        const config = await getBusinessConfig(currentUser.uid); // checks if the user's business config has been created
        setUser(currentUser)

        if (config !== null) {
          setBusinessConfig(config)
        }
        else {
          setBusinessConfig(null)
        }
      } else { // user isn't logged in or has signed out
        setUser(null);
        setBusinessConfig(null)
      }

      setAuthLoading(false);
    });

    return () => unsubscribe();
  }, [auth]);

  return (
    <AuthContext.Provider value={{ logOut, businessConfig, user, setUser, authLoading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);

export default AuthProvider;
