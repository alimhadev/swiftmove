'use server'

import { getServerUrl } from "@/lib/utils";
import { redirect } from "next/navigation";
import { cookies } from "next/headers";
const serverUrl = getServerUrl();

export async function signin(formData: FormData) {
    const email = formData.get('email')
    const password = formData.get('password')

    // 1. Validate form data
    if (!email || !password) {
        throw new Error('Email or password is missing')
    }

    // 2. Send request to backend
    const request = await fetch(`${serverUrl}/login`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            email,
            password,
        }),
    })
    const response = await request.json()
    if (!request.ok) {

        if ('message' in response && response.message === 'email not verified') {
            redirect('/email-confirmation')
        }
        if ('errors' in response) {
            return {
                error: true,
                message: response.errors[0].message
            }
        }
        return {
            error: true,
            message: "Une erreur est survenue lors de la connexion"
        }

    }

    const { token, user } = response as UserResponse
    // set the token to header for future requests
    const cookieStore = cookies()
    cookieStore.set('token', token.token, { path: '/', httpOnly: true })
    return {
        token: token.token,
        user
    }
}

export async function logout() {
    const cookiesStore = cookies()
    const token = cookiesStore.get('token')?.value

    const request = await fetch(`${serverUrl}/logout`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
        },
    })
    const response = await request.json()
    cookiesStore.delete('token')



}