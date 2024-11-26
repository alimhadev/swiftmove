"use client"
import React, { useEffect } from "react";
import { createContext } from "react";
import {
    useQuery,
} from '@tanstack/react-query'
import { getCurrentUser } from "@/lib/api";
interface IAppContext {
    user?: User
}

const AppContext = createContext<IAppContext>({
});

export const AppProvider = ({ children }: { children: React.ReactNode }) => {

    const { data: user } = useQuery({
        queryKey: ["user"],
        queryFn: () => getCurrentUser(),
    })
    return (

        <AppContext.Provider value={{
            user,
        }}> {children} </AppContext.Provider>
    );
};

export const useAppContext = () => React.useContext(AppContext);