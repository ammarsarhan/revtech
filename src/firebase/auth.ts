import { app } from './main'
import { 
    getAuth, 
    createUserWithEmailAndPassword, 
    signInWithEmailAndPassword,
    updateProfile,
    signOut
} from "firebase/auth";

export const auth = getAuth(app);

export async function createAccountWithCredentials (name: string, email: string, password: string) {
    const data = await createUserWithEmailAndPassword(auth, email, password);
    
    await updateProfile(data.user, {
        displayName: name
    })

    return data;
}

export async function authenticateWithCredentials (email: string, password: string) {
    const data = await signInWithEmailAndPassword(auth, email, password)
    return data;
}

export async function deauthenticateUser () {
    const data = signOut(auth);
    return data;
}