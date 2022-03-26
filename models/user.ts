import Stats from "./stats"

export default interface User {
    id: string,
    email: string,
    name: string,
    pfp?: string,
    stats: {
        [key: string]: Stats
    }
}