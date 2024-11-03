"use client";

import { useState } from "react";

import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";

import { useAppContext } from '@/hooks/appProvider';
import { NavItems } from '../admin/nav-items';
import Header from '../admin/header';
import Overview from '../admin/tabs/overview';
import Investor from '../admin/tabs/investors';
import UserRequests from '../admin/tabs/request';
import Vehicles from '../admin/tabs/vehicles';
import Plans from "../admin/tabs/plans";

const pendingRequests = [
    {
        id: 1,
        type: "Dépôt",
        amount: 5000,
        user: "Alice Johnson",
        status: "En attente",
    },
    {
        id: 2,
        type: "Retrait",
        amount: 2000,
        user: "Bob Smith",
        status: "En attente",
    },
    {
        id: 3,
        type: "Dépôt",
        amount: 3000,
        user: "Charlie Brown",
        status: "En attente",
    },
];



export default function AdminDashboard() {
    const [activeTab, setActiveTab] = useState("overview");

    return (
        <div className="flex flex-col h-screen bg-gray-100">
            <Header activeTab={activeTab} setActiveTab={setActiveTab} />

            <div className="flex flex-1 overflow-hidden">
                <aside className="hidden md:block w-64 bg-white shadow-md">
                    <nav className="mt-6">
                        <NavItems setActiveTab={setActiveTab} activeTab={activeTab} />
                    </nav>
                </aside>

                <main className="flex-1 overflow-y-auto p-4 md:p-8">
                    <h1 className="text-3xl font-bold mb-6">
                        {activeTab === "overview" && "Vue d'ensemble"}
                        {activeTab === "investors" && "Investisseurs"}
                        {activeTab === "requests" && "Demandes"}
                        {activeTab === "vehicles" && "Véhicules"}
                        {activeTab === "plans" && "Plans d'investissement"}
                    </h1>

                    {activeTab === "overview" && <Overview />}

                    {activeTab === "investors" && <Investor  />}

                    {activeTab === "requests" && <UserRequests pendingRequests={pendingRequests} />}

                    {activeTab === "vehicles" && <Vehicles />}

                    {activeTab === "plans" && (
                        <Plans />
                    )}
                </main>
            </div>
        </div>
    );
}
