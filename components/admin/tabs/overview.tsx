import React from 'react'
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { DollarSign, Users, BarChart } from 'lucide-react';
import { ScrollArea } from '@/components/ui/scroll-area';
import { useQuery } from '@tanstack/react-query';
import { getDepositRequests, getTotalInvestments, getUsers, getWithdrawalRequests } from '@/lib/api';

interface Deposit {
    id: number;
    amount: string;
    method: string;
    userId: number;
    createdAt: string;
    user: { name: string };
}

interface Withdrawal {
    id: number;
    amount: string;
    method: string;
    userId: number;
    createdAt: string;
    user: { name: string };
}

const Overview = () => {
    const { data: totalInvestments } = useQuery({ queryKey: ['totalInvestments'], queryFn: getTotalInvestments })
    const { data: users } = useQuery({ queryKey: ['users'], queryFn: getUsers })
    const depositQuery = useQuery({ queryKey: ['deposits'], queryFn: getDepositRequests })
    const withdrawalQuery = useQuery({ queryKey: ['withdrawals'], queryFn: getWithdrawalRequests })

    const totalDeposits = depositQuery.data?.length || 0
    const totalWithdrawals = withdrawalQuery.data?.length || 0
    const totalTransactions = totalDeposits + totalWithdrawals

    const getLastActivities = () => {
        const deposits = depositQuery.data?.slice(-4).map(deposit => ({
            message: `${deposit.user.firstname} ${deposit.user.lastname} a fait une demande de dépôt de ${deposit.amount} FCFA`,
            date: new Date(deposit.createdAt)
        })) || [];

        const withdrawals = withdrawalQuery.data?.slice(-4).map(withdrawal => ({
            message: `${withdrawal.user.firstname} ${withdrawal.user.lastname} a retiré ${withdrawal.amount} FCFA de son compte`,
            date: new Date(withdrawal.createdAt)
        })) || [];

        return [...deposits, ...withdrawals]
            .sort((a, b) => b.date.getTime() - a.date.getTime())
            .slice(0, 8);
    }

    const lastActivities = getLastActivities();

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
                            {totalInvestments?.totalInvestments} FCFA
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
                            {users?.length || 0}
                        </div>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">
                            Total des transactions
                        </CardTitle>
                        <BarChart className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">
                            {totalTransactions}
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
                        {depositQuery.isLoading || withdrawalQuery.isLoading ? (
                            <p>Chargement des activités...</p>
                        ) : depositQuery.isError || withdrawalQuery.isError ? (
                            <p>Une erreur est survenue lors du chargement des activités.</p>
                        ) : lastActivities.length === 0 ? (
                            <p>Aucune activité récente.</p>
                        ) : (
                            <ul className="space-y-2">
                                {lastActivities.map((activity, index) => (
                                    <li key={index}>
                                        {activity.message}
                                    </li>
                                ))}
                            </ul>
                        )}
                    </ScrollArea>
                </CardContent>
            </Card>
        </div>
    )
}
export default Overview