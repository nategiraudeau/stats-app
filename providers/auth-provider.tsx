import React, { useContext, useEffect, useState } from 'react';
import { _auth as auth } from '../firebase';

export default auth;

export async function logOut(onError?: (e: any) => void) {
    try {
        await auth.signOut();
    } catch (e) {
        if (onError) onError(e);
    }
}

export type AuthState = string | null | undefined;

const AuthContext = React.createContext<AuthState>(undefined);

export const AuthProvider: React.FC = ({ children }) => {
    const [state, setState] = useState<AuthState>();

    useEffect(() => {
        try {
            const unsubscribe = auth.onAuthStateChanged(user => {
                if (user) {
                    setState(user.uid);
                } else {
                    setState(null);
                }
            });
            return unsubscribe;
        } catch (e) {
            console.log(e);
        }
    }, []);

    return (
        <AuthContext.Provider value={state}> {children} </AuthContext.Provider>
    );
}

export const useAuth = () => {
    return useContext(AuthContext);
};