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
import { getAdmins, setUserRole } from '@/lib/api'
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Switch } from "@/components/ui/switch"
import { useToast } from "@/hooks/use-toast"
import { AdminDetailsModal } from '@/components/admin/admin-details-modal'

export default function Admins() {
    const { toast } = useToast();
    const [searchTerm, setSearchTerm] = useState('')
    const [selectedUser, setSelectedUser] = useState<User | null>(null)
    const queryClient = useQueryClient()
    const { data: users = [] } = useQuery({ queryKey: ['users'], queryFn: getAdmins })

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

    const handleRoleToggle = (userId: number) => {
        updateRoleMutation.mutate(userId)
    }

    const handleDetailsClick = (user: User) => {
        setSelectedUser(user)
    }

    return (
        <Card className="w-full">
            <CardHeader>
                <CardTitle>Liste des administrateurs</CardTitle>
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
                            <TableHead>Actions</TableHead>
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
                                        onCheckedChange={() => handleRoleToggle(investor.id)}
                                        aria-label={`Toggle admin role for ${investor.firstname} ${investor.lastname}`}
                                    />
                                </TableCell>
                                <TableCell>
                                    <Button
                                        onClick={() => handleDetailsClick(investor)}
                                        variant="outline"
                                        size="sm"
                                    >
                                        Détails
                                    </Button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </CardContent>
            {selectedUser && (
                <AdminDetailsModal
                    user={selectedUser}
                    isOpen={!!selectedUser}
                    onClose={() => setSelectedUser(null)}
                />
            )}
        </Card>
    )
}

