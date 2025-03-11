import { onAuthStateChanged, signOut } from "firebase/auth";
import { useEffect, useState } from "react";
import { auth } from "./FirebaseConfig";
import { BusinessConfig, getBusinessConfig } from "./FirestoreFunctions";
import { useNavigate } from "react-router-dom";

export function updateIsGuest(isGuest) {
  localStorage.setItem("isGuest", JSON.stringify(isGuest))
}

export function getLocalBusinessConfig() {
  const jsonObject = JSON.parse(localStorage.getItem("business_config"))

  if (jsonObject === null) {
    return null;
  }

  return new BusinessConfig(
    jsonObject.name,
    jsonObject.address,
    jsonObject.business_type,
    jsonObject.phone,
    jsonObject.industry,
    jsonObject.web_url
  )
}

export function setLocalBusinessConfig(businessConfig) {
  localStorage.setItem("business_config", JSON.stringify(businessConfig))
}

export const useAuth = () => {
  /** @type {[import("firebase/auth").User | null, React.Dispatch<React.SetStateAction<import("firebase/auth").User | null>>]} */
  const [user, setUser] = useState(null);

  /** @type {[boolean, React.Dispatch<React.SetStateAction<boolean>>]} */
  const [authLoading, setAuthLoading] = useState(true);

  /** @type {[BusinessConfig | null, React.Dispatch<React.SetStateAction<BusinessConfig | null>>]} */
  const [businessConfig, setBusinessConfig] = useState(null);

  /** @type {[boolean, React.Dispatch<React.SetStateAction<boolean>>]} */
  const [isGuest, setIsGuest] = useState(() => {
    return JSON.parse(localStorage.getItem("isGuest")) || false
  })

  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      if (currentUser) {
        // user is logged in
        const config = await getBusinessConfig(currentUser.uid);
        setBusinessConfig(config);
        setUser(currentUser);
        if (!config) {
          navigate("/operator");
        }
      } else {
        // user isn't logged in or has signed out
        setUser(null);

        if (isGuest) {
          setBusinessConfig(getLocalBusinessConfig())
        }
        else {
          setBusinessConfig(null);
        }
      }

      setAuthLoading(false);
    });

    return () => unsubscribe();
  }, []);

  return { user, authLoading, businessConfig, setBusinessConfig, isGuest, setIsGuest };
};

export const logOut = async () => {
  await signOut(auth);
};
