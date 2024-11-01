"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { AlertCircle, RefreshCw, Mail } from "lucide-react"
import Link from "next/link"
import { motion } from "framer-motion"
import { useToast } from "@/hooks/use-toast"
export default function InvalidEmailVerification({ canRequestToken, resendTokenFn }: { canRequestToken: boolean, resendTokenFn: () => Promise<boolean | undefined> }) {
  const [isResending, setIsResending] = useState(false)
  const { toast } = useToast()
  const handleResendVerification = async () => {
    setIsResending(true)
    // Here you would typically call an API to resend the verification email
    // For demonstration, we'll just simulate a delay
    const sendStatus = await resendTokenFn()
    if (sendStatus) {
      toast({
        title: "Email de vérification envoyé",
        description: "Veuillez vérifier votre boîte de réception",
        variant: "default"
      })
    } else {
      toast({
        title: "Erreur lors de l'envoi de l'email de vérification",
        description: "Veuillez réessayer ultérieurement",
        variant: "destructive"
      })
    }
    setIsResending(false)
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <Card className="w-[350px]">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-center">Verification Failed</CardTitle>
        </CardHeader>
        <CardContent className="text-center">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", stiffness: 260, damping: 20 }}
            className="flex justify-center mb-6"
          >
            <AlertCircle className="h-16 w-16 text-red-500" />
          </motion.div>
          <p className="mb-4">
            Oops! It looks like the verification link you clicked has expired or is invalid.
          </p>
          <p className="text-sm text-gray-500 mb-4">
            This can happen if the link is older than 24 hours or if you've already verified your email.
          </p>
        </CardContent>
        <CardFooter className="flex flex-col space-y-2">
          {
            canRequestToken && <Button
              onClick={handleResendVerification}
              disabled={isResending}
              className="w-full"
            >
              {isResending ? (
                <>
                  <RefreshCw className="mr-2 h-4 w-4 animate-spin" />
                  Resending...
                </>
              ) : (
                <>
                  <Mail className="mr-2 h-4 w-4" />
                  Resend Verification Email
                </>
              )}
            </Button>
          }

          <Link href="/contact-support" className="w-full">
            <Button variant="outline" className="w-full">
              Contact Support
            </Button>
          </Link>
          <Link href="/" className="w-full">
            <Button variant="link" className="w-full">
              Return to Home
            </Button>
          </Link>
        </CardFooter>
      </Card>
    </div>
  )
}