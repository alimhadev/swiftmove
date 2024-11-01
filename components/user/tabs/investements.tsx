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
const Investements = ({ investmentPlans }: {
    investmentPlans: {
        id: number;
        name: string;
        capital: number;
        dailyReturn: number;
        withdrawal: number;
        totalReturn: number;
        duration: number;
    }[]
}) => {
    return (
        <div className="space-y-4">
            <h2 className="text-2xl font-bold">
                Plans d'investissement
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {investmentPlans.map((plan) => (
                    <Card key={plan.id}>
                        <CardHeader>
                            <CardTitle>{plan.name}</CardTitle>
                            <CardDescription>
                                Capital: ${plan.capital} |
                                Rendement quotidien:{" "}
                                {plan.dailyReturn * 100}%
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <p>Durée: {plan.duration} mois</p>
                            <p>Retrait: ${plan.withdrawal}</p>
                            <p>
                                Rendement total: $
                                {plan.totalReturn}
                            </p>
                        </CardContent>
                        <CardFooter>
                            <Button>Souscrire</Button>
                        </CardFooter>
                    </Card>
                ))}
            </div>
        </div>
    )
}

export default Investements