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
import { getDepositRequests, approveDeposit } from '@/lib/api'
import { format } from 'date-fns'
import { useToast } from "@/hooks/use-toast"
import { getServerUrl } from '@/lib/utils'


const UserRequests = () => {
    const serverUrl = getServerUrl()
    const { toast } = useToast()
    const queryClient = useQueryClient()
    const depositQuery = useQuery({ queryKey: ['vehicles',], queryFn: getDepositRequests })
    console.log("depositQuery", depositQuery.data)
    const approveMutation = useMutation({
        mutationFn: approveDeposit,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['deposits'] })
            toast({
                title: "Demande de retrait approuvée",
                description: "Votre demande approuvée",
                variant: "default",
            })
        },
        onError(error, variables, context) {
            toast({
                title: "Erreur lors de l'approbation de la demande",
                description: error.message,
                variant: "destructive",
            })
        },
    })

    if (depositQuery.isLoading) {
        return <div>Loading...</div>
    }

    if (depositQuery.isError) {
        return <div>Error loading deposits</div>
    }

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
                        {depositQuery.data?.map((deposit) => (
                            <TableRow key={deposit.id}>
                                <TableCell>
                                    Dépôt
                                </TableCell>
                                <TableCell>
                                    {deposit.amount} FCFA
                                </TableCell>
                                <TableCell>
                                    {deposit.user.firstname} {deposit.user.lastname}
                                </TableCell>
                                <TableCell>
                                    {deposit.isValidated ? 'Approuvé' : 'En attente'}
                                </TableCell>
                                <TableCell>
                                    <Button 
                                        size="sm" 
                                        onClick={() => approveMutation.mutate(deposit.id)}
                                        disabled={deposit.isValidated || approveMutation.isPending}
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
                                                <DialogTitle>Détails du dépôt</DialogTitle>
                                            </DialogHeader>
                                            <div className="grid gap-4 py-4">
                                                <div className="grid grid-cols-4 items-center gap-4">
                                                    <span className="font-bold">Email:</span>
                                                    <span className="col-span-3">{deposit.user.email}</span>
                                                </div>
                                                <div className="grid grid-cols-4 items-center gap-4">
                                                    <span className="font-bold">Téléphone:</span>
                                                    <span className="col-span-3">{deposit.user.phoneNumber}</span>
                                                </div>
                                                <div className="grid grid-cols-4 items-center gap-4">
                                                    <span className="font-bold">Méthode:</span>
                                                    <span className="col-span-3">{deposit.method}</span>
                                                </div>
                                                <div className="grid grid-cols-4 items-center gap-4">
                                                    <span className="font-bold">Date:</span>
                                                    <span className="col-span-3">{format(new Date(deposit.createdAt), 'dd/MM/yyyy HH:mm')}</span>
                                                </div>
                                                <div className="grid grid-cols-4 items-center gap-4">
                                                    <span className="font-bold">Photo:</span>
                                                    <img src={`${serverUrl}/deposit-file/${deposit.photo}`} alt="Preuve de dépôt" className="col-span-3 max-w-full h-auto" />
                                                </div>
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