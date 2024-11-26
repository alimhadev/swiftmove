"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Mail } from 'lucide-react'
import Link from "next/link"
import { useToast } from "@/hooks/use-toast"
import { getServerUrl } from "@/lib/utils"
export default function EmailConfirmation() {
  const { toast } = useToast()
  const [isResending, setIsResending] = useState(false)
  const [showEmailInput, setShowEmailInput] = useState(false)
  const [email, setEmail] = useState("")


  const handleShowEmailInput = () => {
    setShowEmailInput(true)
  }
  const isValidEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return emailRegex.test(email)
  }
  const handleResendEmail = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!email) {
      return toast({
        title: "Veuillez entrer une adresse email.",
        variant: "destructive"
      })
    }

    if (!isValidEmail(email)) {
      return toast({
        title: "Adresse email invalide.",
        variant: "destructive"
      })
    }
    setIsResending(true)
    try {
      const response = await fetch(`${getServerUrl()}/resend-verification-email`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ email })
      })
      const responseData = await response.json()
      if (!response.ok) {
        return toast({
          title: "Erreur lors de l'envoi de l'email.",
          description: `${responseData.message}`,
          variant: "destructive"
        })
      }
      return toast({
        title: "Email envoyé avec succès.",
        description: `${responseData.message}`,
        variant: "default"
      })
    } catch (error) {
      return toast({
        title: "Erreur lors de la communication avec le serveur.",
        description: "Veuillez réessayer plus tard.",
        variant: "destructive"
      })
    } finally {
      setIsResending(false)
      setShowEmailInput(false)
      setEmail("")
    }
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <Card className="w-[350px]">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-center">Vérifiez votre email</CardTitle>
        </CardHeader>
        <CardContent className="text-center">
          <div className="flex justify-center mb-6">
            <Mail className="h-12 w-12 text-first" />
          </div>
          <p className="mb-4">
            Nous avons envoyé un lien de confirmation à votre adresse email. Veuillez consulter votre boîte de réception et cliquer sur le lien pour activer votre compte.
          </p>
          <p className="text-sm text-gray-500 mb-4">
            Si vous ne voyez pas l'email, vérifiez votre dossier spam.
          </p>
          {!showEmailInput ? (
            <Button
              onClick={handleShowEmailInput}
              className="w-full bg-first hover:bg-first/90"
            >
              Renvoyer l'email de confirmation
            </Button>
          ) : (
            <form onSubmit={handleResendEmail} className="space-y-4">
              <Input
                type="email"
                placeholder="Entrez votre email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <Button
                type="submit"
                disabled={isResending}
                className="w-full bg-first hover:bg-first/90"
              >
                {isResending ? "Renvoi en cours..." : "Renvoyer"}
              </Button>
            </form>
          )}

        </CardContent>
        <CardFooter>
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

