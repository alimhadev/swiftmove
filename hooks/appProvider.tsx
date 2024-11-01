"use client"
import React, { useEffect } from "react";
import { createContext } from "react";
import {
    QueryClient,
    QueryClientProvider,
} from '@tanstack/react-query'
import { getUserById } from "@/lib/api";
interface IAppContext {
    user?: User
    setUser: (user: User) => void
}

const AppContext = createContext<IAppContext>({
    setUser: () => { },
});

const queryClient = new QueryClient()
export const AppProvider = ({ children }: { children: React.ReactNode }) => {
    const [user, setUser] = React.useState<User>();
    useEffect(() => {
        const getUser = async () => {
            const user = localStorage.getItem("user");
            if (!user) {
                return;
            }
            const id = JSON.parse(user).id
            const dbUser = await getUserById(id)
            setUser(dbUser)
        }
        getUser()
    }, []);

    return (
        <QueryClientProvider client={queryClient}>

            <AppContext.Provider value={{
                user,
                setUser,
            }}> {children} </AppContext.Provider>
        </QueryClientProvider>
    );
};

export const useAppContext = () => React.useContext(AppContext);