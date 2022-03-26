import { useRouter } from 'next/router';
import React, { useState } from 'react';
import LoadingOverlay from '../components/loading-overlay';
import db from '../database/db';
import User from '../models/user';
import auth, { useAuth } from '../providers/auth-provider';
import validateEmailAdress from '../utils/validate-email-adress';

const LogIn: React.FC = () => {
    const authState = useAuth();
    const router = useRouter();

    const [loading, setLoading] = useState(false);

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    if (authState) router.push('/');

    return (
        <div className="sign-in">
            <h1>Log In</h1>
            <br />
            <form onSubmit={async e => {
                e.preventDefault();

                if (!email || !password) return;
                if (!validateEmailAdress(email)) return;

                setLoading(true);
                try {
                    await auth.signInWithEmailAndPassword(email, password);
                } catch (_) { }

                router.push('/');
                setLoading(false);
            }} className="sign-in__inputs">
                <input
                    onChange={e => setEmail(e.currentTarget.value)}
                    required
                    type="email"
                    name="email"
                    className="sign-in__field"
                    placeholder="Email" />
                <input
                    onChange={e => setPassword(e.currentTarget.value)}
                    required
                    type="password"
                    name="email"
                    className="sign-in__field"
                    placeholder="Password" />
                <input
                    type="submit"
                    value="Go"
                    className="sign-in__submit" />
            </form>
            <LoadingOverlay loading={loading} type="linear" />
        </div>
    );
}

export default LogIn;