import * as React from "react";
import {createContext, type ReactNode, useContext, useState} from "react";

export interface User {
    id: number;
    name: string;
    dob: string;
    email: string;
    phone: string;
}

interface UsersContextType {
    users: User[];
    setUsers: React.Dispatch<React.SetStateAction<User[]>>;
    winners: User[];
    setWinners: React.Dispatch<React.SetStateAction<User[]>>;
}

const UsersContext = createContext<UsersContextType | undefined>(undefined);

export function UsersProvider({ children }: { children: ReactNode }) {
    const [users, setUsers] = useState<User[]>([
        {id: 1, name: "Biba", dob: "01/10/1990", email: "one@email.com", phone: "+380989689898"},
        {id: 2, name: "Boba", dob: "02/05/1985", email: "two@email.com", phone: "+38097969797"},
        {id: 3, name: "Buba", dob: "15/08/1987", email: "three@email.com", phone: "+380969669696"}
    ]);
    const [winners, setWinners] = useState<User[]>([]);

    return (
        <UsersContext.Provider value={{users, setUsers, winners, setWinners}}>
            {children}
        </UsersContext.Provider>
    );
}

// eslint-disable-next-line react-refresh/only-export-components
export function useUsers() {
    const ctx = useContext(UsersContext);
    if (!ctx) throw new Error("useUsers must be used inside UsersProvider");
    return ctx;
}