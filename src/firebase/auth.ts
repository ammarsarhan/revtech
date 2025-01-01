import { app } from './main'
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";

const auth = getAuth(app);

export async function createAccountWithCredentials (email: string, password: string) {
    const data = await createUserWithEmailAndPassword(auth, email, password)
    return data;
}