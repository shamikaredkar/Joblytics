import { useContext, createContext, Children, useEffect } from "react";
import {
  GoogleAuthProvider,
  signInWithPopup,
  signOut,
  onAuthStateChanged,
} from "firebase/auth";
import { auth, db } from "./firebase";
import { useState } from "react";
import { setDoc, doc } from "firebase/firestore";

const AuthContext = createContext();
export const AuthContextProvider = ({ children }) => {
  const [user, setUser] = useState({});
  const googleSignIn = async () => {
    const provider = new GoogleAuthProvider();
    const result = await signInWithPopup(auth, provider);
    const user = result.user;
    //Saving user data
    const subcollection = doc(db, "Users", user.email);
    await setDoc(subcollection, {
      name: user.displayName,
      createdAt: new Date(),
    });
  };
  const userSignOut = () => {
    signOut(auth)
      .then(() => {
        console.log("Signed out");
      })
      .catch((error) => {
        console.log("Error signing out:", error);
      });
  };
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      console.log("User is signed in:", currentUser);
    });
    // unsubscribe on cleanup
    return () => {
      unsubscribe();
    };
  });
  return (
    <AuthContext.Provider value={{ googleSignIn, userSignOut, user }}>
      {children}
    </AuthContext.Provider>
  );
};

export const UserAuth = () => {
  return useContext(AuthContext);
};
