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




export default function UserDashboard() {
    const [activeTab, setActiveTab] = useState("dashboard");

    return (
        <div className="flex flex-col h-screen bg-gray-100">
            {/* Header */}
            <Header activeTab={activeTab} setActiveTab={setActiveTab}  />

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
                    {activeTab === "dashboard" && (
                        <Dashboard setActiveTab={setActiveTab} />
                    )}
                    {activeTab === "transactions" && (
                        <Transactions  />
                    )}
                    {activeTab === "investments" && (
                        <Investements />
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
