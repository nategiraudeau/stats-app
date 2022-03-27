import { useRouter } from 'next/router';
import React from 'react';
import CreateStats from '../components/create-stats';
import DialogButton from '../components/dialog-button';
import Icons from '../components/icons';
import Img from '../components/img';
import { useAuth } from '../providers/auth-provider';
import { useData } from '../providers/data-provider';

const MyStats: React.FC = () => {
    const authState = useAuth();
    const router = useRouter();
    const data = useData();

    if (authState === null) router.push('/login');
    else if (!authState) return (<div />);

    if (data.users === undefined || data.teams === undefined) return (<div />);

    const user = data.users.find(u => u.id === authState);

    if (!user) return (<div />);
    if (!Object.keys(user.stats).length) return (
        <div className="no-stats">
            <div className="profile-image edit">
                {user.pfp ? (
                    <Img src={user.pfp} alt=""></Img>
                ) : (
                    <h1>{user.name[0].toUpperCase()}</h1>
                )}
            </div>
            <h2>Get Started</h2>
            <p>Set up your stats</p>
            <DialogButton content={(c) => [<CreateStats cancel={c} />]}>
                <div className="button button--primary">
                    <Icons.ArrowRight opacity={0} /> Let's Go <div className="h-spacing"></div> <Icons.ArrowRight />
                </div>
            </DialogButton>
        </div>
    );

    const stats = user.stats;
    let games = 0, goals = 0, assists = 0;
    for (let key of Object.keys(stats)) {
        let stat = stats[key];
        games += stat.games || 0;
        goals += stat.goals || 0;
        assists += stat.assists || 0;
    }

    return (
        <div className="stats">
            <div className="user-details">
                <div className="profile-image edit big">
                    {user.pfp ? (
                        <Img src={user.pfp} alt=""></Img>
                    ) : (
                        <h1>{user.name[0].toUpperCase()}</h1>
                    )}
                </div>
                <br />
                <div className="number">#5</div>
                <b>{user.name}</b>
                <div className="position">Striker</div>
                <br />
                <DialogButton content={(c) => [<CreateStats cancel={c} />]}>
                    <div
                        className="button button--primary"
                        style={{ width: '180px', boxSizing: 'border-box', whiteSpace: 'nowrap' }}>
                        <Icons.Plus />
                        <div className="h-spacing"></div>
                        New Team
                        <Icons.Plus opacity={0} size={15} />
                    </div>
                </DialogButton>
                <DialogButton content={(
                    <div>

                    </div>
                )}>
                    <div
                        className="button button--secondary"
                        style={{ width: '180px', boxSizing: 'border-box', whiteSpace: 'nowrap' }}>
                        <Icons.Link2 />
                        <div className="h-spacing"></div>
                        Share Stats
                        <Icons.Plus opacity={0} size={10} />
                    </div>
                </DialogButton>
            </div>
            <div className="stats-divider"></div>
            <div className="stats-data">
                <div className="summary-row">
                    <div className="summary games">
                        <b>{games}</b>
                        <div className="summary__sub">Game{games === 1 ? '' : 's'}</div>
                    </div>
                    <div className="summary goals">
                        <b>{goals}</b>
                        <div className="summary__sub">Goal{goals === 1 ? '' : 's'}</div>
                    </div>
                    <div className="summary assists">
                        <b>{assists}</b>
                        <div className="summary__sub">Assist{assists === 1 ? '' : 's'}</div>
                    </div>
                </div>
                <br />
                <br />
                <div className="stats-data__divider"></div>
            </div>
        </div>
    );
}

export default MyStats;