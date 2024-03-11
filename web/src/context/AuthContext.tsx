import { createContext, useEffect, useState } from "react"
import { 
    createUserWithEmailAndPassword, 
    signInWithEmailAndPassword, 
    signOut, 
    onAuthStateChanged 
} from 'firebase/auth'
import  PropTypes from "prop-types";


import auth from "../firebase"

export const AuthContext = createContext({});

export const AuthContextProvider = ({ children } : {children: React.ReactNode}) => {
    const [user, setUser] = useState({})
    const [loading, setLoading] = useState(true);

    const createUser = (email:string, password:string) => {
        setLoading(true);
        return createUserWithEmailAndPassword(auth, email, password)
    }

    const loginUser = (email:string, password:string) => {
        setLoading(true);
        return signInWithEmailAndPassword(auth, email, password)
    }

    const logout = () => {
        setLoading(true);
        return signOut(auth)
    }

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            console.log(user)
            setLoading(false);
            if (user != null) {
                setUser(user)
            }
        })
        return () => {
            unsubscribe()
        }
    }, [])

    const authValue = {
        createUser,
        user,
        loginUser,
        logout,
        loading,
    };

    return <AuthContext.Provider value={authValue}>{children}</AuthContext.Provider>;

}

AuthContextProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default AuthContextProvider;
