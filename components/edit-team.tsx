import { relative } from 'path/posix';
import React, { useEffect, useState } from 'react';
import { CirclePicker } from 'react-color';
import db from '../database/db';
import { useAuth } from '../providers/auth-provider';
import { useData } from '../providers/data-provider';
import teamColors from '../utils/team-colors';
import Dropdown from './dropdown';
import Icons from './icons';
import LoadingOverlay from './loading-overlay';

const EditTeam: React.FC<{ cancel: () => void, id: string }> = ({ cancel, id }) => {
    const data = useData();
    const userId = useAuth();

    const [name, setName] = useState<string>(undefined);
    const [color, setColor] = useState<string>(undefined);

    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (!data) return;

        const team = data?.teams?.find(t => t.id === id);
        setName(team?.name);
        setColor(team?.color);
    }, [id]);

    if (data.teams === undefined || data.users === undefined || !userId) return (<div />);

    const team = data?.teams?.find(t => t.id === id);
    const ready = name && color && (team.color !== color || team.name !== name);

    return (
        <div className='column edit-pfp' key={team.name + team.color}>
            <br />
            <div style={{
                width: '100px',
                height: '6px',
                borderRadius: '2px 2px 4px 4px',
                background: color
            }}></div>
            <h3>
                Edit team
            </h3>
            <br />
            <input
                value={name}
                onChange={e => setName(e.currentTarget.value)}
                type="text"
                placeholder="Team Name" />
            <br />
            <br />
            <CirclePicker colors={teamColors} width="294px" color={color} onChangeComplete={c => setColor(c.hex)} />
            <br />
            <br />
            <br />
            <div style={{ width: '400px' }} className="edit-pfp__actions row h-align--space">
                <div className="button" onClick={() => {
                    cancel();
                    setName(team.name);
                    setColor(team.color);
                }}>Cancel</div>
                <div className="button button--danger" onClick={async () => {
                    setLoading(true);
                    await db.collection('teams').doc(id).delete();
                    const stats = data.users.find(u => u.id === userId).stats;
                    let newStats = {};

                    for (let key of Object.keys(stats)) {
                        if (key !== id) {
                            newStats[key] = stats[key];
                        }
                    }

                    db.collection('users').doc(userId).update({ stats: newStats });
                    cancel();
                    setLoading(false);
                }}>Delete</div>
                <div className={`button button--primary${ready ? '' : ' hidden'}`} onClick={async () => {
                    if (!ready) return;

                    setLoading(true);
                    let updateData: { [key: string]: any } = {}
                    if (team.name !== name) updateData.name = name;
                    if (team.color !== color) updateData.color = color || null;

                    await db.collection('teams').doc(id).update(updateData);

                    cancel();
                    setLoading(false);
                }}>Save</div>
            </div>
            <br />
            <LoadingOverlay loading={loading} />
        </div>
    );
}

export default EditTeam;