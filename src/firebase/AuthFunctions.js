import { onAuthStateChanged, signOut } from "firebase/auth"
import { useEffect, useState } from "react"
import { auth } from "./FirebaseConfig"
import { getBusinessConfig } from "./FirestoreFunctions"

export const useAuth = () => {
    const [user, setUser] = useState(null)
    const [authLoading, setAuthLoading] = useState(true)
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