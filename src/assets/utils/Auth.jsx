import { useContext, createContext, Children } from "react";
import { GoogleAuthProvider, signInWithPopup, signOut, onAuthStateChanged } from "firebase/auth";
import { auth } from './firebase';

const AuthContext = createContext()
export const AuthContextProvider = ({children}) => {
    const googleSignIn = () => {
        const provider = new GoogleAuthProvider();
        signInWithPopup(auth, provider)
           .then((result) => {
                console.log('Signed in as:', result.user);
            }).catch((error) => {
                console.log('Error signing in:', error);
            });
    }
    return (
        <AuthContext.Provider value={{googleSignIn}}>
            {children}
        </AuthContext.Provider>
    )
}

export const UserAuth = () => {
    return useContext(AuthContext)
}