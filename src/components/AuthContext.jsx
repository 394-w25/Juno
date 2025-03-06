import { createContext, useContext, useState } from "react";
import { useAuth } from "../firebase/AuthFunctions";

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
	const { user, authLoading, businessConfig, setBusinessConfig } = useAuth()

    return (
      	<AuthContext.Provider value={{ user, authLoading, businessConfig, setBusinessConfig }}>
        	{children}
      	</AuthContext.Provider>
    );
};

export const useAuthContext = () => useContext(AuthContext);

export default AuthProvider;
