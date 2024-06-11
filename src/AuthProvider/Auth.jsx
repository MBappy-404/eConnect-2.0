"use client"
import React from 'react';
import {createUserWithEmailAndPassword, getAuth, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile} from 'firebase/auth';
import { createContext } from 'react';
import { useState } from 'react';
import { useEffect } from 'react';
import app from '@/firebase/Firebase.config';
 


export  const AuthContext = createContext();
const auth = getAuth(app);

const Auth = ({children}) => {
     const [user, setUser] = useState(null);
     const [loading, setLoading] = useState(true);

       //create user email
     const createUser = (email, password) =>{
          setLoading(true)
          return createUserWithEmailAndPassword(auth, email, password);
     }
     //sign in user email
     const signIn = (email, password) =>{
          return signInWithEmailAndPassword(auth, email, password);
     }
     //logout user
     const logOut = () =>{
          setLoading(true)
          return signOut(auth);
     }
     //update ussr
     const updateUser = (userInfo) =>{
          return updateProfile(auth.currentUser, userInfo);

     }
     // sign in with google 
     const googleProvider = (provider) =>{
          return signInWithPopup(auth,provider);
     }

     useEffect(()=>{

        const unsubscribe =  onAuthStateChanged(auth, currentUser =>{
               // console.log('observing');
               setUser(currentUser);
               setLoading(false)
          });

          return () => unsubscribe();

          
     },[])
     

     const authInfo = {
          createUser,
          signIn,
          logOut,
          loading,
          user,
          updateUser,
          googleProvider

     }
     return (
          <AuthContext.Provider value={authInfo}>
          {children}
     </AuthContext.Provider>
     );
};

export default Auth;