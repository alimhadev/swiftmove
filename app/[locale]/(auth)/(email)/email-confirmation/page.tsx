"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Mail } from "lucide-react"
import Link from "next/link"

export default function EmailConfirmation() {
  const [isResending, setIsResending] = useState(false)

  const handleResendEmail = async () => {
    setIsResending(true)
    // Ici vous appelleriez typiquement une API pour renvoyer l'email de confirmation
    // Pour la démonstration, nous allons simplement simuler un délai
    await new Promise(resolve => setTimeout(resolve, 2000))
    setIsResending(false)
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <Card className="w-[350px]">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-center">Vérifiez votre email</CardTitle>
        </CardHeader>
        <CardContent className="text-center">
          <div className="flex justify-center mb-6">
            <Mail className="h-12 w-12 text-blue-500" />
          </div>
          <p className="mb-4">
            Nous avons envoyé un lien de confirmation à votre adresse email. Veuillez consulter votre boîte de réception et cliquer sur le lien pour activer votre compte.
          </p>
          <p className="text-sm text-gray-500">
            Si vous ne voyez pas l'email, vérifiez votre dossier spam.
          </p>
        </CardContent>
        <CardFooter className="flex flex-col space-y-2">
          <Button 
            onClick={handleResendEmail} 
            disabled={isResending}
            className="w-full"
          >
            {isResending ? "Renvoi en cours..." : "Renvoyer l'email de confirmation"}
          </Button>
          <Link href="/sign-in" className="w-full">
            <Button variant="outline" className="w-full">
              Retour à la connexion
            </Button>
          </Link>
        </CardFooter>
      </Card>
    </div>
  )
}
