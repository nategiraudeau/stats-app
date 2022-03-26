import type { AppProps /*, AppContext */ } from 'next/app';
import { useState } from 'react';
import Team from '../models/team';
import User from '../models/user';
import { AuthProvider } from '../providers/auth-provider';
import { DataProvider } from '../providers/data-provider';

import '../scss/index.scss';

function MyApp({ Component, pageProps }: AppProps) {
    const [users, setUsers] = useState<User[]>(undefined);
    const [teams, setTeams] = useState<Team[]>(undefined);

    return (
        <AuthProvider>
            <DataProvider data={{ users, teams }}>
                <Component />
            </DataProvider>
        </AuthProvider>
    );
}

export default MyApp