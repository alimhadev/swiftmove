import React from 'react'
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
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
import { Button } from '@/components/ui/button';
import { useAppContext } from '@/hooks/appProvider';
const Dashboard = ({ userActivePlans }: {
    userActivePlans: {
        id: number;
        name: string;
        dailyReturn: number;
        capital: number;
        active: boolean;
    }[]
}) => {
    return (
        <div className="space-y-6">
            <div className="rounded-xl bg-gradient-to-r from-blue-500 to-green-500 text-white p-8">
                <div className="container mx-auto flex justify-between items-center">
                    <div className="max-w-2xl">
                        <h2 className="text-3xl font-bold mb-2">
                            Investissez dans l'avenir des
                            livraisons rapides et vertes
                        </h2>
                        <p className="text-xl">
                            Choisissez votre véhicule et
                            regardez vos gains croître !
                        </p>
                    </div>
                </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">
                            Total des investissements
                        </CardTitle>
                        <DollarSign className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">
                            $45,231.89
                        </div>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">
                            Revenus journaliers
                        </CardTitle>
                        <BarChart className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">
                            $12.34
                        </div>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">
                            Plans actifs
                        </CardTitle>
                        <RefreshCw className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">
                            2
                        </div>
                    </CardContent>
                </Card>
            </div>
            <Card>
                <CardHeader className="flex-col-reverse min-[500px]:flex-row gap-10 justify-between items-center">
                    <CardTitle>
                        Mes investissements en cours
                    </CardTitle>
                    <Button>
                        <PlusCircle className="mr-2 h-4 w-4" />
                        Nouveau plan
                    </Button>
                </CardHeader>
                <CardContent>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                        {userActivePlans.map((plan) => (
                            <Card key={plan.id}>
                                <CardHeader>
                                    <CardTitle>
                                        {plan.name}
                                    </CardTitle>
                                    <CardDescription>
                                        Revenu journalier :{" "}
                                        {plan.dailyReturn * 100}
                                        % | Capital : $
                                        {plan.capital}
                                    </CardDescription>
                                </CardHeader>
                                <CardContent>
                                    <p>
                                        État :{" "}
                                        {plan.active
                                            ? "Actif"
                                            : "Inactif"}
                                    </p>
                                </CardContent>
                                <CardFooter>
                                    {plan.active ? (
                                        <Button variant="outline">
                                            Voir les détails
                                        </Button>
                                    ) : (
                                        <Button>
                                            Réactiver
                                        </Button>
                                    )}
                                </CardFooter>
                            </Card>
                        ))}
                    </div>
                </CardContent>
                {/* <CardFooter>
            <Button>
                <PlusCircle className="mr-2 h-4 w-4" />
                Nouveau plan
            </Button>
        </CardFooter> */}
            </Card>
        </div>
    )
}

export default Dashboard