"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { CheckCircle } from "lucide-react"
import Link from "next/link"
import { motion } from "framer-motion"
import InvalidEmailVerification from "@/components/cards/invalid-email-verification"
import { notFound } from "next/navigation"
export default function EmailVerified({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined }
}) {
  const confirmationToken = searchParams.confirmation_token
  console.log("searchParams", confirmationToken)
  if (!confirmationToken) {
    return notFound()
  }
  const [confirmationStatus, setConfirmationStatus] = useState(false)
  const [canRequestToken, setCanRequestToken] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [userEmail, setUserEmail] = useState("")

  const handleResendVerification = async () => {
    if (userEmail) {
      const request = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/verification-by-email?email=${userEmail}`, {
        method: "POST"
      })
      if (request.status == 201) {
        return true
      } else {
        return false
      }
    }
  }

  useEffect(() => {
    const verifyToken = async () => {

      try {
        if (!confirmationStatus && confirmationToken) {
          const request = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/verify-token?token=${confirmationToken}`);
          if (request.status === 404) {
            const response = await request.json();
            const { email } = response;
            if (email) {
              setUserEmail(email);
              setCanRequestToken(true);
            }
          } else if (request.status === 200) {
            setConfirmationStatus(true);
          }
        }

      } catch (error) {
        console.error("Error verifying email", error);
      } finally {
        setIsLoading(false);
      }
    };

    if (confirmationToken) {
      verifyToken();
    }
  },);



  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <Card className="w-[350px]">
          <CardContent className="flex items-center justify-center py-10">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
            >
              <CheckCircle className="h-12 w-12 text-blue-500" />
            </motion.div>
          </CardContent>
        </Card>
      </div>
    )
  }

  if (confirmationStatus) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <Card className="w-[350px]">
          <CardHeader>
            <CardTitle className="text-2xl font-bold text-center">Email vérifié !</CardTitle>
          </CardHeader>
          <CardContent className="text-center">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", stiffness: 260, damping: 20 }}
              className="flex justify-center mb-6"
            >
              <CheckCircle className="h-16 w-16 text-green-500" />
            </motion.div>
            <p className="mb-4">
              Votre email a été vérifié avec succès. Votre compte est maintenant actif et vous pouvez commencer à utiliser nos services.
            </p>
            <p className="text-sm text-gray-500">
              Merci d'avoir confirmé votre adresse email.
            </p>
          </CardContent>
          <CardFooter className="flex justify-center">
            <Link href="/sign-in">
              <Button>
                Continuer vers la connexion
              </Button>
            </Link>
          </CardFooter>
        </Card>
      </div>
    )
  } else {
    return (<InvalidEmailVerification canRequestToken={canRequestToken} resendTokenFn={handleResendVerification} />)
  }


}
