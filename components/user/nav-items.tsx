
import {
    BarChart,
    DollarSign,
    Home,
    User,
} from "lucide-react";
import Link from "next/link";
import { Separator } from "@/components/ui/separator";
export const NavItems = ({ setActiveTab, activeTab }: { setActiveTab: React.Dispatch<React.SetStateAction<string>>, activeTab: string }) => (
    <>
        <Link
            href="#"
            onClick={() => setActiveTab("dashboard")}
            className={`flex items-center px-4 py-3 ${activeTab === "dashboard" ? "bg-gray-200" : ""}`}
        >
            <Home className="mr-3 h-5 w-5" />
            Tableau de bord
        </Link>
        <Separator />
        <Link
            href="#"
            onClick={() => setActiveTab("investments")}
            className={`flex items-center px-4 py-3 ${activeTab === "investments" ? "bg-gray-200" : ""}`}
        >
            <DollarSign className="mr-3 h-5 w-5" />
            Investissements
        </Link>
        <Separator />
        <Link
            href="#"
            onClick={() => setActiveTab("transactions")}
            className={`flex items-center px-4 py-3 ${activeTab === "transactions" ? "bg-gray-200" : ""}`}
        >
            <BarChart className="mr-3 h-5 w-5" />
            Transactions
        </Link>
        <Separator />
        {/* <Link
            href="#"
            onClick={() => setActiveTab("profile")}
            className={`flex items-center px-4 py-3 ${activeTab === "profile" ? "bg-gray-200" : ""}`}
        >
            <User className="mr-3 h-5 w-5" />
            Profil
        </Link> */}
    </>
);