'use client'

import React, { useState } from 'react'
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { getUsers, setUserRole } from '@/lib/api'
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Switch } from "@/components/ui/switch"
import { useToast } from "@/hooks/use-toast"


export default function Investor() {
    const { toast } = useToast();
    const [searchTerm, setSearchTerm] = useState('')
    const queryClient = useQueryClient()
    const { data: users = [] } = useQuery({ queryKey: ['users'], queryFn: getUsers })

    const updateRoleMutation = useMutation({
        mutationFn: setUserRole,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['users'] })
            toast({
                title: "Rôle mis à jour avec succès",
                description: "Le rôle a été mis à jour avec succès",
            });
        },
    })

    const filteredUsers = users.filter(user => 
        user.email.toLowerCase().includes(searchTerm.toLowerCase())
    )

    const handleRoleToggle = (userId: number, ) => {
        updateRoleMutation.mutate(userId)
    }

    return (
        <Card className="w-full">
            <CardHeader>
                <CardTitle>Liste des investisseurs</CardTitle>
                <div className="flex items-center space-x-2">
                    <Input
                        type="text"
                        placeholder="Rechercher par email"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="max-w-sm"
                    />
                    <Button 
                        onClick={() => setSearchTerm('')}
                        variant="outline"
                    >
                        Réinitialiser
                    </Button>
                </div>
            </CardHeader>
            <CardContent>
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Nom</TableHead>
                            <TableHead>Email</TableHead>
                            <TableHead>Total investi</TableHead>
                            <TableHead>Admin</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {filteredUsers.map((investor) => (
                            <TableRow key={investor.id}>
                                <TableCell>
                                    {investor.lastname} {investor.firstname}
                                </TableCell>
                                <TableCell>
                                    {investor.email}
                                </TableCell>
                                <TableCell>
                                    ${investor.totalInvestments}
                                </TableCell>
                                <TableCell>
                                    <Switch
                                        checked={investor.isAdmin}
                                        onCheckedChange={() => handleRoleToggle(investor.id!)}
                                        aria-label={`Toggle admin role for ${investor.firstname} ${investor.lastname}`}
                                    />
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </CardContent>
        </Card>
    )
}