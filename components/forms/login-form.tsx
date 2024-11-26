"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { LoaderCircle } from 'lucide-react';
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { signInSchema } from "@/lib/validation/sign-in";
import { useForm } from "react-hook-form";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { useToast } from "@/hooks/use-toast";
import { signin } from "@/action/auth";
import { useRouter } from "next/navigation";

export default function CarteConnexion() {
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const { toast } = useToast();
    const router = useRouter();
    
    type FormSchema = z.infer<typeof signInSchema>;
    
    const form = useForm<FormSchema>({
        resolver: zodResolver(signInSchema),
        defaultValues: {
            email: "",
            password: "",
        },
    });

    const onSubmit = async (values: FormSchema) => {
        setIsLoading(true);
        try {
            const formData = new FormData();
            formData.append('email', values.email);
            formData.append('password', values.password);
            
            const signinData = await signin(formData);
            if (signinData.error) {
                toast({
                    title: "Erreur lors de la connexion",
                    description: signinData.message,
                    variant: "destructive",
                });
                return;
            }
            const { token, user } = signinData;
            localStorage.setItem("token", token);
            console.log("user", user)
            if (user?.isAdmin || user?.isSuperAdmin) {
                router.push("/admin");
            } else {
                router.push("/dashboard");
            }
        } catch (error) {
            toast({
                title: "Erreur lors de la connexion",
                description: "Une erreur est survenue, veuillez réessayer",
                variant: "destructive",
            });
        } finally {
            setIsLoading(false);
        }
    }

    return (
        <Card className="w-full min-[400px]:w-[400px]">
            <CardHeader>
                <CardTitle>Connexion</CardTitle>
            </CardHeader>
            <CardContent>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                        <FormField
                            control={form.control}
                            name="email"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Email</FormLabel>
                                    <FormControl>
                                        <Input placeholder="votre@email.com" {...field} disabled={isLoading} />
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
                                        <Input
                                            placeholder="Votre mot de passe"
                                            {...field}
                                            type="password"
                                            disabled={isLoading}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <CardFooter className="flex justify-between p-0">
                            <Button
                                type="submit"
                                className="bg-first hover:bg-first/90 w-full"
                                disabled={isLoading}
                            >
                                {isLoading ? (
                                    <>
                                        <LoaderCircle className="mr-2 h-4 w-4 animate-spin" />
                                        Connexion en cours...
                                    </>
                                ) : (
                                    "Se connecter"
                                )}
                            </Button>
                        </CardFooter>
                    </form>
                </Form>
            </CardContent>
        </Card>
    );
}

