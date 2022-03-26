import Link from 'next/link';
import React from 'react';
import { useAuth } from '../providers/auth-provider';

const Landing: React.FC = () => {
    const authState = useAuth();

    console.log(authState);

    return authState ? (
        <div>
            Authenticated
        </div>
    ) : authState === undefined ? (
        <div></div>
    ) : (
        <div>
            <Link href="/login">Log In</Link >
            <br />
            <br />
            <Link href="/sign-up">Sign Up</Link>
        </div>
    );
}

export default Landing;