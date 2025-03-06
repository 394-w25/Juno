import { createContext, useContext } from "react";
import { useAuth } from "../firebase/AuthFunctions";

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
	const { user, authLoading } = useAuth()

    return (
      	<AuthContext.Provider value={{ user, authLoading }}>
        	{children}
      	</AuthContext.Provider>
    );
};

export const useAuthContext = () => useContext(AuthContext);

export default AuthProvider;
