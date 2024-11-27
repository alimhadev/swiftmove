"use client"

import { useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { getServerUrl } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Loader2, AlertCircle, CheckCircle } from "lucide-react"
import Link from "next/link"
import { useToast } from "@/hooks/use-toast"

const forgotPasswordSchema = z.object({
  email: z.string().email({ message: "Veuillez entrer une adresse e-mail valide." }),
})

export default function ForgotPassword() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const { toast } = useToast()
  const form = useForm<z.infer<typeof forgotPasswordSchema>>({
    resolver: zodResolver(forgotPasswordSchema),
    defaultValues: {
      email: "",
    },
  })

  const onSubmit = async (values: z.infer<typeof forgotPasswordSchema>) => {
    console.log("Submitting")
    setIsSubmitting(true)

    try {
      const request = await fetch(`${getServerUrl()}/forgot-password`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email: values.email }),
      })
      const response = await request.json()
      if (request.ok) {
        return toast({
          title: "Demande de réinitialisation de mot de passe envoyée",
          description: "Veuillez vérifier votre boîte mail",
          variant: "default",
        })
      }
      toast({
        title: "Erreur lors de la demande de réinitialisation de mot de passe",
        description: `${response.message}` || "Veuillez réessayer plus tard",
        variant: "destructive",
      })
    } catch (error) {
      console.log(error)

      toast({
        title: "Erreur lors de la demande de réinitialisation de mot de passe",
        description: "Veuillez réessayer plus tard",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="flex flex-col items-center justify-center bg-gradient-to-br from-second/40 via-transparent to-first/40 w-full min-h-full h-fit py-10 px-5 gap-10">
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
                className="w-full bg-first hover:bg-first/90"
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Envoi...
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
