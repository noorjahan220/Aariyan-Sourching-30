"use client";
import React, { createContext, useEffect, useState } from "react";
import {
  createUserWithEmailAndPassword,
  getAuth,
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  updateProfile,
  EmailAuthProvider,
  reauthenticateWithCredential,
  updatePassword,
  sendPasswordResetEmail,
} from "firebase/auth";
import { app } from "../firebase.init";
import useAxiosSecure from "../Hooks/useAxiosSecure";


// Renamed to AuthProvider's context for clarity
export const AuthContext = createContext(null); 
const auth = getAuth(app);

const AuthProvider = ({ children ,data,filterAttributes}) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const googleProvider = new GoogleAuthProvider();
  const axiosSecure = useAxiosSecure(); 

  

  // MODIFIED: This is the key change to sync Firebase with your database
  // useEffect(() => {
  //   const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
  //     if (firebaseUser) {

  //        console.log("Firebase Auth User Object:", firebaseUser.email);
  //       // A user is logged in via Firebase.
  //       try {
  //         // Now, fetch this user's full data (including role & permissions) from your API.
  //   const response = await axiosSecure.get(`/api/user/${encodeURIComponent(firebaseUser.email)}`);
  //           console.log(response.data);
            
  //         setUser(response.data); // Set the user state with the complete object from your database.
  //       } catch (error) {
  //         console.error("AuthProvider: Failed to fetch user data from backend.", error);
  //         // Log the user out to prevent an inconsistent state.
  //         setUser(null); 
  //         signOut(auth);
  //       }
  //     } else {
  //       // No user is logged in with Firebase.
  //       setUser(null);
  //     }
  //     setLoading(false);
  //   });
  //   return () => unsubscribe();
  // }, [axiosSecure]);

      useEffect(() => {

        const unsbscribe = onAuthStateChanged(auth,currentUser => {
             setUser(currentUser);
            //   console.log(currentUser);
              
             setLoading(false)

           return () => {
            return unsbscribe()
           }

        })

    },[])

  // --- All your other auth functions remain the same ---
  
  const registerUser = (email, password) => {
    setLoading(true);
    return createUserWithEmailAndPassword(auth, email, password);
  };
  
  const logIn = (email, password) => {
    setLoading(true);
    return signInWithEmailAndPassword(auth, email, password);
  };

  const googleSignIn = () => {
    setLoading(true);
    return signInWithPopup(auth, googleProvider);
  };

  const logOut = () => {
    setLoading(true);
    return signOut(auth);
  };

  const updateUserProfile = (name, photoUrl) => {
    if (!auth.currentUser) throw new Error("No user is logged in");
    return updateProfile(auth.currentUser, {
      displayName: name,
      photoURL: photoUrl,
    });
  };

  const changePassword = async (currentPassword, newPassword) => {
    if (!auth.currentUser) throw new Error("No user is logged in");
    const user = auth.currentUser;
    const credential = EmailAuthProvider.credential(user.email, currentPassword);
    try {
      await reauthenticateWithCredential(user, credential);
      await updatePassword(user, newPassword);
    } catch (error) {
      throw error;
    }
  };

  const resetPassword = (email) => {
    if (!email) throw new Error("Email is required for password reset");
    return sendPasswordResetEmail(auth, email);
  };

  const authInfo = {
    user, // This 'user' object is now the full user profile from MongoDB
    loading,
    registerUser,
    logIn,
    logOut,
    updateUserProfile,
    googleSignIn,
    changePassword,
    resetPassword,
    data,
    filterAttributes
  };

  return <AuthContext.Provider value={authInfo}>{children}</AuthContext.Provider>;
};

export default AuthProvider;