import React, { useEffect, useState } from 'react'
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
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
import { SubmitDepositRequest, SubmitWithdrawalRequest } from '@/lib/api';
import { getServerUrl } from '@/lib/utils';
const Transactions = ({ transactionHistory }: {
    transactionHistory: {
        id: number;
        type: string;
        amount: number;
        date: string;
    }[]
}) => {

    const [selectedDepositMethod, setSelectedDepositMethod] = useState<"MOOV" | "T-MONEY" | undefined>(undefined)
    const [depositAmount, setDepositAmount] = useState<number>(0)

    const queryClient = useQueryClient()

    const createDepositMutation = useMutation({
        mutationFn: SubmitDepositRequest,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['userDepositRequests'] })
        }
    })
    const createWithdrawalMutation = useMutation({
        mutationFn: SubmitWithdrawalRequest,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['userDepositRequests'] })
        }
    })
    const ACCEPTED_IMAGE_TYPES = [
        'image/jpeg',
        'image/jpg',
        'image/png',
        'image/webp',
    ]

    const depositAddress = {
        "MOOV": "94698745",
        "T-MONEY": "94698745",
    }
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
        method: z.enum(['MOOV', 'T-MONEY']),
        photo: imageSchema
    })
    const withdrawalFormSchema = z.object({
        amount: z.number().min(0),
        method: z.enum(['MOOV', 'T-MONEY']),
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
            userId: 9,
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
            console.log("formData", formData)

            createDepositMutation.mutateAsync(formData)
        }
        depositForm.reset();

    }
    const withdrawalSubmit = async (values: z.infer<typeof withdrawalFormSchema>) => {
        // TODO: remove the isValidated 
        console.log("values ", values)

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

                                                        {["MOOV", "T-MONEY"].map((method) => (
                                                            <SelectItem key={method} value={method}>
                                                                {method}
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
                                        <p>Veuillez effectuer le depot de <span className='font-bold'>{depositAmount} FCFA </span>sur le compte : <span className='font-bold'>{depositAddress[selectedDepositMethod]}</span></p>
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

                                                        {["MOOV", "T-MONEY"].map((method) => (
                                                            <SelectItem key={method} value={method}>
                                                                {method}
                                                            </SelectItem>
                                                        ))}

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
                                                }}/>
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
                        <table className="w-full">
                            <thead>
                                <tr>
                                    <th className="text-left">
                                        Type
                                    </th>
                                    <th className="text-left">
                                        Montant
                                    </th>
                                    <th className="text-left">
                                        Date
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {transactionHistory.map(
                                    (transaction) => (
                                        <tr
                                            key={transaction.id}
                                        >
                                            <td>
                                                {
                                                    transaction.type
                                                }
                                            </td>
                                            <td>
                                                $
                                                {
                                                    transaction.amount
                                                }
                                            </td>
                                            <td>
                                                {
                                                    transaction.date
                                                }
                                            </td>
                                        </tr>
                                    )
                                )}
                            </tbody>
                        </table>
                    </ScrollArea>
                </CardContent>
            </Card>
        </div>
    )
}

export default Transactions