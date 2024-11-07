'use client'

import React from 'react'
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Button } from '@/components/ui/button'
import { Eye } from 'lucide-react'
import { getDepositRequests, approveDeposit, getWithdrawalRequests, approveWithdrawal } from '@/lib/api'
import { format } from 'date-fns'
import { useToast } from "@/hooks/use-toast"
import { getServerUrl } from '@/lib/utils'



const UserRequests = () => {
    const serverUrl = getServerUrl()
    const { toast } = useToast()
    const queryClient = useQueryClient()
    const depositQuery = useQuery<Deposit[]>({ queryKey: ['deposits'], queryFn: getDepositRequests })
    const withdrawalQuery = useQuery<Withdrawal[]>({ queryKey: ['withdrawals'], queryFn: getWithdrawalRequests })

    const approveMutation = useMutation({
        mutationFn: (data: { id: number, type: 'deposit' | 'withdrawal' }) => 
            data.type === 'deposit' ? approveDeposit(data.id) : approveWithdrawal(data.id),
        onSuccess: (_, variables) => {
            queryClient.invalidateQueries({ queryKey: [variables.type === 'deposit' ? 'deposits' : 'withdrawals'] })
            toast({
                title: `Demande de ${variables.type === 'deposit' ? 'dépôt' : 'retrait'} approuvée`,
                description: "La demande a été approuvée avec succès",
                variant: "default",
            })
        },
        onError: (error: Error) => {
            toast({
                title: "Erreur lors de l'approbation de la demande",
                description: error.message,
                variant: "destructive",
            })
        },
    })

    if (depositQuery.isLoading || withdrawalQuery.isLoading) {
        return <div>Chargement...</div>
    }

    if (depositQuery.isError || withdrawalQuery.isError) {
        return <div>Erreur lors du chargement des demandes</div>
    }

    const allRequests = [
        ...(depositQuery.data?.map(deposit => ({ ...deposit, type: 'deposit' as const })) || []),
        ...(withdrawalQuery.data?.map(withdrawal => ({ ...withdrawal, type: 'withdrawal' as const })) || [])
    ].sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())

    return (
        <Card>
            <CardHeader>
                <CardTitle>Demandes en attente</CardTitle>
            </CardHeader>
            <CardContent>
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Type</TableHead>
                            <TableHead>Montant</TableHead>
                            <TableHead>Utilisateur</TableHead>
                            <TableHead>Statut</TableHead>
                            <TableHead>Action</TableHead>
                            <TableHead>Details</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {allRequests.map((request) => (
                            <TableRow key={`${request.type}-${request.id}`}>
                                <TableCell>
                                    {request.type === 'deposit' ? 'Dépôt' : 'Retrait'}
                                </TableCell>
                                <TableCell>
                                    {request.amount} FCFA
                                </TableCell>
                                <TableCell>
                                    {request.user.firstname} {request.user.lastname}
                                </TableCell>
                                <TableCell>
                                    {request.isValidated ? 'Approuvé' : 'En attente'}
                                </TableCell>
                                <TableCell>
                                    <Button 
                                        size="sm" 
                                        onClick={() => approveMutation.mutate({ id: request.id, type: request.type })}
                                        disabled={request.isValidated || approveMutation.isPending}
                                    >
                                        {approveMutation.isPending ? 'Approbation...' : 'Approuver'}
                                    </Button>
                                </TableCell>
                                <TableCell>
                                    <Dialog>
                                        <DialogTrigger asChild>
                                            <Button variant="outline" size="icon">
                                                <Eye className="h-4 w-4" />
                                                <span className="sr-only">Voir les détails</span>
                                            </Button>
                                        </DialogTrigger>
                                        <DialogContent>
                                            <DialogHeader>
                                                <DialogTitle>Détails de la {request.type === 'deposit' ? 'dépôt' : 'retrait'}</DialogTitle>
                                            </DialogHeader>
                                            <div className="grid gap-4 py-4">
                                                <div className="grid grid-cols-4 items-center gap-4">
                                                    <span className="font-bold">Email:</span>
                                                    <span className="col-span-3">{request.user.email}</span>
                                                </div>
                                                <div className="grid grid-cols-4 items-center gap-4">
                                                    <span className="font-bold">Téléphone:</span>
                                                    <span className="col-span-3">{request.user.phoneNumber}</span>
                                                </div>
                                                <div className="grid grid-cols-4 items-center gap-4">
                                                    <span className="font-bold">Méthode:</span>
                                                    <span className="col-span-3">{request.method}</span>
                                                </div>
                                                <div className="grid grid-cols-4 items-center gap-4">
                                                    <span className="font-bold">Date:</span>
                                                    <span className="col-span-3">{format(new Date(request.createdAt), 'dd/MM/yyyy HH:mm')}</span>
                                                </div>
                                                {request.type === 'deposit' && (
                                                    <div className="grid grid-cols-4 items-center gap-4">
                                                        <span className="font-bold">Photo:</span>
                                                        <img src={`${serverUrl}/deposit-file/${request.photo}`} alt="Preuve de dépôt" className="col-span-3 max-w-full h-auto" />
                                                    </div>
                                                )}
                                                {request.type === 'withdrawal' && (
                                                    <div className="grid grid-cols-4 items-center gap-4">
                                                        <span className="font-bold">Coût:</span>
                                                        <span className="col-span-3">{request.cost} FCFA</span>
                                                    </div>
                                                )}
                                            </div>
                                        </DialogContent>
                                    </Dialog>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </CardContent>
        </Card>
    )
}

export default UserRequests