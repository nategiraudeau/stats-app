import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useState } from 'react';
import LoadingOverlay from '../components/loading-overlay';
import db from '../database/db';
import User from '../models/user';
import auth, { useAuth } from '../providers/auth-provider';
import validateEmailAdress from '../utils/validate-email-adress';

const SignUp: React.FC = () => {
    const authState = useAuth();
    const router = useRouter();

    const [loading, setLoading] = useState(false);

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    if (authState) {
        router.push('/mystats');
        return <div />;
    }

    if (authState === undefined) return (<div />);

    return (
        <div className="sign-in">
            <h1>Sign Up</h1>
            <br />
            <form onSubmit={async e => {
                e.preventDefault();

                if (!name || !email || !password) return;
                if (!validateEmailAdress(email)) return;

                setLoading(true);
                let uid = "";
                try {
                    uid = (await auth.createUserWithEmailAndPassword(email, password)).user.uid;
                } catch (_) { }

                if (!uid) {
                    setLoading(false);
                    return;
                }

                let user: User = {
                    id: uid,
                    email,
                    name,
                    stats: {}
                }

                try {
                    await db.collection('users').doc(uid).set(user);
                } catch (_) { }

                router.push('/mystats');
                setLoading(false);
            }} className="sign-in__inputs">
                <input
                    onChange={e => setName(e.currentTarget.value)}
                    required
                    type="text"
                    name="name"
                    className="sign-in__field"
                    placeholder="Name" />
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
            <Link href="/login">
                <small style={{
                    padding: '6px',
                    marginTop: '6px',
                    color: 'var(--theme-foreground-60)',
                    cursor: 'pointer'
                }}>Already have an account? <span style={{
                    color: 'var(--theme-primary)',
                    fontWeight: 700,
                    textDecoration: 'underline',
                    cursor: 'pointer'
                }}>Log In</span></small>
            </Link>
            <LoadingOverlay loading={loading} type="linear" />
        </div>
    );
}

export default SignUp;