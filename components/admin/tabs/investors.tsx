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

interface IInvestor {
    id: number;
    name: string;
    email: string;
    totalInvestment: number;
    activeInvestments: number;

}
const Investor = ({investors}: { investors: IInvestor[] }) => {
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
                            <TableHead>
                                Investissements actifs
                            </TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {investors.map((investor) => (
                            <TableRow key={investor.id}>
                                <TableCell>
                                    {investor.name}
                                </TableCell>
                                <TableCell>
                                    {investor.email}
                                </TableCell>
                                <TableCell>
                                    ${investor.totalInvestment}
                                </TableCell>
                                <TableCell>
                                    {investor.activeInvestments}
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </CardContent>
        </Card>
    )
}

export default Investor