"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
    DialogFooter,
    DialogClose,
} from "@/components/ui/dialog";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { Pencil, Trash2, ArrowLeft } from "lucide-react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { useToast } from "@/hooks/use-toast"
import {
    getVehicles,
    getInvestmentPlans,
    createInvestmentPlan,
    updateInvestmentPlan,
    deleteInvestmentPlan,
} from "@/lib/api";

const planFormSchema = z.object({
    id: z.number().optional(),
    name: z.string({
        message: "Veuillez entrer un nom de plan valide de 4 caractères minimum.",
    }).min(4, {
        message:
            "Veuillez entrer un nom de plan valide de 4 caractères minimum.",
    }),
    amount: z.number({
        message: "Veuillez entrer un montant valide.",
    }).min(0, {
        message: "Veuillez entrer un montant valide.",
    }),
    incomePercentage: z.number({
        message: "Veuillez entrer un pourcentage valide.",
    }).min(1, {
        message: "Veuillez entrer un pourcentage valide.",
    }).max(100, {
        message: "Veuillez entrer un pourcentage valide.",
    }),
    durationInMonth: z.number({
        message: "Veuillez entrer une durée valide.",
    }).min(1, {
        message: "Veuillez entrer une durée valide.",
    }).default(0),
    durationInDay: z.number({
        message: "Veuillez entrer une durée valide.",
    }).min(0, {
        message: "Veuillez entrer une durée valide.",
    }).default(0),
    minimumWithdrawalAmount: z.number().min(0),
    vehicleId: z.string().min(1, {
        message: "Veuillez sélectionner un véhicule.",
    }),
    created_at: z.date().optional(),
    updated_at: z.date().optional(),
});

type PlanFormValues = z.infer<typeof planFormSchema>;

export default function Plans() {
    const { toast } = useToast();
    const queryClient = useQueryClient();
    const [editingPlan, setEditingPlan] = useState<PlanFormValues | null>(null);
    const { data: vehicles, isLoading } = useQuery({
        queryKey: ["vehicles"],
        queryFn: getVehicles,
    });
    const { data: investmentPlans, isLoading: isLoadingInvestmentPlans } =
        useQuery({
            queryKey: ["investmentPlans"],
            queryFn: getInvestmentPlans,
        });

    const createInvestmentPlanMutation = useMutation({
        mutationFn: createInvestmentPlan,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["investmentPlans"] });
            toast({
                title: "Plan créé avec succès",
                description: "Le plan a été créé avec succès",
                variant: "default"
            });

        },
        onError: (error: any) => {

            toast({
                title: "Erreur lors de la création du plan",
                description: "Veuillez réessayer plus tard",
                variant: "destructive",
            });
        },
    });

    const updateInvestmentPlanMutation = useMutation({
        mutationFn: updateInvestmentPlan,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["investmentPlans"] });
            setEditingPlan(null);
            toast({
                title: "Plan modifié avec succès",
                description: "Le plan a été modifié avec succès",
            });
        },
        onError: (error: any) => {
            toast({
                title: "Erreur lors de la modification du plan",
                description: error.message || "Veuillez réessayer plus tard",
                variant: "destructive",
            });
        },
    });
    const deleteInvestmentPlanMutation = useMutation({
        mutationFn: deleteInvestmentPlan,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["investmentPlans"] });
            toast({
                title: "Plan supprimé avec succès",
                description: "Le plan a été supprimé avec succès",
            });
        },
    });
    console.log(investmentPlans)
    const planForm = useForm<PlanFormValues>({
        resolver: zodResolver(planFormSchema),
        defaultValues: {
            name: "",
            amount: 0,
            incomePercentage: 0,
            durationInMonth: 0,
            durationInDay: 0,
            minimumWithdrawalAmount: 0,
            vehicleId: "",
        },
    });

    const onSubmit = async (values: PlanFormValues) => {
        if (editingPlan) {
            await updateInvestmentPlanMutation.mutateAsync({
                ...values,
                id: editingPlan.id!,
            });
        } else {
            await createInvestmentPlanMutation.mutateAsync(values);
        }
        planForm.reset();
    };

    const startEditing = (plan: PlanFormValues) => {
        setEditingPlan(plan);
        planForm.reset(plan);
    };

    const cancelEditing = () => {
        setEditingPlan(null);
        planForm.reset();
    };

    return (
        <div className="grid grid-cols-1 min-[1200px]:grid-cols-3 gap-5">
            <Card className="h-fit">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle>
                        {editingPlan
                            ? "Modifier le plan"
                            : "Créer un nouveau plan"}
                    </CardTitle>
                    {editingPlan && (
                        <Button
                            variant="outline"
                            size="sm"
                            onClick={cancelEditing}
                            className="ml-auto"
                        >
                            <ArrowLeft className="mr-2 h-4 w-4" />
                            Retour à la création
                        </Button>
                    )}
                </CardHeader>
                <CardContent>
                    <Form {...planForm}>
                        <form
                            onSubmit={planForm.handleSubmit(onSubmit)}
                            className="space-y-8"
                        >
                            <FormField
                                control={planForm.control}
                                name="name"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Nom du plan</FormLabel>
                                        <FormControl>
                                            <Input
                                                placeholder="Nom du plan"
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormDescription>
                                            Le nom du plan
                                        </FormDescription>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={planForm.control}
                                name="amount"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Montant</FormLabel>
                                        <FormControl>
                                            <Input
                                                placeholder="Montant"
                                                {...field}
                                                type="number"
                                                onChange={(e) =>
                                                    field.onChange(
                                                        e.target.valueAsNumber
                                                    )
                                                }
                                            />
                                        </FormControl>
                                        <FormDescription>
                                            Montant du plan
                                        </FormDescription>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={planForm.control}
                                name="incomePercentage"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Pourcentage</FormLabel>
                                        <FormControl>
                                            <Input
                                                placeholder="Pourcentage"
                                                {...field}
                                                type="number"
                                                onChange={(e) =>
                                                    field.onChange(
                                                        e.target.valueAsNumber
                                                    )
                                                }
                                            />
                                        </FormControl>
                                        <FormDescription>
                                            Pourcentage de retour (1 à 100)
                                        </FormDescription>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={planForm.control}
                                name="durationInMonth"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Durée en mois</FormLabel>
                                        <FormControl>
                                            <Input
                                                placeholder="Durée en mois"
                                                {...field}
                                                type="number"
                                                onChange={(e) =>
                                                    field.onChange(
                                                        e.target.valueAsNumber
                                                    )
                                                }
                                            />
                                        </FormControl>
                                        <FormDescription>
                                            Durée en mois
                                        </FormDescription>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            {/* <FormField
                                control={planForm.control}
                                name="durationInDay"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Durée en jours</FormLabel>
                                        <FormControl>
                                            <Input
                                                placeholder="Durée en jours"
                                                {...field}
                                                type="number"
                                                onChange={(e) =>
                                                    field.onChange(
                                                        e.target.valueAsNumber
                                                    )
                                                }
                                            />
                                        </FormControl>
                                        <FormDescription>
                                            Durée en jours
                                        </FormDescription>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            /> */}
                            <FormField
                                control={planForm.control}
                                name="minimumWithdrawalAmount"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>
                                            Montant minimum de retrait
                                        </FormLabel>
                                        <FormControl>
                                            <Input
                                                placeholder="Montant minimum de retrait"
                                                {...field}
                                                type="number"
                                                onChange={(e) =>
                                                    field.onChange(
                                                        e.target.valueAsNumber
                                                    )
                                                }
                                            />
                                        </FormControl>
                                        <FormDescription>
                                            Montant minimum de retrait
                                        </FormDescription>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={planForm.control}
                                name="vehicleId"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Véhicule</FormLabel>
                                        <FormControl>
                                            <Select
                                                onValueChange={field.onChange}
                                                value={field.value}
                                            >
                                                <SelectTrigger>
                                                    <SelectValue placeholder="Sélectionnez un véhicule" />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    {vehicles?.map(
                                                        (vehicle) => (
                                                            <SelectItem
                                                                key={vehicle.id}
                                                                value={vehicle.id.toString()}
                                                            >
                                                                {vehicle.name}
                                                            </SelectItem>
                                                        )
                                                    )}
                                                </SelectContent>
                                            </Select>
                                        </FormControl>
                                        <FormDescription>
                                            Véhicule
                                        </FormDescription>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <Button
                                type="submit"
                                className={
                                    editingPlan
                                        ? "bg-first hover:bg-first/90"
                                        : "bg-first hover:bg-first/90"
                                }
                            >
                                {editingPlan
                                    ? "Mettre à jour le plan"
                                    : "Créer le plan"}
                            </Button>
                        </form>
                    </Form>
                </CardContent>
            </Card>

            <Card className="min-[1200px]:col-span-2">
                <CardHeader>
                    <CardTitle>Liste des plans</CardTitle>
                </CardHeader>

                <CardContent>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Nom</TableHead>
                                <TableHead>Montant</TableHead>
                                <TableHead>Retour (%)</TableHead>
                                <TableHead>Durée (mois)</TableHead>
                                {/* <TableHead>Durée (jours)</TableHead> */}
                                <TableHead>Min. retrait</TableHead>
                                <TableHead>Véhicule</TableHead>
                                <TableHead>Actions</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {investmentPlans?.map((plan) => (
                                <TableRow key={plan.id}>
                                    <TableCell>{plan.name}</TableCell>
                                    {/* @ts-ignore */}
                                    <TableCell>{parseFloat(plan.amount as string).toFixed(0)}</TableCell>
                                    <TableCell>
                                        {plan.incomePercentage}%
                                    </TableCell>
                                    <TableCell>
                                        {plan.durationInMonth}
                                    </TableCell>
                                    {/* <TableCell>{plan.durationInDay}</TableCell> */}
                                    <TableCell>
                                        {plan.minimumWithdrawalAmount}
                                    </TableCell>
                                    <TableCell>
                                        {
                                            vehicles?.find(
                                                (v) =>
                                                    v.id ===
                                                    parseInt(plan.vehicleId)
                                            )?.name
                                        }
                                    </TableCell>
                                    <TableCell className="flex gap-2">
                                        <Button
                                            className="bg-first hover:bg-first/90 h-8 w-8 p-0"
                                            onClick={() => startEditing(plan)}
                                        >
                                            <Pencil className="h-4 w-4" />
                                        </Button>

                                        <Dialog>
                                            <DialogTrigger asChild>
                                                <Button className="bg-danger hover:bg-danger/90 w-8 h-8 p-0">
                                                    <Trash2 className="h-4 w-4" />
                                                </Button>
                                            </DialogTrigger>
                                            <DialogContent>
                                                <DialogHeader>
                                                    <DialogTitle>
                                                        Suppression
                                                    </DialogTitle>
                                                    <DialogDescription>
                                                        En supprimant ce plan,
                                                        vous supprimez tout ce
                                                        qui y est lié (Plans
                                                        d'investissement et
                                                        souscriptions)
                                                    </DialogDescription>
                                                </DialogHeader>
                                                <div>
                                                    Voulez-vous vraiment
                                                    supprimer ce plan ?
                                                </div>
                                                <DialogFooter>
                                                    <DialogClose asChild>
                                                        <Button
                                                            type="button"
                                                            variant="secondary"
                                                        >
                                                            Annuler
                                                        </Button>
                                                    </DialogClose>
                                                    <Button
                                                        type="submit"
                                                        className="bg-danger hover:bg-danger/90"
                                                        onClick={() =>
                                                            deleteInvestmentPlanMutation.mutateAsync(
                                                                plan.id?.toString() ||
                                                                ""
                                                            )
                                                        }
                                                    >
                                                        Supprimer
                                                    </Button>
                                                </DialogFooter>
                                            </DialogContent>
                                        </Dialog>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>
        </div>
    );
}
