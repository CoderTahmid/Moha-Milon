import { createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, signOut } from 'firebase/auth';
import React, { createContext, useEffect, useState } from 'react';
import { auth } from '../firebase.init';

export const AuthContext = createContext(null);

const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const name = "aggg";

    const createUser = (email, password) => {
        return createUserWithEmailAndPassword(auth, email, password);
    }

    const signInUser = (email, password) => {
        return signInWithEmailAndPassword(auth, email, password);
    }

    const signOutUser = () => {
        return signOut(auth);
    }

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            /* 
            So basically ei onAuthStateChanged hocche ekta observer
            eta observe kore je age theke kono user login kora ache kina
            jodi thake tahole kichu ekta ekta korbe (which is shown in the if else block)
            ar na thakle arekta kichu korbe arki
            application ta shuru hoilei ei observer boshe jabe
            and observe korbe je kono user logged in ache kina
            */
            console.log("Current user", currentUser);
            setUser(currentUser);
        })

        return () => {
            unsubscribe();
            /*
            so what we are doing here?
            ekhane unsubscribe mane hocche oi observer ta
            amra eta ke ei return'r moddhe call kore observer ta ke off korlam
            off na korle eita onnek issue create korbe, like application slow hoye jabe or memory leak
            eita ke component unmount bole
            */
        }

    }, [])

    // onAuthStateChanged(auth, currentUser => {
    //     /* 
    //     So basically ei onAuthStateChanged hocche ekta observer
    //     eta observe kore je age theke kono user login kora ache kina
    //     jodi thake tahole kichu ekta ekta korbe (which is shown in the if else block)
    //     ar na thakle arekta kichu korbe arki
    //     application ta shuru hoilei ei observer boshe jabe
    //     and observe korbe je kono user logged in ache kina
    //     */
    //     if (currentUser) {
    //         console.log("Current user", currentUser);
    //         setUser(currentUser);
    //     } else {
    //         console.log("No user logged in");
    //         setUser(null);
    //     }
    // })

    const authInfo = {
        name,
        createUser,
        signInUser,
        user,
        signOutUser
    }

    return (
        <AuthContext.Provider value={authInfo}>
            {children}
        </AuthContext.Provider>
    );
};
export default AuthProvider;