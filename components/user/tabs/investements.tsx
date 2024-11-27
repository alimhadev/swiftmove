import React from 'react'
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { Button } from '@/components/ui/button'
import { Progress } from "@/components/ui/progress"
import { getInvestmentPlans, subscribeToPlan, getUserActivePlans } from '@/lib/api'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { useToast } from "@/hooks/use-toast"
import { CheckCircle } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { calculateProgress } from '@/lib/utils'

const Investments = () => {
    const router = useRouter()
    const { toast } = useToast()
    const { data: investmentPlans, isLoading: isLoadingInvestmentPlans } = useQuery({ queryKey: ['investmentPlans'], queryFn: getInvestmentPlans })
    const { data: userActivePlans, } = useQuery({ queryKey: ['userActivePlans'], queryFn: getUserActivePlans })
    const queryClient = useQueryClient()
    const subscribeMutation = useMutation({
        mutationFn: subscribeToPlan,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['investmentPlans'] })
            queryClient.invalidateQueries({ queryKey: ['userActivePlans'] })
            router.refresh()
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

    const isPlanActive = (planId: number) => {
        return userActivePlans?.some(activePlan => activePlan.id === planId) ?? false
    }


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
                {investmentPlans.map((plan) => {
                    const isActive = isPlanActive(plan.id!)
                    return (
                        <Card key={plan.id} className={isActive ? "border-primary" : ""}>
                            <CardHeader>
                                <div className="flex justify-between items-start">
                                    <CardTitle>{plan.name} | {plan.vehicle?.name}</CardTitle>
                                    {isActive && <CheckCircle className="text-primary" />}
                                </div>
                                <CardDescription>
                                    Capital: {plan.amount} FCFA |
                                    Rendement Total: {plan.incomePercentage}% <br />
                                    Rendement quotidien: {(plan.incomePercentage / (plan.durationInMonth * 26)).toFixed(2)}%
                                </CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <p>Durée: {plan.durationInMonth} mois</p>
                                <p>Retrait: {plan.minimumWithdrawalAmount} FCFA</p>
                                {isActive && (
                                    <div className="space-y-2">
                                        <div className="flex justify-between text-sm">
                                            <span>Progression</span>
                                            {/* @ts-ignore */}
                                            <span>{calculateProgress(userActivePlans?.find(usrPlan => usrPlan.id === plan.id)?.createdAt, plan.durationInMonth)}%</span>
                                        </div>
                                        {/* @ts-ignore */}
                                        <Progress value={calculateProgress(userActivePlans?.find(usrPlan => usrPlan.id === plan.id)?.createdAt, plan.durationInMonth)} className="w-full" />
                                    </div>
                                )}
                            </CardContent>
                            <CardFooter>
                                <Button
                                    onClick={async () => await subscribeMutation.mutateAsync({ investmentPlanId: plan.id })}
                                    disabled={isActive}
                                    variant={isActive ? "outline" : "default"}
                                >
                                    {isActive ? "Souscrit" : "Souscrire"}
                                </Button>
                            </CardFooter>
                        </Card>
                    )
                })}
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

export default Investments

