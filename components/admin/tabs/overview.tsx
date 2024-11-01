import React from 'react'
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { DollarSign, Users, BarChart } from 'lucide-react';
import { ScrollArea } from '@/components/ui/scroll-area';
const Overview = () => {
    return (
        <div className="space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">
                            Total des investissements
                        </CardTitle>
                        <DollarSign className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">
                            $33,000
                        </div>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">
                            Nombre d'investisseurs
                        </CardTitle>
                        <Users className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">
                            3
                        </div>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">
                            Demandes en attente
                        </CardTitle>
                        <BarChart className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">
                            3
                        </div>
                    </CardContent>
                </Card>
            </div>

            <Card>
                <CardHeader>
                    <CardTitle>Dernières activités</CardTitle>
                </CardHeader>
                <CardContent>
                    <ScrollArea className="h-[200px]">
                        <ul className="space-y-2">
                            <li>
                                Alice Johnson a investi 5000$
                                dans le plan 'Voiture'
                            </li>
                            <li>
                                Nouveau véhicule
                                d'investissement 'Scooter' créé
                            </li>
                            <li>
                                Bob Smith a retiré 2000$ de son
                                compte
                            </li>
                            <li>
                                Charlie Brown a rejoint la
                                plateforme
                            </li>
                        </ul>
                    </ScrollArea>
                </CardContent>
            </Card>
        </div>
    )
}

export default Overview