import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import CreateStats from '../components/create-stats';
import DialogAction from '../components/dialog-action';
import DialogButton from '../components/dialog-button';
import EditPfp from '../components/edit-pfp';
import EditProfile from '../components/edit-profile';
import EditTeam from '../components/edit-team';
import Icons from '../components/icons';
import Img from '../components/img';
import Stats from '../models/stats';
import { useAuth } from '../providers/auth-provider';
import { useData } from '../providers/data-provider';
import copyTextToClipboard from '../utils/copyToClipboard';
import updateGoals from '../utils/updateGoals';

const MyStats: React.FC = () => {
    const authState = useAuth();
    const router = useRouter();
    const data = useData();

    const [stats, setStats] = useState<{
        [key: string]: Stats
    }>({});

    useEffect(() => {
        setStats(data?.users?.find(u => u.id === authState)?.stats || {});
    }, [authState, data.users]);

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
                <div className="row edit-button">
                    <Icons.Edit3 size={14} /> Edit
                </div>
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

    let games = 0, goals = 0, assists = 0;
    for (let key of Object.keys(stats)) {
        let stat = stats[key];
        games += stat.games || 0;
        goals += stat.goals || 0;
        assists += stat.assists || 0;
    }

    console.log(user.pfp);

    return (
        <div className="stats">
            <div className="user-details">
                <DialogButton content={(cancel) => [<EditPfp cancel={cancel} />]}>
                    <div className="profile-image edit big">
                        {user.pfp ? (
                            <Img src={user.pfp} alt=""></Img>
                        ) : (
                            <h1>{user.name[0].toUpperCase()}</h1>
                        )}
                        <div className="row edit-button">
                            <Icons.Edit3 size={14} /> Edit
                        </div>
                    </div>
                </DialogButton>
                <br />
                <div className="row h-align--space number">
                    {user.number ? `#${user.number}` : (
                        <DialogButton content={(cancel) => [<EditProfile cancel={cancel} />]}>
                            <div className="row quicklink">
                                <Icons.Plus size={18} />
                                <div className="h-spacing--sm"></div>
                                Your Number
                            </div>
                        </DialogButton>
                    )}
                    <DialogButton content={(cancel) => [<EditProfile cancel={cancel} />]}>
                        <div className="icon-button sm">
                            <Icons.Edit3 size={16} />
                        </div>
                    </DialogButton>
                </div>
                <b>{user.name}</b>
                <div className="position">
                    {user.position || (
                        <DialogButton content={(cancel) => [<EditProfile cancel={cancel} />]}>
                            <div className="row quicklink">
                                <Icons.Plus size={18} />
                                <div className="h-spacing--sm"></div>
                                Your Position
                            </div>
                        </DialogButton>
                    )}
                </div>
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
                <DialogButton barrierDismissible content={(_) => [(
                    <div className='column'>
                        <br />
                        <h3>Copy the link to share</h3>
                        <br />
                        <small style={{
                            fontSize: '12px',
                            opacity: 0.5,
                            whiteSpace: 'nowrap'
                        }}>
                            https://soccer-stats-seven.vercel.app/stats/{authState}
                        </small>
                        <br />
                    </div>
                )]} actions={[
                    (<DialogAction>
                        Cancel
                    </DialogAction>),
                    (<DialogAction primary onClick={() => {
                        copyTextToClipboard(`https://soccer-stats-seven.vercel.app/stats/${authState}`);
                    }}>
                        <Icons.Link2 size={20} />
                        <div className="h-spacing"></div>
                        Copy Link
                    </DialogAction>)
                ]}>
                    <div
                        className="button button--secondary"
                        style={{ width: '180px', boxSizing: 'border-box', whiteSpace: 'nowrap' }}>
                        <Icons.Share />
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
                <br />
                <div className="stats-teams">
                    {Object.keys(stats).sort().reverse().map(t => {
                        const team = data.teams.find(_t => _t.id === t);
                        if (!team) return (<div key={Math.random()} style={{ display: 'none' }} />);
                        const stat = stats[t];
                        return (
                            <div key={t} className="stats__team">
                                <div style={{ background: team.color }} className="top-color" />
                                <h3 className="row h-align--space">
                                    {team.name}
                                    <DialogButton content={(cancel) => [<EditTeam id={t} cancel={cancel} />]}>
                                        <div className="icon-button sm">
                                            <Icons.Edit3 size={16} />
                                        </div>
                                    </DialogButton>
                                </h3>
                                <div className="stats__team__stats" style={{
                                    color: team.color
                                }}>
                                    <div className="goals-wrapper">
                                        <div className="toggle large">
                                            <div className="toggle__button icon-button minus" onClick={_ => {
                                                let _stats = stats;
                                                _stats[t].goals--;
                                                if (_stats[t].goals < 0) _stats[t].goals = 0;
                                                setStats({ ...stats, _stats });
                                                updateGoals(authState, t, _stats[t].goals);
                                            }}>
                                                <Icons.Minus />
                                            </div>
                                            <div className="toggle__button icon-button plus" onClick={_ => {
                                                let _stats = stats;
                                                _stats[t].goals++;
                                                setStats({ ...stats, _stats });
                                                updateGoals(authState, t, _stats[t].goals);
                                            }}>
                                                <Icons.Plus />
                                            </div>
                                        </div>
                                        <div className="goals">
                                            <h2>{stat.goals}</h2>
                                            <div className="desc">Goal{stat.goals === 1 ? '' : 's'}</div>
                                        </div>
                                    </div>
                                    <div className="other">
                                        <div className="other-stat">
                                            <div className="toggle">
                                                <div className="toggle__button icon-button sm minus" onClick={_ => {
                                                    let _stats = stats;
                                                    _stats[t].assists--;
                                                    if (_stats[t].assists < 0) _stats[t].assists = 0;
                                                    setStats({ ...stats, _stats });
                                                    updateGoals(authState, t, _stats[t].assists);
                                                }}>
                                                    <Icons.Minus />
                                                </div>
                                                <div className="toggle__button icon-button sm plus" onClick={_ => {
                                                    let _stats = stats;
                                                    _stats[t].assists++;
                                                    setStats({ ...stats, _stats });
                                                    updateGoals(authState, t, _stats[t].assists);
                                                }}>
                                                    <Icons.Plus />
                                                </div>
                                            </div>
                                            <h2>{stat.assists}</h2>
                                            <div className="desc">Assist{stat.assists === 1 ? '' : 's'}</div>
                                        </div>
                                        <div className="other-stat">
                                            <div className="toggle">
                                                <div className="toggle__button icon-button sm minus" onClick={_ => {
                                                    let _stats = stats;
                                                    _stats[t].games--;
                                                    if (_stats[t].games < 0) _stats[t].games = 0;
                                                    setStats({ ...stats, _stats });
                                                    updateGoals(authState, t, _stats[t].games);
                                                }}>
                                                    <Icons.Minus />
                                                </div>
                                                <div className="toggle__button icon-button sm plus" onClick={_ => {
                                                    let _stats = stats;
                                                    _stats[t].games++;
                                                    setStats({ ...stats, _stats });
                                                    updateGoals(authState, t, _stats[t].games);
                                                }}>
                                                    <Icons.Plus />
                                                </div>
                                            </div>
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

export default MyStats;