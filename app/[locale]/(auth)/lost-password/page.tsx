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
import { Mail, AlertCircle, CheckCircle } from "lucide-react"
import Link from "next/link"

const forgotPasswordSchema = z.object({
  email: z.string().email({ message: "Veuillez entrer une adresse e-mail valide." }),
})

export default function ForgotPassword() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "error">("idle")

  const form = useForm<z.infer<typeof forgotPasswordSchema>>({
    resolver: zodResolver(forgotPasswordSchema),
    defaultValues: {
      email: "",
    },
  })

  const onSubmit = async (values: z.infer<typeof forgotPasswordSchema>) => {
    setIsSubmitting(true)
    setSubmitStatus("idle")

    try {
      // Simuler l'appel API pour demander une réinitialisation du mot de passe
      await new Promise(resolve => setTimeout(resolve, 2000))
      
      // Simuler une réponse réussie
      setSubmitStatus("success")
    } catch (error) {
      console.error("Erreur lors de la demande de réinitialisation de mot de passe:", error)
      setSubmitStatus("error")
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <Card className="w-[350px]">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-center">Mot de passe oublié</CardTitle>
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
                      <Input placeholder="Entrez votre email" {...field} />
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
                    <Mail className="mr-2 h-4 w-4 animate-spin" />
                    Envoi...
                  </>
                ) : (
                  "Réinitialiser le mot de passe"
                )}
              </Button>
            </form>
          </Form>
          {submitStatus === "success" && (
            <Alert className="mt-4" variant="default">
              <CheckCircle className="h-4 w-4" />
              <AlertTitle>Succès</AlertTitle>
              <AlertDescription>
                Si un compte existe pour cet email, nous avons envoyé les instructions de réinitialisation du mot de passe.
              </AlertDescription>
            </Alert>
          )}
          {submitStatus === "error" && (
            <Alert className="mt-4" variant="destructive">
              <AlertCircle className="h-4 w-4" />
              <AlertTitle>Erreur</AlertTitle>
              <AlertDescription>
                Une erreur est survenue. Veuillez réessayer plus tard.
              </AlertDescription>
            </Alert>
          )}
        </CardContent>
        <CardFooter className="flex justify-center">
          <Link href="/login" className="text-sm text-gray-600 hover:underline">
            Retour à la connexion
          </Link>
        </CardFooter>
      </Card>
    </div>
  )
}
