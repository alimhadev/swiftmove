import ResetPassword from "@/components/forms/reset-password"
import { redirect } from "next/navigation"

export default async function Page({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | undefined }>
}) {
  const { token, email } = await searchParams
  if (!token || !email) {
    redirect('/sign-in')
  }
  return (
    <ResetPassword email={email} token={token} />
  )
}