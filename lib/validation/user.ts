import { z } from "zod";
export const userRegisterSchema = z.object({
    firstname: z.string().min(2, {
        message: "Le nom doit contenir au moins 2 caractères.",
    }),
    lastname: z.string().min(2, {
        message: "Le prénom doit contenir au moins 2 caractères.",
    }),
    email: z.string().email({
        message: "L'email doit être valide.",
    }),
    password: z.string().min(8, {
        message: "Le mot de passe doit contenir au moins 8 caractères.",
    }),

    // confirmPassword: z.string().min(8, {
    //     message: "Password must be at least 6 characters.",
    // }),
    confirmPassword: z.string(),
    solde: z.string(),
});
