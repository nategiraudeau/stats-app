import db from "../database/db";
import Team from "../models/team";
import User from "../models/user";

export default async function updateGoals(userId: string, teamId: string, ammount: number) {
    const userDoc = await db.collection('users').doc(userId).get();
    const user: User = {
        id: userDoc.id,
        email: userDoc.data().email,
        name: userDoc.data().name,
        stats: userDoc.data().stats,
        position: userDoc.data().position || undefined,
        number: userDoc.data().number || undefined,
        pfp: userDoc.data().pfp || undefined
    }

    if (!user) return;

    let stats = user.stats;
    stats[teamId].goals = ammount;

    userDoc.ref.update({ stats });
}

export async function updateAssists(userId: string, teamId: string, ammount: number) {
    const userDoc = await db.collection('users').doc(userId).get();
    const user: User = {
        id: userDoc.id,
        email: userDoc.data().email,
        name: userDoc.data().name,
        stats: userDoc.data().stats,
        position: userDoc.data().position || undefined,
        number: userDoc.data().number || undefined,
        pfp: userDoc.data().pfp || undefined
    }

    if (!user) return;

    let stats = user.stats;
    stats[teamId].assists = ammount;

    userDoc.ref.update({ stats });
}

export async function updateGames(userId: string, teamId: string, ammount: number) {
    const userDoc = await db.collection('users').doc(userId).get();
    const user: User = {
        id: userDoc.id,
        email: userDoc.data().email,
        name: userDoc.data().name,
        stats: userDoc.data().stats,
        position: userDoc.data().position || undefined,
        number: userDoc.data().number || undefined,
        pfp: userDoc.data().pfp || undefined
    }

    if (!user) return;

    let stats = user.stats;
    stats[teamId].games = ammount;

    userDoc.ref.update({ stats });
}