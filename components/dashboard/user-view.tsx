"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
    Sheet,
    SheetContent,
    SheetOverlay,
    SheetTrigger,
} from "@/components/ui/sheet";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
    BarChart,
    Bell,
    DollarSign,
    Home,
    Menu,
    PlusCircle,
    RefreshCw,
    Settings,
    User, LogOut
} from "lucide-react";

import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import Image from 'next/image'
import Link from "next/link";
import { AccountForm } from "@/components/forms/account-form";
import { Separator } from "@/components/ui/separator";
import LogoutButton from "./logout-button";
import { NavItems } from "../user/nav-items";
import Header from "../user/header";
import Dashboard from "../user/tabs/dashboard";
import Transactions from "../user/tabs/transactions";
import Investements from "../user/tabs/investements";

const userActivePlans = [
    { id: 1, name: "Voiture", dailyReturn: 0.001, capital: 7, active: true },
    { id: 2, name: "Moto", dailyReturn: 0.0015, capital: 5, active: false },
    { id: 3, name: "Camion", dailyReturn: 0.002, capital: 10, active: true },
];

const investmentPlans = [
    {
        id: 1,
        name: "Vélo 🚲",
        capital: 7,
        dailyReturn: 0.016,
        withdrawal: 0.112,
        totalReturn: 2.86,
        duration: 6,
    },
    {
        id: 2,
        name: "Moto 🏍️",
        capital: 25,
        dailyReturn: 0.012,
        withdrawal: 0.3,
        totalReturn: 7.71,
        duration: 6,
    },
    {
        id: 3,
        name: "Moto Eco+ 🏍️",
        capital: 50,
        dailyReturn: 0.0144,
        withdrawal: 0.72,
        totalReturn: 18.57,
        duration: 6,
    },
    {
        id: 4,
        name: "Voiture 🚗",
        capital: 110,
        dailyReturn: 0.0098,
        withdrawal: 1.078,
        totalReturn: 28.57,
        duration: 9,
    },
    {
        id: 5,
        name: "Voiture Eco+ 🚗",
        capital: 250,
        dailyReturn: 0.0088,
        withdrawal: 2.2,
        totalReturn: 57.14,
        duration: 10,
    },
    {
        id: 6,
        name: "Train",
        capital: 450,
        dailyReturn: 0.0066,
        withdrawal: 2.97,
        totalReturn: 78.57,
        duration: 15,
    },
    {
        id: 7,
        name: "Bateau",
        capital: 1200,
        dailyReturn: 0.0054,
        withdrawal: 6.48,
        totalReturn: 171.43,
        duration: 19,
    },
];

const transactionHistory = [
    { id: 1, type: "Dépôt", amount: 100, date: "2023-05-01" },
    { id: 2, type: "Retrait", amount: 50, date: "2023-05-15" },
    { id: 3, type: "Dépôt", amount: 200, date: "2023-06-01" },
];

export default function UserDashboard() {
    const [notifications, setNotifications] = useState([
        "Nouveau plan d'investissement disponible !",
        "Votre investissement 'Voiture' a généré 0.07$ aujourd'hui.",
    ]);

    const [showNotifications, setShowNotifications] = useState(false);
    const [activeTab, setActiveTab] = useState("dashboard");

    return (
        <div className="flex flex-col h-screen bg-gray-100">
            {/* Header */}
            <Header activeTab={activeTab} setActiveTab={setActiveTab} setShowNotifications={setShowNotifications} showNotifications={showNotifications} />

            {/* Main content */}
            <div className="flex flex-1 overflow-hidden">
                {/* Sidebar for larger screens */}
                <aside className="hidden md:block w-64 bg-white  border-r">
                    <nav className="mt-6">
                        <NavItems activeTab={activeTab} setActiveTab={setActiveTab} />
                    </nav>
                </aside>

                {/* Main content area */}
                <main className="flex-1 overflow-y-auto p-4 md:p-8">
                    <h1 className="text-3xl font-bold mb-6">
                        {activeTab === "dashboard" && "Tableau de bord"}
                        {activeTab === "investments" && "Investissements"}
                        {activeTab === "transactions" && "Transactions"}
                        {activeTab === "profile" && "Profil"}
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

                    {activeTab === "dashboard" && (
                        <Dashboard userActivePlans={userActivePlans} />
                    )}

                    {activeTab === "transactions" && (
                        <Transactions transactionHistory={transactionHistory} />
                    )}

                    {activeTab === "investments" && (
                        <Investements investmentPlans={investmentPlans} />
                    )}
                    {activeTab === "profile" && (
                        <div className="space-y-6">
                            <div>
                                <h3 className="text-lg font-medium">Account</h3>
                                <p className="text-sm text-muted-foreground">
                                    Mettez à jour les informations de votre
                                    compte.
                                </p>
                            </div>
                            <AccountForm />
                        </div>
                    )}
                </main>
            </div>
        </div>
    );
}
