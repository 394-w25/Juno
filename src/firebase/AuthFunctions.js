import { onAuthStateChanged, signOut, User } from "firebase/auth"
import { useEffect, useState,  } from "react"
import { auth } from "./FirebaseConfig"
import { BusinessConfig, getBusinessConfig } from "./FirestoreFunctions"

export const useAuth = () => {
    /** @type {[User | null, React.Dispatch<React.SetStateAction<User | null>>]} */
    const [user, setUser] = useState(null)

    /** @type {[boolean, React.Dispatch<React.SetStateAction<boolean>>]} */
    const [authLoading, setAuthLoading] = useState(true)

    /** @type {[BusinessConfig | null, React.Dispatch<React.SetStateAction<BusinessConfig | null>>]} */
    const [businessConfig, setBusinessConfig] = useState(null)

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
            if (currentUser) { // user is logged in
                const config = await getBusinessConfig(currentUser.uid)
                setBusinessConfig(config)
                setUser(currentUser)                    
            } else { // user isn't logged in or has signed out
                setUser(null)
                setBusinessConfig(null)
            }

            setAuthLoading(false)
        })
        
        return () => unsubscribe()
    }, [])

    return { user, authLoading, businessConfig, setBusinessConfig }
}

export const logOut = async () => {
    await signOut(auth)
}