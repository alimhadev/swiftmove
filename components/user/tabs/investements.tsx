import React from 'react'
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Button } from '@/components/ui/button';
import { getInvestmentPlans, subscribeToPlan } from '@/lib/api'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useToast } from "@/hooks/use-toast"

const Investements = () => {
    const { toast } = useToast()
    const { data: investmentPlans, isLoading: isLoadingInvestmentPlans } = useQuery({ queryKey: ['investmentPlans'], queryFn: getInvestmentPlans })
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

    const renderContent = () => {
        if (isLoadingInvestmentPlans) {
            return (
                <Card>
                    <CardContent className="flex items-center justify-center h-40">
                        <p>Chargement des plans d'investissement...</p>
                    </CardContent>
                </Card>
            )
        }

        if (!investmentPlans || investmentPlans.length === 0) {
            return (
                <Card>
                    <CardContent className="flex items-center justify-center h-40">
                        <p>Aucun plan d'investissement disponible pour le moment.</p>
                    </CardContent>
                </Card>
            )
        }

        return (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {investmentPlans.map((plan) => (
                    <Card key={plan.id}>
                        <CardHeader>
                            <CardTitle>{plan.name} | {plan.vehicle?.name}</CardTitle>
                            <CardDescription>
                                Capital: {plan.amount} FCFA |
                                Rendement quotidien: {plan.incomePercentage * 100}%
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <p>Durée: {plan.durationInMonth} mois</p>
                            <p>Retrait: {plan.minimumWithdrawalAmount} FCFA</p>
                            <p>
                                Rendement total: {plan.durationInDay * plan.incomePercentage * 100}%
                            </p>
                        </CardContent>
                        <CardFooter>
                            <Button onClick={async () => await subscribeMutation.mutateAsync({ investmentPlanId: plan.id! })}>
                                Souscrire
                            </Button>
                        </CardFooter>
                    </Card>
                ))}
            </div>
        )
    }

    return (
        <div className="space-y-4">
            <h2 className="text-2xl font-bold">
                Plans d'investissement
            </h2>
            {renderContent()}
        </div>
    )
}

export default Investements