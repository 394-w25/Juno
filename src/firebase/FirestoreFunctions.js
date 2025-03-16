import { doc, getDoc, setDoc } from "firebase/firestore";
import { db } from "./FirebaseConfig";

const USERS_COLLECTION = "users"
const BUSINESS_CONFIGS_COLLECTION = "businessConfigs"

export class BusinessConfig {
    constructor (name, address, business_type, phone, industry, web_url) {
        this.name = name // business name
        this.address = address // business address
        this.business_type = business_type // retail, restaurant, etc.
        this.phone = phone // business phone number
        this.industry = industry // food, flowers, etc.
        this.web_url = web_url // business website url
    }   
}

const businessConverter = {
    toFirestore: (business_config) => { // converts BusinessConfig into a dictionary to store into Firestore
        return {
            name: business_config.name,
            address: business_config.address,
            business_type: business_config.business_type,
            phone: business_config.phone,
            industry: business_config.industry,
            web_url: business_config.web_url
        }
    },
    fromFirestore: (snapshot, options) => { // converts Firestore data into a BusinessConfig class
        const data = snapshot.data(options)
        return new BusinessConfig(data.name, data.address, data.business_type, data.phone, data.industry, data.web_url)
    }
}

// user
class UserProfile {
    constructor(uid, name, email, photoURL) {
        this.uid = uid;
        this.name = name;
        this.email = email;
        this.photoURL = photoURL;
    }
}

// Firestore converter for UserProfile
const userConverter = {
    toFirestore: (userProfile) => {
        return {
            uid: userProfile.uid,
            name: userProfile.name,
            email: userProfile.email,
            photoURL: userProfile.photoURL
        };
    },
    fromFirestore: (snapshot, options) => {
        const data = snapshot.data(options);
        return new UserProfile(data.uid, data.name, data.email, data.photoURL);
    }
};

/**
 * Saves user profile to Firestore when they sign up
 * @param {object} user (Firebase Auth user object)
 */
export async function saveUserProfile(user) {
    if (!user || !user.uid) return;

    const userRef = doc(db, USERS_COLLECTION, user.uid).withConverter(userConverter);
    const userSnap = await getDoc(userRef);

    if (!userSnap.exists()) {
        // Only create entry if the user is new ****
        await setDoc(userRef, new UserProfile(user.uid, user.displayName || "Unknown", user.email, user.photoURL || null), { merge: true });

        // create empty businessconfig entry
        await saveBusinessConfig(user.uid, new BusinessConfig("", "", "", "", "", ""));
    }
}

/**
 * Gets user profile from Firestore
 * @param {string} uid (user's Firebase UID)
 * @returns {UserProfile?}
 */
export async function getUserProfile(uid) {
    if (!uid) return null;

    const userRef = doc(db, USERS_COLLECTION, uid).withConverter(userConverter);
    const userSnap = await getDoc(userRef);

    return userSnap.exists() ? userSnap.data() : null;
}

/**
 * saves onboarding info to Firestore
 * @param {string} uid (uid of the user)
 * @param {BusinessConfig} business_config
 */
export async function saveBusinessConfig(uid, business_config) {
    const docRef = doc(db, BUSINESS_CONFIGS_COLLECTION, uid).withConverter(businessConverter) // creates reference to the document
    await setDoc(docRef, business_config, {
        merge: true,
    })
}

/**
 * gets onboarding info from Firestore; returns null if none found
 * @param {string} uid (uid of the user)
 * @returns {BusinessConfig?}
 */
export async function getBusinessConfig(uid) {
    const docRef = doc(db, BUSINESS_CONFIGS_COLLECTION, uid).withConverter(businessConverter) // creates reference to document
    const docSnap = await getDoc(docRef)

    if (docSnap.exists()) {
        const business_config = docSnap.data()
        return business_config
    }
    
    return null
}