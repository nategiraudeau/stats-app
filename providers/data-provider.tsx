import React, { useContext } from 'react';
import Team from '../models/team';
import User from '../models/user';

export interface Data {
    users: User[],
    teams: Team[]
}

export const emptyData: Data = {
    users: [],
    teams: []
}

export interface DataState extends Data { }

const DataContext = React.createContext<DataState>({
    ...emptyData,
});

export const DataProvider: React.FC<{
    data: Data
}> = ({
    data,
    children
}) => {
        return (
            <DataContext.Provider value={{ ...data }}> {children} </DataContext.Provider>
        );
    }

export const useData = () => {
    return useContext(DataContext);
};