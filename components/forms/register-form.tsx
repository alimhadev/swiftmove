"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { LoaderCircle } from "lucide-react";
import { userRegisterSchema } from "@/lib/validation/user";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { cn } from "@/lib/utils";
import { useRouter } from "next/navigation";

export default function RegisterForm() {
    const router = useRouter();
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [passwordsMatch, setPasswordsMatch] = useState<boolean>(true);
    const form = useForm<z.infer<typeof userRegisterSchema>>({
        resolver: zodResolver(userRegisterSchema),
        defaultValues: {
            firstname: "",
            lastname: "",
            email: "",
            password: "",
            confirmPassword: "",
            solde: "0",
            phoneNumber: ""

        },
    });
    const { watch } = form;

    useEffect(() => {
        const subscription = watch((value, { name, type }) => {
            if (name === "password" || name === "confirmPassword") {
                setPasswordsMatch(value.password === value.confirmPassword);
            }
        });
        return () => subscription.unsubscribe();
    }, [watch]);

    const onSubmit = async (values: z.infer<typeof userRegisterSchema>) => {
        if (!passwordsMatch) {
            return;
        }

        setIsLoading(true);

        try {
            const response = await fetch(
                `${process.env.NEXT_PUBLIC_API_URL}/register`,
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(values),
                }
            );

            if (!response.ok) {
                throw new Error("Error registering user");
            }
            router.push(`/email-confirmation`);
            // const data = await response.json()
            // Handle successful registration (e.g., redirect to login page)
        } catch (error) {
            // Handle error (e.g., show error message to user)
        } finally {
            setIsLoading(false);
        }
    };
    return (
        <Card className="w-full min-[400px]:w-[400px]">
            <CardHeader>
                <CardTitle className="text-lg">Inscription</CardTitle>
            </CardHeader>
            <CardContent>
                <Form {...form}>
                    <form
                        onSubmit={form.handleSubmit(onSubmit)}
                        className="space-y-4"
                    >
                        <FormField
                            control={form.control}
                            name="lastname"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Nom de famille</FormLabel>
                                    <FormControl>
                                        <Input placeholder="" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="firstname"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Prénom</FormLabel>
                                    <FormControl>
                                        <Input placeholder="" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="email"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Email</FormLabel>
                                    <FormControl>
                                        <Input placeholder="" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="phoneNumber"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Numéro de téléphone</FormLabel>
                                    <FormControl>
                                        <Input placeholder="" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="password"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Mot de passe</FormLabel>
                                    <FormControl>
                                        <Input {...field} type="password" />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="confirmPassword"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>
                                        Confirmer le mot de passe
                                    </FormLabel>
                                    <FormControl>
                                        <Input {...field} type="password" />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        {!passwordsMatch && (
                            <p
                                className={cn(
                                    "text-[0.8rem] font-medium text-destructive"
                                )}
                            >
                                Les mots de passe ne correspondent pas
                            </p>
                        )}
                        <Button
                            type="submit"
                            className="bg-info hover:bg-info/90 w-full"
                            disabled={isLoading || !passwordsMatch}
                        >
                            {isLoading && (
                                <LoaderCircle className="mr-2 h-4 w-4 animate-spin" />
                            )}
                            S'inscrire
                        </Button>
                    </form>
                </Form>
            </CardContent>
        </Card>
    );
}
