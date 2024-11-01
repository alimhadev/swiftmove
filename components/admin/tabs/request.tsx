import React from 'react'
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import {
    Dialog,
    DialogContent,
    DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from '@/components/ui/button';
import { Eye } from 'lucide-react';
import { getDepositRequests } from '@/lib/api';

interface IRequest {
    id: number;
    type: string;
    amount: number;
    user: string;
    status: string;
}
const UserRequests = ({ pendingRequests }: { pendingRequests: IRequest[] }) => {
    const depositQuery = useQuery({ queryKey: ['vehicles',], queryFn: getDepositRequests })
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
                        {pendingRequests.map((request) => (
                            <TableRow key={request.id}>
                                <TableCell>
                                    {request.type}
                                </TableCell>
                                <TableCell>
                                    ${request.amount}
                                </TableCell>
                                <TableCell>
                                    {request.user}
                                </TableCell>
                                <TableCell>
                                    {request.status}
                                </TableCell>
                                <TableCell className="flex gap-2">
                                    <Button size="sm">
                                        Approuver
                                    </Button>
                                </TableCell>
                                <TableCell className="">
                                    <Dialog>
                                        <DialogTrigger>
                                            <div className="flex h-8 w-8 items-center justify-center rounded-md border transition-colors hover:bg-muted">
                                                <Eye className="h-4 w-4" />
                                                <span className="sr-only">Open</span>
                                            </div>
                                        </DialogTrigger>
                                        <DialogContent>
                                            Autres infos
                                            nécessaires à
                                            afficher Email et
                                            Numéro de téléphone
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