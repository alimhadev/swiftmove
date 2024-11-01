"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { CheckCircle } from "lucide-react"
import Link from "next/link"
import { motion } from "framer-motion"
export default function EmailVerified() {
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
}
