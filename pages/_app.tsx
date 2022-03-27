import deepEqual from 'deep-equal';
import type { AppProps /*, AppContext */ } from 'next/app';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import Navbar from '../components/layout/navbar';
import db from '../database/db';
import Team from '../models/team';
import User from '../models/user';
import { AuthProvider } from '../providers/auth-provider';
import { DataProvider } from '../providers/data-provider';

import '../scss/index.scss';
import delay from '../utils/delay';

function MyApp({ Component, pageProps }: AppProps) {
    const [users, setUsers] = useState<User[]>(undefined);
    const [teams, setTeams] = useState<Team[]>(undefined);

    useEffect(() => {
        const unsubscribeUsers = db.collection('users').onSnapshot((snap) => {
            const _users = snap.docs.map(doc => ({
                id: doc.id,
                email: doc.data().email,
                name: doc.data().name,
                stats: doc.data().stats,
                position: doc.data().position || undefined,
                number: doc.data().number || undefined,
                pfp: doc.data().pfp || undefined
            }));

            if (!deepEqual(_users, users)) {
                setUsers(_users);
            }
        });

        return unsubscribeUsers;
    });

    useEffect(() => {
        const unsubscribeTeams = db.collection('teams').onSnapshot(async (snap) => {
            const _teams = snap.docs.map(doc => ({
                id: doc.id,
                name: doc.data().name,
                color: doc.data().color
            }));

            if (!deepEqual(_teams, teams)) {
                delay(200);
                setTeams(_teams);
            }
        });

        return unsubscribeTeams;
    });

    useEffect(() => {
        if (document.body.scrollHeight > window.innerHeight) {
            document.body.style.paddingBottom = '80px';
        }
    }, []);

    const { pathname } = useRouter();

    return (
        <AuthProvider>
            <DataProvider data={{ users, teams }}>
                <div className="_wrapper">
                    {pathname !== '/login' && pathname !== '/sign-up' ? (<Navbar />) : (<div />)}
                    <Component />
                </div>
            </DataProvider>
        </AuthProvider>
    );
}

export default MyApp