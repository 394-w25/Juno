import { onAuthStateChanged, signOut } from "firebase/auth"
import { useEffect, useState } from "react"
import { auth } from "./FirebaseConfig"

export const useAuth = () => {
    const [user, setUser] = useState(null)
    const [authLoading, setAuthLoading] = useState(true)

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
            if (currentUser) { // user is logged in
                setUser(currentUser)                    
            } else { // user isn't logged in or has signed out
                setUser(null);
            }

            setAuthLoading(false)
        })
        
        return () => unsubscribe()
    }, [])

    return { user, authLoading }
}

export const logOut = async () => {
    await signOut(auth)
}