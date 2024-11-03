'use client'

import React, { useState } from 'react'
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import {
    BarChart,
    DollarSign,
    PlusCircle,
    RefreshCw,
} from "lucide-react"
import { Button } from '@/components/ui/button'
import { useAppContext } from '@/hooks/appProvider'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { userIncrease, getUserActivePlans, subscribeToPlan } from '@/lib/api'
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { useToast } from "@/hooks/use-toast"


type Plan = {
    id: number;
    state: string;
    investmentPlan: {
        name: string;
        amount: number;
        incomePercentage: number;
        vehicle?: {
            name: string;
        };
    };
}

const PlanDetailsDialog = ({ plan }: { plan: Plan }) => (
    <Dialog>
        <DialogTrigger asChild>
            <Button variant="outline">Voir les détails</Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
                <DialogTitle>{plan.investmentPlan.name}</DialogTitle>
                <DialogDescription>
                    Détails de votre plan d'investissement
                </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
                <div className="grid grid-cols-4 items-center gap-4">
                    <span className="font-bold">Véhicule:</span>
                    <span className="col-span-3">{plan.investmentPlan.vehicle?.name || 'Non spécifié'}</span>
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                    <span className="font-bold">Capital:</span>
                    <span className="col-span-3">{plan.investmentPlan.amount} FCFA</span>
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                    <span className="font-bold">Rendement:</span>
                    <span className="col-span-3">{plan.investmentPlan.incomePercentage * 100}% par jour</span>
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                    <span className="font-bold">État:</span>
                    <span className="col-span-3">{plan.state === 'active' ? 'Actif' : 'Inactif'}</span>
                </div>
            </div>
        </DialogContent>
    </Dialog>
)

const Dashboard = ({ setActiveTab,}: { setActiveTab: React.Dispatch<React.SetStateAction<string>> }) => {
    const { user } = useAppContext()
    const { toast } = useToast()
    const { data: userIncreases } = useQuery({ queryKey: ['increase'], queryFn: userIncrease })
    const { data: userActivePlans,  } = useQuery({ queryKey: ['userActivePlans'], queryFn: getUserActivePlans })
    const queryClient = useQueryClient()
    const subscribeMutation = useMutation({
        mutationFn: subscribeToPlan,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['investmentPlans'] })
            // TODO:invalidate user query
            toast({
                title: "Souscription effectuée",
                description: "Vous êtes maintenant inscrit à ce plan d'investissement",
                variant: "default",
            })
        },
        onError(error, variables, context) {
            toast({
                title: "Erreur lors de la souscription",
                description: error.message,
                variant: "destructive",
            })
        },
    })
    function getIncreasesCreatedToday(investments: Investment[]): number {
        const today = new Date()
        today.setHours(0, 0, 0, 0)

        return investments.reduce((total, investment) => {
            return total + investment.increases.reduce((subtotal, increase) => {
                const increaseDate = new Date(increase.createdAt)
                increaseDate.setHours(0, 0, 0, 0)
                return increaseDate.getTime() === today.getTime() ? subtotal + increase.amount : subtotal
            }, 0)
        }, 0)
    }

    return (
        <div className="space-y-6">
            <div className="rounded-xl bg-gradient-to-r from-blue-500 to-green-500 text-white p-8">
                <div className="container mx-auto flex justify-between items-center">
                    <div className="max-w-2xl">
                        <h2 className="text-3xl font-bold mb-2">
                            Investissez dans l'avenir des livraisons rapides et vertes
                        </h2>
                        <p className="text-xl">
                            Choisissez votre véhicule et regardez vos gains croître !
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
                            {user?.totalInvestments} FCFA
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
                            {userIncreases ? getIncreasesCreatedToday(userIncreases) : 0} FCFA
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
                            {userActivePlans?.length || 0}
                        </div>
                    </CardContent>
                </Card>
            </div>
            <Card>
                <CardHeader className="flex-col-reverse min-[500px]:flex-row gap-10 justify-between items-center">
                    <CardTitle>
                        Mes investissements en cours
                    </CardTitle>
                    <Button onClick={() => setActiveTab("investments")}>
                        <PlusCircle className="mr-2 h-4 w-4" />
                        Nouveau plan
                    </Button>
                </CardHeader>
                <CardContent>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                        {userActivePlans?.map((plan) => (
                            <Card key={plan.id}>
                                <CardHeader>
                                    <CardTitle>{plan.investmentPlan.name} | {plan.investmentPlan.vehicle?.name}</CardTitle>
                                    <CardDescription>
                                        Capital: {plan.investmentPlan.amount} FCFA |
                                        Rendement quotidien: {plan.investmentPlan.incomePercentage * 100}%
                                    </CardDescription>
                                </CardHeader>
                                <CardContent>
                                    <p>
                                        État : {plan.state === "active" ? "Actif" : "Inactif"}
                                    </p>
                                </CardContent>
                                <CardFooter>
                                    {plan.state === "active" ? (
                                        <PlanDetailsDialog plan={plan} />
                                    ) : (
                                        <Button onClick={async () => await subscribeMutation.mutateAsync({ investmentPlanId: plan.investmentPlanId })}>
                                            Réactiver
                                        </Button>
                                    )}
                                </CardFooter>
                            </Card>
                        ))}
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}

export default Dashboard