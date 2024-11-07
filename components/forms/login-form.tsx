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
import { Label } from "@/components/ui/label";
import { LoaderCircle } from "lucide-react";
import { getServerUrl } from "@/lib/utils";
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
} from "../ui/form";
import { useToast } from "@/hooks/use-toast";
import { signin } from "@/action/auth";
import { useRouter } from "next/navigation";

export default function CarteConnexion() {
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const { toast } = useToast();
    const router = useRouter();
    type formSchema = z.infer<typeof signInSchema>;
    const form = useForm<formSchema>({
        resolver: zodResolver(signInSchema),
        defaultValues: {
            email: "",
            password: "",
        },
    });
    const onSubmit = async (values: z.infer<typeof signInSchema>) => {
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
            if (user?.isAdmin) {
                router.push("/admin");
            }
            router.push("/dashboard");
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
                    <form
                        onSubmit={form.handleSubmit(onSubmit)}
                        // action={async (formData) => {
                        //     const signinData = await signin(formData);
                        //     if (signinData.error) {
                        //         toast({
                        //             title: "Erreur lors de la connexion",
                        //             description: signinData.message,
                        //             variant: "destructive",
                        //         });
                        //         return;
                        //     }
                        //     const { token, user } = signinData;
                        //     localStorage.setItem("token", token);
                        //     if (user?.isAdmin) {
                        //         redirect("/admin");
                        //     }
                        //     redirect("/dashboard");

                        //     // if (signinData) {
                        //     //     const { user, token } = signinData
                        //     //     setUser(user)

                        //     //     localStorage.setItem("token", token.token);
                        //     //     localStorage.setItem("user", JSON.stringify(user));
                        //     //     if (user.isAdmin) {
                        //     //         redirect('/admin')
                        //     //     } else {
                        //     //         redirect('/dashboard')
                        //     //     }

                        //     // }
                        //     // redirect('/dashboard')
                        // }}
                    >
                        <div className="grid w-full items-center gap-4">
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
                                name="password"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Mot de passe</FormLabel>
                                        <FormControl>
                                            <Input
                                                placeholder=""
                                                {...field}
                                                type="password"
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            {/* <div className="flex flex-col space-y-1.5">
                                <Label htmlFor="email">Email</Label>
                                <Input
                                    id="email"
                                    name="email"
                                    type="email"
                                    placeholder=""
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    required
                                />
                            </div>
                            <div className="flex flex-col space-y-1.5">
                                <Label htmlFor="motDePasse">Mot de passe</Label>
                                <Input
                                    id="motDePasse"
                                    name="motDePasse"
                                    type="password"
                                    value={motDePasse}
                                    onChange={(e) =>
                                        setMotDePasse(e.target.value)
                                    }
                                    required
                                />
                            </div> */}
                        </div>
                        <CardFooter className="flex justify-between mt-4 p-0">
                            <Button
                                type="submit"
                                className="bg-first hover:bg-first/90 w-full"
                                disabled={isLoading}
                            >
                                {isLoading && (
                                    <LoaderCircle className="mr-2 h-4 w-4 animate-spin" />
                                )}
                                Se connecter
                            </Button>
                        </CardFooter>
                    </form>
                </Form>
            </CardContent>
        </Card>
    );
}
