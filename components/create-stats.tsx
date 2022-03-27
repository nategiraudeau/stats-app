import React, { useState } from 'react';
import { CirclePicker } from 'react-color';
import db from '../database/db';
import { useAuth } from '../providers/auth-provider';
import delay from '../utils/delay';
import teamColors from '../utils/team-colors';
import Icons from './icons';
import LoadingOverlay from './loading-overlay';
import { v4 as uuid } from 'uuid';
import { useData } from '../providers/data-provider';

const CreateStats: React.FC<{ cancel: () => void }> = ({ cancel }) => {
    const userId = useAuth();
    const data = useData();

    const [name, setName] = useState("");
    const [color, setColor] = useState("");
    const [games, setGames] = useState<number>(undefined);
    const [goals, setGoals] = useState<number>(undefined);
    const [assists, setAssists] = useState<number>(undefined);

    const [loading, setLoading] = useState(false);

    const [i, setI] = useState(0);

    const steps = [
        {
            title: 'Enter the name of your team',
            input: (
                <input
                    value={name}
                    onChange={e => setName(e.currentTarget.value)}
                    type="text"
                    placeholder="My Team" />
            ),
            ready: !!name
        },
        {
            title: 'Pick your team\'s color',
            input: (
                <CirclePicker colors={teamColors} width="294px" color={color} onChangeComplete={c => setColor(c.hex)} />
            ),
            ready: !!color
        },
        {
            title: 'How many games have you played?',
            input: (
                <input
                    value={games}
                    onChange={e => setGames(Number.parseInt(e.currentTarget.value) || undefined)}
                    type="text"
                    placeholder="# Games" />
            ),
            ready: games !== undefined
        },
        {
            title: 'How many goals and assists do you have?',
            input: (
                <div className="row" style={{
                    width: '100%',
                    gap: '12px'
                }}>
                    <input
                        value={goals}
                        onChange={e => setGoals(Number.parseInt(e.currentTarget.value) || undefined)}
                        type="text"
                        placeholder="# Goals" />
                    <input
                        value={assists}
                        onChange={e => setAssists(Number.parseInt(e.currentTarget.value) || undefined)}
                        type="text"
                        placeholder="# Assists" />
                </div>
            ),
            ready: goals !== undefined && assists !== undefined
        }
    ];

    const step = steps[i];
    const final = i + 1 === steps.length;

    return (
        <div className="create-stats">
            <div className="icon"><Icons.BarChart /></div>
            <h4>{i + 1}</h4>
            <div className="v-spacing"></div>
            <h3>{step.title}</h3>
            <div className="v-spacing"></div>
            <div className="v-spacing--sm"></div>
            <div style={{
                minHeight: '85px',
                width: '320px',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center'
            }}>
                {step.input}
            </div>
            <br />
            <div className="row h-align--space">
                <div className="cancel" onClick={async () => {
                    cancel();
                    await delay(200);
                    setName("");
                    setColor("");
                    setGoals(undefined);
                    setGames(undefined);
                    setAssists(undefined);
                    setI(0);
                }}>
                    Cancel
                </div>
                <div className="left-right">
                    <div
                        onClick={() => {
                            if (i > 0)
                                setI(i - 1);
                        }}
                        className={
                            `icon-button${i > 0 ? '' : ' disabled hidden'}`}>
                        <Icons.ArrowLeft />
                    </div>
                    <div className="h-space--sm"></div>
                    <div
                        onClick={async () => {
                            if (!step.ready) return;
                            else if (final) {
                                if (!name || !color || !games || !goals || !assists || !userId) return;
                                setLoading(true);
                                const id = uuid();
                                try {
                                    await db.collection('teams').doc(id).set({
                                        id,
                                        name,
                                        color
                                    });
                                } catch (e) { setLoading(false); return; }

                                let stats = data.users.find(u => u.id === userId)?.stats;
                                if (!stats) { setLoading(false); return; }
                                stats[id] = { games, goals, assists };

                                try {
                                    await db.collection('users').doc(userId).update({
                                        stats
                                    });
                                } catch (e) { setLoading(false); return; }

                                cancel();
                                setName("");
                                setColor("");
                                setGoals(undefined);
                                setGames(undefined);
                                setAssists(undefined);
                                setI(0);
                                setLoading(false);
                                return;
                            }
                            else setI(i + 1);
                        }}
                        className={
                            `icon-button icon-button--primary${step.ready ? '' : ' disabled'}`}>
                        <Icons.ArrowRight />
                    </div>
                </div>
            </div>
            <br />
            <br />
            <LoadingOverlay loading={loading} />
        </div >
    );
}

export default CreateStats;