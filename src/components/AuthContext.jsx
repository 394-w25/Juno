import { createContext, useContext, useEffect, useState } from "react";
import { useAuth } from "../firebase/AuthFunctions";
import { BusinessConfig } from "../firebase/FirestoreFunctions";
import { ChatSession } from "@google/generative-ai";

/**
 * @typedef {Object} AuthContextType
 * @property {import("firebase/auth").User | null} user
 * @property {boolean} authLoading
 * @property {BusinessConfig | null} businessConfig
 * @property {React.Dispatch<React.SetStateAction<BusinessConfig | null>>} setBusinessConfig
 * @property {boolean} isGuest
 * @property {React.Dispatch<React.SetStateAction<boolean>>} setIsGuest
 * @property {ChatSession | null} chatSession
 * @property {React.Dispatch<React.SetStateAction<ChatSession | null>>} setChatSession
 */

/** @type {AuthContextType} */
const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const { user, authLoading, businessConfig, setBusinessConfig, isGuest, setIsGuest } = useAuth();

  /** @type {[ChatSession | null, React.Dispatch<React.SetStateAction<ChatSession | null>>]} */
  const [chatSession, setChatSession] = useState(null);

  const [uploadedImage, setUploadedImage] = useState(null);
  useEffect(() => {
    if (!isGuest && user === null) { // clears the chatSession if signed out
      setChatSession(null)
    }
  }, [isGuest, user])

  return (
    <AuthContext.Provider
      value={{ user, authLoading, businessConfig, setBusinessConfig, isGuest, setIsGuest, chatSession, setChatSession, uploadedImage, setUploadedImage }}
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
