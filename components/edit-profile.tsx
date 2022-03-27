import React, { useEffect, useState } from 'react';
import db from '../database/db';
import { useAuth } from '../providers/auth-provider';
import { useData } from '../providers/data-provider';
import LoadingOverlay from './loading-overlay';

const EditProfile: React.FC<{ cancel: () => void }> = ({ cancel }) => {
    const userId = useAuth();
    const data = useData();

    const [number, setNumber] = useState<number>(undefined);
    const [name, setName] = useState<string>(undefined);
    const [position, setPosition] = useState<string>(undefined);

    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (!userId) return;

        const user = data?.users?.find(u => u.id === userId);
        setName(user?.name);
        setPosition(user?.position);
        setNumber(user?.number);
    }, [userId]);

    if (data.users === undefined || data.teams === undefined) return (<div />);

    const user = data.users.find(u => u.id === userId);
    const ready = name && (user.name !== name || user.position !== position || user.number !== number)
        && (number === undefined || Number.parseInt(number.toString()));

    return (
        <div className='column edit-pfp' key={user.name + user.number + user.position}>
            <h3>Edit your profile</h3>
            <br />
            <input
                value={name}
                onChange={e => setName(e.currentTarget.value)}
                type="text"
                placeholder="Your Name" />
            <div className="v-spacing--sm"></div>
            <input
                value={position}
                onChange={e => setPosition(e.currentTarget.value)}
                type="text"
                placeholder="Your Position, e.g. Midfielder" />
            <div className="v-spacing--sm"></div>
            <input
                value={number}
                onChange={e => {
                    const n = Number.parseInt(e.currentTarget.value);
                    setNumber(n || n === 0 ? n : undefined);
                }}
                type="text"
                placeholder="Your Number, e.g. 5" />
            <br />
            <br />
            <div style={{ width: '400px' }} className="edit-pfp__actions row h-align--space">
                <div className="button" onClick={() => {
                    cancel();
                    setName(user.name);
                    setNumber(0);
                    setNumber(user.number);
                    setPosition(undefined);
                    setPosition(user.position);
                }}>Cancel</div>
                <div className={`button button--primary${ready ? '' : ' hidden'}`} onClick={async () => {
                    if (!ready) return;

                    setLoading(true);
                    let updateData: { [key: string]: any } = {}
                    if (user.name !== name) updateData.name = name;
                    if (user.position !== position) updateData.position = position || null;

                    if (Number.parseInt(number?.toString()) || Number.parseInt(number?.toString()) === 0) updateData.number = number;
                    else if (number === undefined) updateData.number = null;

                    await db.collection('users').doc(userId).update(updateData);
                    cancel();
                    setLoading(false);
                }}>Save</div>
            </div>
            <br />
            <LoadingOverlay loading={loading} />
        </div>
    );
}

export default EditProfile;