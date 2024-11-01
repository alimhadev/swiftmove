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

const investors = [
    {
        id: 1,
        name: "Alice Johnson",
        email: "alice@example.com",
        totalInvestment: 10000,
        activeInvestments: 3,
    },
    {
        id: 2,
        name: "Bob Smith",
        email: "bob@example.com",
        totalInvestment: 15000,
        activeInvestments: 2,
    },
    {
        id: 3,
        name: "Charlie Brown",
        email: "charlie@example.com",
        totalInvestment: 8000,
        activeInvestments: 1,
    },
];

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
    const user = useAppContext().user;
    const [activeTab, setActiveTab] = useState("overview");
    const [showNotifications, setShowNotifications] = useState(false);

    const notifications = [
        "Nouvelle demande de dépôt de Alice Johnson",
        "Bob Smith a atteint 10 000$ d'investissement total",
        "Nouveau véhicule d'investissement 'Scooter' créé",
    ];



    return (
        <div className="flex flex-col h-screen bg-gray-100">
            <Header activeTab={activeTab} setActiveTab={setActiveTab} setShowNotifications={setShowNotifications} showNotifications={showNotifications} user={user} />

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

                    {showNotifications && (
                        <Card className="mb-6">
                            <CardHeader>
                                <CardTitle>Notifications</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <ul className="space-y-2">
                                    {notifications.map(
                                        (notification, index) => (
                                            <li key={index}>{notification}</li>
                                        )
                                    )}
                                </ul>
                            </CardContent>
                        </Card>
                    )}

                    {activeTab === "overview" && <Overview />}

                    {activeTab === "investors" && <Investor investors={investors} />}

                    {activeTab === "requests" && <UserRequests pendingRequests={pendingRequests} />}

                    {activeTab === "vehicles" && <Vehicles />}

                    {activeTab === "plans" && (
                    <Plans/>
                    )}
                </main>
            </div>
        </div>
    );
}
