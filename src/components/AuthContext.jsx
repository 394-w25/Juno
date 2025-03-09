import { createContext, useContext, useState } from "react";
import { useAuth } from "../firebase/AuthFunctions";
import { BusinessConfig } from "../firebase/FirestoreFunctions";

/**
 * @typedef {Object} AuthContextType
 * @property {import("firebase/auth").User | null} user
 * @property {boolean} authLoading
 * @property {BusinessConfig | null} businessConfig
 * @property {React.Dispatch<React.SetStateAction<BusinessConfig | null>>} setBusinessConfig
 * @property {boolean} isGuest
 * @property {React.Dispatch<React.SetStateAction<boolean>>} setIsGuest
 */

/** @type {AuthContextType} */
const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const { user, authLoading, businessConfig, setBusinessConfig } = useAuth();

  /** @type {[boolean, React.Dispatch<React.SetStateAction<boolean>>]} */
  const [isGuest, setIsGuest] = useState(() => {
    return JSON.parse(localStorage.getItem("isGuest")) || false
  })

  return (
    <AuthContext.Provider
      value={{ user, authLoading, businessConfig, setBusinessConfig, isGuest, setIsGuest }}
    >
      {children}
    </AuthContext.Provider>
  );
};

/**
 *
 * @returns {AuthContextType}
 */
export function useAuthContext() {
  return useContext(AuthContext);
}

export default AuthProvider;
