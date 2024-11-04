"use client"
import React, { useEffect } from "react";
import { createContext } from "react";
import {
    QueryClient,
    QueryClientProvider,
} from '@tanstack/react-query'
import { getCurrentUser } from "@/lib/api";
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
            try {
                const user = localStorage.getItem("token");
                if (!user) {
                    return;
                }
                const currentUser = await getCurrentUser()
                setUser(currentUser)
            } catch (error) {
                console.log("error", error)
            }
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