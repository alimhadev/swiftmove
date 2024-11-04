import React, { useEffect, useState } from 'react'
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
} from "@/components/ui/table"
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { useMutation, useQuery, useQueryClient, useSuspenseQuery } from '@tanstack/react-query';
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { useToast } from "@/hooks/use-toast"
import { SubmitDepositRequest, SubmitWithdrawalRequest, getUserWithdrawalRequests, getUserDepositRequests } from '@/lib/api';

const Transactions = () => {
    const { toast } = useToast()
    const [selectedDepositMethod, setSelectedDepositMethod] = useState<"MOOV" | "T-MONEY" | "USDT" | undefined>(undefined)
    const [depositAmount, setDepositAmount] = useState<number>(0)

    const queryClient = useQueryClient()
    const userWithdrawalRequestsQuery = useQuery({ queryKey: ['userWithdrawalRequests'], queryFn: getUserWithdrawalRequests })
    const userDepositRequestsQuery = useSuspenseQuery({ queryKey: ['userDepositRequests'], queryFn: getUserDepositRequests })

    const createDepositMutation = useMutation({
        mutationFn: SubmitDepositRequest,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['userDepositRequests'] })
            toast({
                title: "Dépôt effectué",
                description: "Votre dépôt a bien été soumis et sera traité prochainement",
                variant: "default",
            })
        },
        onError(error, variables, context) {
            toast({
                title: "Erreur lors du dépôt",
                description: error.message,
                variant: "destructive",
            })
        },
    })
    const createWithdrawalMutation = useMutation({
        mutationFn: SubmitWithdrawalRequest,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['userDepositRequests'] })
            toast({
                title: "Demande de retrait effectuée",
                description: "Votre demande de retrait a bien été effectuée et sera traitée prochainement",
                variant: "default",
            })
        },
        onError(error, variables, context) {
            toast({
                title: "Erreur lors de la demande de retrait",
                description: error.message,
                variant: "destructive",
            })
        },
    })
    const ACCEPTED_IMAGE_TYPES = [
        'image/jpeg',
        'image/jpg',
        'image/png',
        'image/webp',
    ]
    type DepositMethod = "MOOV" | "T-MONEY" | "USDT"

    type DepositMethodInfo = {
        method: DepositMethod;
        message: (depositAmount?: number) => React.ReactNode;

    };
    const depositMethodInfo: DepositMethodInfo[] = [
        {
            message: (depositAmount) => <p>Veuillez effectuer le depot de <span className='font-bold'>{depositAmount} FCFA </span> en tapant le code  <span className='font-bold'>*145*5*${depositAmount}*34903#</span></p>,
            method: "MOOV",
        },
        {
            message: (depositAmount) => <p>Veuillez effectuer le depot de <span className='font-bold'>{depositAmount} FCFA </span> en tapant le code <span className='font-bold'>*145*2*{depositAmount}*37990#</span></p>,
            method: "T-MONEY",
        },
        {
            message: (depositAmount) => <p>
                Veuillez envoyer <span className='font-bold'>{depositAmount} USDT </span> à l'adresse suivante : <span className='font-bold'>TB7j7UE1bU4QepLW96NE89BRB5se4vaWip</span>
            </p>,
            method: "USDT",
        },
    ]

    const MAX_FILE_SIZE = 2000000
    const imageSchema = z.instanceof(File)
        .refine((file) => ACCEPTED_IMAGE_TYPES.includes(file?.type), {
            message: 'Seuls les formats .jpg, .jpeg, .png sont acceptés.',
        })
        .refine((file) => file?.size <= MAX_FILE_SIZE, {
            message: `La taille maximale autorisée est de ${MAX_FILE_SIZE / 1000000}MB.`,
        })
    const depositFormSchema = z.object({
        amount: z.number().min(0),
        method: z.enum(['MOOV', 'T-MONEY', 'USDT']),
        photo: imageSchema
    })
    const withdrawalFormSchema = z.object({
        amount: z.number().min(0),
        method: z.enum(['MOOV', 'T-MONEY', 'USDT']),
        phoneNumber: z.string().min(8),
        cost: z.number().min(0),
        userId: z.number().min(1),
        isValitated: z.boolean().optional(),
    })
    const withdrawalForm = useForm<z.infer<typeof withdrawalFormSchema>>({
        resolver: zodResolver(withdrawalFormSchema),
        defaultValues: {
            amount: 0,
            phoneNumber: "0",
            cost: 0,
            userId: 5,
            isValitated: false,

        },
    })

    const depositForm = useForm<z.infer<typeof depositFormSchema>>({
        resolver: zodResolver(depositFormSchema),
        defaultValues: {
            amount: 0,
        },
    })

    const { watch } = depositForm;

    const onDepositSubmit = async (values: z.infer<typeof depositFormSchema>) => {
        // TODO: remove the isValidated 
        if (values.photo instanceof File) {
            const formData = new FormData();
            formData.append("photo", values.photo, values.photo.name);
            formData.append("amount", values.amount.toString());
            formData.append("method", values.method);
            formData.append("isValitated", false.toString());

            createDepositMutation.mutateAsync(formData)
        }
        depositForm.reset();

    }
    const withdrawalSubmit = async (values: z.infer<typeof withdrawalFormSchema>) => {
        // TODO: remove the isValidated 

        createWithdrawalMutation.mutateAsync(values)
        // reset();

    }

    useEffect(() => {
        const subscription = watch((value, { name, }) => {
            if (name === "method") {
                setSelectedDepositMethod(value.method)
            }
            if (name === "amount") {
                setDepositAmount(value.amount || 0)
            }
        });
        return () => subscription.unsubscribe();
    }, [watch]);
    return (
        <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card>
                    <CardHeader>
                        <CardTitle>Demande de dépôt</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <Form {...depositForm}>
                            <form className="space-y-4" onSubmit={depositForm.handleSubmit(onDepositSubmit)}>
                                <FormField
                                    control={depositForm.control}
                                    name="amount"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Montant</FormLabel>
                                            <FormControl>
                                                <Input placeholder="Montant" {...field} onChange={(e) => {
                                                    if (/^\d*$/.test(e.target.value)) {
                                                        field.onChange(parseInt(e.target.value))
                                                    }
                                                }} />
                                            </FormControl>
                                            <FormDescription>
                                                Montant du plan
                                            </FormDescription>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />

                                <FormField
                                    control={depositForm.control}
                                    name="method"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Méthode de dépôt</FormLabel>
                                            <FormControl>
                                                <Select
                                                    onValueChange={field.onChange}
                                                    value={field.value}
                                                >
                                                    <SelectTrigger>
                                                        <SelectValue placeholder="Sélectionnez une méthode de dépôt" />
                                                    </SelectTrigger>
                                                    <SelectContent>

                                                        {
                                                            depositMethodInfo.map((method) => (
                                                                <SelectItem key={method.method} value={method.method}>
                                                                    {method.method}
                                                                </SelectItem>
                                                            ))}

                                                    </SelectContent>
                                                </Select>
                                            </FormControl>
                                            <FormDescription>
                                                Réseau de dépôt
                                            </FormDescription>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />

                                {
                                    selectedDepositMethod && <>
                                        {
                                            depositMethodInfo.find(method => method.method === selectedDepositMethod)?.message(depositAmount)
                                        }
                                        <p>
                                            Veuillez joindre une capture d'écran de la confirmation de votre dépôt.
                                        </p>
                                    </>
                                }
                                <FormField
                                    control={depositForm.control}
                                    name="photo"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Image de confirmation</FormLabel>
                                            <FormControl>
                                                <Input className=''
                                                    type="file"
                                                    onChange={(event) => {
                                                        const firstFile = event.target.files?.[0];
                                                        field.onChange(firstFile);
                                                    }}
                                                />
                                            </FormControl>
                                            <FormDescription>
                                                Une capture d'écran de la confirmation de votre dépôt
                                            </FormDescription>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <Button type="submit">
                                    Envoyer la demande de dépôt
                                </Button>
                            </form>
                        </Form>

                    </CardContent>
                </Card>
                <Card>
                    <CardHeader>
                        <CardTitle>
                            Demande de retrait
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <Form {...withdrawalForm}>
                            <form className="space-y-4" onSubmit={withdrawalForm.handleSubmit(withdrawalSubmit)}>
                                <FormField
                                    control={withdrawalForm.control}
                                    name="amount"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Montant</FormLabel>
                                            <FormControl>
                                                <Input placeholder="Montant" {...field} onChange={(e) => {
                                                    if (/^\d*$/.test(e.target.value)) {
                                                        field.onChange(parseInt(e.target.value))
                                                    }
                                                }} />
                                            </FormControl>
                                            <FormDescription>
                                                Montant du plan
                                            </FormDescription>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />

                                <FormField
                                    control={withdrawalForm.control}
                                    name="method"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Méthode de retrait</FormLabel>
                                            <FormControl>
                                                <Select
                                                    onValueChange={field.onChange}
                                                    value={field.value}
                                                >
                                                    <SelectTrigger>
                                                        <SelectValue placeholder="Sélectionnez une méthode de retrait" />
                                                    </SelectTrigger>
                                                    <SelectContent>
                                                        {
                                                            depositMethodInfo.map((method) => (
                                                                <SelectItem key={method.method} value={method.method}>
                                                                    {method.method}
                                                                </SelectItem>))
                                                        }
                                                    </SelectContent>
                                                </Select>
                                            </FormControl>
                                            <FormDescription>
                                                Réseau de retrait
                                            </FormDescription>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />

                                <FormField
                                    control={withdrawalForm.control}
                                    name="phoneNumber"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Numero de reception</FormLabel>
                                            <FormControl>
                                                <Input placeholder="Montant" {...field} onChange={(e) => {
                                                    if (/^\d*$/.test(e.target.value)) {
                                                        field.onChange(e.target.value)
                                                    }
                                                }} />
                                            </FormControl>
                                            <FormDescription>
                                                Une capture d'écran de la confirmation de votre dépôt
                                            </FormDescription>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <Button type="submit">
                                    Envoyer la demande de retrait
                                </Button>
                            </form>
                        </Form>
                    </CardContent>
                </Card>
            </div>
            <Card>
                <CardHeader>
                    <CardTitle>
                        Historique des transactions
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    <ScrollArea className="h-[300px]">
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Type</TableHead>
                                    <TableHead>Montant</TableHead>
                                    <TableHead>Méthode</TableHead>
                                    <TableHead>Date</TableHead>
                                    <TableHead>Statut</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {userDepositRequestsQuery.data?.map((deposit) => (
                                    <TableRow key={`deposit-${deposit.id}`}>
                                        <TableCell>Dépôt</TableCell>
                                        <TableCell>{deposit.amount} FCFA</TableCell>
                                        <TableCell>{deposit.method}</TableCell>
                                        <TableCell>{new Date(deposit.createdAt).toLocaleDateString()}</TableCell>
                                        <TableCell>{deposit.isValidated ? 'Validé' : 'En attente'}</TableCell>
                                    </TableRow>
                                ))}
                                {userWithdrawalRequestsQuery.data?.map((withdrawal) => (
                                    <TableRow key={`withdrawal-${withdrawal.id}`}>
                                        <TableCell>Retrait</TableCell>
                                        <TableCell>{withdrawal.amount} FCFA</TableCell>
                                        <TableCell>{withdrawal.method}</TableCell>
                                        <TableCell>{new Date(withdrawal.createdAt).toLocaleDateString()}</TableCell>
                                        <TableCell>{withdrawal.isValidated ? 'Validé' : 'En attente'}</TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </ScrollArea>
                </CardContent>
            </Card>
        </div>
    )
}

export default Transactions