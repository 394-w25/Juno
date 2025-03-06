import { createContext, useContext, } from "react";
import { useAuth } from "../firebase/AuthFunctions";
import { User } from "firebase/auth"
import { BusinessConfig } from "../firebase/FirestoreFunctions";

/**
 * @typedef {Object} AuthContextType
 * @property {User | null} user
 * @property {boolean} authLoading
 * @property {BusinessConfig | null} businessConfig
 * @property {React.Dispatch<React.SetStateAction<BusinessConfig | null>>} setBusinessConfig
 */

/** @type {AuthContextType} */
const AuthContext = createContext();

const AuthProvider = ({ children }) => {
	const { user, authLoading, businessConfig, setBusinessConfig } = useAuth()

    return (
      	<AuthContext.Provider value={{ user, authLoading, businessConfig, setBusinessConfig }}>
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
