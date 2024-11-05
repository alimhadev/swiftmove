import React from "react";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
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
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {
    createVehicles,
    getVehicles,
    updateVehicle,
    deleteVehicles,
} from "@/lib/api";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Pencil, Trash2 } from "lucide-react";
const Vehicles = () => {
    const createVehicleFormSchema = z.object({
        name: z.string().min(4, {
            message:
                "Veuillez entrer un nom de véhicule valide de 4 caractères minimum.",
        }),
    });

    const queryClient = useQueryClient();
    const createVehicleForm = useForm<z.infer<typeof createVehicleFormSchema>>({
        resolver: zodResolver(createVehicleFormSchema),
        defaultValues: {
            name: "",
        },
    });
    const vehiclesQuery = useQuery({
        queryKey: ["vehicles"],
        queryFn: getVehicles,
    });
    const createVehiclesMutation = useMutation({
        mutationFn: createVehicles,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["vehicles"] });
        },
    });

    const createVehicleOnSubmit = async (
        values: z.infer<typeof createVehicleFormSchema>
    ) => {
        await createVehiclesMutation.mutateAsync(values.name);
    };

    const updateVehicleForm = useForm<z.infer<typeof createVehicleFormSchema>>({
        resolver: zodResolver(createVehicleFormSchema),
        defaultValues: {
            name: "",
        },
    });
    const updateVehiclesMutation = useMutation({
        mutationFn: updateVehicle,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["vehicles"] });
        },
    });

    const updateVehicleOnSubmit = async (
        values: z.infer<typeof createVehicleFormSchema>,
        id: string
    ) => {
        await updateVehiclesMutation.mutateAsync({ name: values.name, id });
    };

    const deleteVehiclesMutation = useMutation({
        mutationFn: deleteVehicles,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["vehicles"] });
        },
    });
    return (
        <div className="grid grid-cols-1 min-[1200px]:grid-cols-3 gap-5">
            <Card className="h-fit">
                <CardHeader>
                    <CardTitle>Créer un nouveau véhicule</CardTitle>
                </CardHeader>
                <CardContent>
                    <Form {...createVehicleForm}>
                        <form
                            onSubmit={createVehicleForm.handleSubmit(
                                createVehicleOnSubmit
                            )}
                            className="space-y-8"
                        >
                            <FormField
                                control={createVehicleForm.control}
                                name="name"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Nom du véhicule</FormLabel>
                                        <FormControl>
                                            <Input
                                                placeholder="shadcn"
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormDescription>
                                            Le nom du véhicule
                                        </FormDescription>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <Button className="bg-first hover:bg-first/90">
                                Créer le véhicule
                            </Button>
                        </form>
                    </Form>
                </CardContent>
            </Card>

            <Card className="min-[1200px]:col-span-2">
                <CardHeader>
                    <CardTitle>Liste des véhicules</CardTitle>
                </CardHeader>
                <CardContent>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>N°</TableHead>
                                <TableHead>Noms</TableHead>
                                <TableHead>Actions</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {vehiclesQuery?.data?.map((vehicle) => (
                                <TableRow key={vehicle.id}>
                                    <TableCell>{vehicle.id}</TableCell>
                                    <TableCell>{vehicle.name}</TableCell>
                                    <TableCell className="flex gap-2">
                                        {/* Edit button */}
                                        <Dialog>
                                            <DialogTrigger asChild>
                                                <Button className="bg-first hover:bg-first/90 h-8 w-8 p-0">
                                                    <Pencil className="h-4 w-4" />
                                                </Button>
                                            </DialogTrigger>
                                            <DialogContent className="sm:max-w-[425px]">
                                                <DialogHeader>
                                                    <DialogTitle>
                                                        Modifier
                                                    </DialogTitle>
                                                    <DialogDescription>
                                                        Vous êtes sur le point
                                                        de modifier le nom de ce
                                                        véhicule
                                                    </DialogDescription>
                                                </DialogHeader>
                                                <Form {...updateVehicleForm}>
                                                    <form
                                                        onSubmit={updateVehicleForm.handleSubmit(
                                                            (values) =>
                                                                updateVehicleOnSubmit(
                                                                    values,
                                                                    vehicle.id.toString()
                                                                )
                                                        )}
                                                        className="space-y-8"
                                                    >
                                                        <FormField
                                                            control={
                                                                updateVehicleForm.control
                                                            }
                                                            name="name"
                                                            render={({
                                                                field,
                                                            }) => (
                                                                <FormItem>
                                                                    <FormLabel>
                                                                        Nom du
                                                                        véhicule
                                                                    </FormLabel>
                                                                    <FormControl>
                                                                        <Input
                                                                            placeholder="shadcn"
                                                                            {...field}
                                                                        />
                                                                    </FormControl>
                                                                    <FormDescription>
                                                                        Le nom
                                                                        du
                                                                        véhicule
                                                                    </FormDescription>
                                                                    <FormMessage />
                                                                </FormItem>
                                                            )}
                                                        />
                                                        <div className="flex justify-end gap-3">
                                                            <DialogClose
                                                                asChild
                                                            >
                                                                <Button
                                                                    type="button"
                                                                    variant="secondary"
                                                                >
                                                                    Annuler
                                                                </Button>
                                                            </DialogClose>
                                                            <Button className="bg-first hover:bg-first/90">
                                                                Modifier le
                                                                véhicule
                                                            </Button>
                                                        </div>
                                                    </form>
                                                </Form>
                                            </DialogContent>
                                        </Dialog>

                                        {/* Deletion button */}
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
                                                        En supprimant ce
                                                        véhicule, vous supprimez
                                                        tout ce qui y est lié
                                                        (Plans d'investissement
                                                        et souscriptions)
                                                    </DialogDescription>
                                                </DialogHeader>
                                                <div>
                                                    Voulez-vous vraiment
                                                    supprimer ce véhicule ?
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
                                                        onClick={() =>
                                                            deleteVehiclesMutation.mutateAsync(
                                                                vehicle.id.toString()
                                                            )
                                                        }
                                                        type="submit"
                                                        className="bg-danger hover:bg-danger/90"
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
};

export default Vehicles;
