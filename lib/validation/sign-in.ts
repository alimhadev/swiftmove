import { z } from "zod";

export const signInSchema = z.object({
    email: z.string().email({ message: "L'email doit être valide." }),
    password: z.string().min(8, {
        message: "Le mot de passe doit contenir au moins 8 caractères.",
    }),
});
