
import {
    BarChart,
    DollarSign,
    Users,
    Truck,
    NotebookText ,
} from "lucide-react";
import Link from "next/link";
import { Separator } from "@/components/ui/separator";
export const NavItems = ( {setActiveTab, activeTab, isSuperAdmin}:{setActiveTab: React.Dispatch<React.SetStateAction<string>>, activeTab: string, isSuperAdmin: boolean}) => (
    <>
        <Link
            href="#"
            onClick={() => setActiveTab("overview")}
            className={`flex items-center px-4 py-3 ${activeTab === "overview" ? "bg-gray-200" : ""}`}
        >
            <BarChart className="mr-3 h-5 w-5" />
            Vue d'ensemble
        </Link>
        <Separator />
        <Link
            href="#"
            onClick={() => setActiveTab("investors")}
            className={`flex items-center px-4 py-3 ${activeTab === "investors" ? "bg-gray-200" : ""}`}
        >
            <Users className="mr-3 h-5 w-5" />
            Investisseurs
        </Link>
        <Separator />
        {isSuperAdmin && (
            <Link
                href="#"
                onClick={() => setActiveTab("admins")}
            className={`flex items-center px-4 py-3 ${activeTab === "admins" ? "bg-gray-200" : ""}`}
        >
            <Users className="mr-3 h-5 w-5" />
                Admins
            </Link>
        )}
        <Separator />
        <Link
            href="#"
            onClick={() => setActiveTab("requests")}
            className={`flex items-center px-4 py-3 ${activeTab === "requests" ? "bg-gray-200" : ""}`}
        >
            <DollarSign className="mr-3 h-5 w-5" />
            Demandes
        </Link>
        <Separator />
        <Link
            href="#"
            onClick={() => setActiveTab("vehicles")}
            className={`flex items-center px-4 py-3 ${activeTab === "vehicles" ? "bg-gray-200" : ""}`}
        >
            <Truck className="mr-3 h-5 w-5" />
            Véhicules
        </Link>
        <Separator />
        <Link
            href="#"
            onClick={() => setActiveTab("plans")}
            className={`flex items-center px-4 py-3 ${activeTab === "plans" ? "bg-gray-200" : ""}`}
        >
            <NotebookText  className="mr-3 h-5 w-5" />
            Plans
        </Link>
     
    </>
);