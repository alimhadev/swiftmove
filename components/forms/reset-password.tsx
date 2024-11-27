"use client"

import { useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Lock, AlertCircle, CheckCircle } from "lucide-react"
import Link from "next/link"
import { useToast } from "@/hooks/use-toast"
import { useRouter } from "next/navigation"
import { getServerUrl } from "@/lib/utils"
const resetPasswordSchema = z.object({
  password: z
    .string()
    .min(8, { message: "Le mot de passe doit comporter au moins 8 caractères." }),
  confirmPassword: z.string(),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Les mots de passe ne correspondent pas.",
  path: ["confirmPassword"],
})

export default function ResetPassword({ token, email }: { token: string, email: string }) {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const { toast } = useToast()

  const router = useRouter()

  const form = useForm<z.infer<typeof resetPasswordSchema>>({
    resolver: zodResolver(resetPasswordSchema),
    defaultValues: {
      password: "",
      confirmPassword: "",
    },
  })

  const onSubmit = async (values: z.infer<typeof resetPasswordSchema>) => {
    setIsSubmitting(true)

    try {
      const request = await fetch(`${getServerUrl()}/reset-password`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ password: values.password, token: token, email: email }),
      })
      if (request.ok) {
        toast({
          title: "Mot de passe réinitialisé",
          description: "Vous pouvez maintenant vous connecter avec votre nouveau mot de passe.",
          variant: "default",
        })
        router.push("/sign-in")
        return
      } else {
        const response = await request.json()
        return toast({
          title: "Erreur lors de la réinitialisation de mot de passe",
          description: response.message || "Veuillez réessayer plus tard",
          variant: "destructive",
        })

      }


    } catch (error) {
      toast({
        title: "Erreur lors de la réinitialisation de mot de passe",
        description: "Veuillez réessayer plus tard",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <Card className="w-[350px]">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-center">
            Réinitialisation du mot de passe
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Nouveau mot de passe</FormLabel>
                    <FormControl>
                      <Input type="password" placeholder="Entrez votre nouveau mot de passe" {...field} />
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
                    <FormLabel>Confirmer le nouveau mot de passe</FormLabel>
                    <FormControl>
                      <Input type="password" placeholder="Confirmez votre nouveau mot de passe" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button
                type="submit"
                className="w-full"
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <>
                    <Lock className="mr-2 h-4 w-4 animate-spin" />
                    Réinitialisation...
                  </>
                ) : (
                  "Réinitialiser le mot de passe"
                )}
              </Button>
            </form>
          </Form>


        </CardContent>
        <CardFooter className="flex justify-center">
          <Link href="/sign-in" className="text-sm text-gray-600 hover:underline">
            Retour à la connexion
          </Link>
        </CardFooter>
      </Card>
    </div>
  )
}