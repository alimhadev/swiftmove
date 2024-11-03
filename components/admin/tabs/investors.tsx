import React from 'react'
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { useQuery } from '@tanstack/react-query';
import { getUsers } from '@/lib/api';


const Investor = () => {
    const { data: users, } = useQuery({ queryKey: ['investmentPlans'], queryFn: getUsers })
    return (
        <Card>
            <CardHeader>
                <CardTitle>Liste des investisseurs</CardTitle>
            </CardHeader>
            <CardContent>
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Nom</TableHead>
                            <TableHead>Email</TableHead>
                            <TableHead>Total investi</TableHead>
                            {/* <TableHead>
                                Investissements actifs
                            </TableHead> */}
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {users?.map((investor) => (
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
                                {/* <TableCell>
                                    {investor.}
                                </TableCell> */}
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </CardContent>
        </Card>
    )
}

export default Investor