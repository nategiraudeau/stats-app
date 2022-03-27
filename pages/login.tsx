import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useState } from 'react';
import LoadingOverlay from '../components/loading-overlay';
import auth, { useAuth } from '../providers/auth-provider';
import validateEmailAdress from '../utils/validate-email-adress';

const LogIn: React.FC = () => {
    const authState = useAuth();
    const router = useRouter();

    const [loading, setLoading] = useState(false);

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    if (authState) {
        router.push('/mystats');
        return <div />;
    }

    if (authState === undefined) return (<div />);

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

                router.push('/mystats');
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
            <Link href="/sign-up">
                <small style={{
                    padding: '6px',
                    marginTop: '6px',
                    color: 'var(--theme-foreground-60)',
                    cursor: 'pointer'
                }}>Don't have an account? <span style={{
                    color: 'var(--theme-primary)',
                    fontWeight: 700,
                    textDecoration: 'underline',
                    cursor: 'pointer'
                }}>Sign Up</span></small>
            </Link>
            <LoadingOverlay loading={loading} type="linear" />
        </div>
    );
}

export default LogIn;