import { useRouter } from 'next/router';
import React from 'react';
import Img from '../../components/img';
import { useAuth } from '../../providers/auth-provider';
import { useData } from '../../providers/data-provider';

const PublicStats: React.FC = () => {
    const router = useRouter();
    const data = useData();
    const userId = useAuth();

    if (!data || userId === undefined) return (<div />);

    const path = router.asPath;
    const id = path.substring(path.lastIndexOf('/') + 1);
    const user = data.users?.find(u => u.id === id);

    console.log(user);

    if (!user) return (<div />);
    else if (userId === user.id) router.push('/mystats');
    else if (Object.keys(user?.stats || {}).length <= 0) return (<div />);

    const stats = user?.stats;
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
                <div className="profile-image big">
                    {user.pfp ? (
                        <Img src={user.pfp} alt=""></Img>
                    ) : (
                        <h1>{user.name[0].toUpperCase()}</h1>
                    )}
                </div>
                <br />
                {user.number !== undefined && <div className="number">#{user.number}</div>}
                <b>{user.name}</b>
                {user.position !== undefined && <div className="position">{user.position}</div>}
                <br />
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
                <br />
                <div className="stats-teams">
                    {Object.keys(stats).map(t => {
                        const team = data?.teams?.find(_t => _t.id === t);
                        if (!team) return (<div key={Math.random()} />);
                        const stat = stats[t];
                        return (
                            <div key={t} className="stats__team">
                                <div style={{ background: team.color }} className="top-color" />
                                <h3>{team.name}</h3>
                                <div className="stats__team__stats" style={{
                                    color: team.color
                                }}>
                                    <div className="goals-wrapper">
                                        <div className="goals">
                                            <h2>{stat.goals}</h2>
                                            <div className="desc">Goal{stat.goals === 1 ? '' : 's'}</div>
                                        </div>
                                    </div>
                                    <div className="other">
                                        <div className="other-stat">
                                            <h2>{stat.assists}</h2>
                                            <div className="desc">Assist{stat.assists === 1 ? '' : 's'}</div>
                                        </div>
                                        <div className="other-stat">
                                            <h2>{stat.games}</h2>
                                            <div className="desc">Game{stat.games === 1 ? '' : 's'}</div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
}

export default PublicStats;