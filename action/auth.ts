'use server'

import { getServerUrl } from "@/lib/utils";
import { createSession, deleteSession } from "@/lib/session";
import { redirect } from "next/navigation";
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
    if (!request.ok) {
        const errorResponse = await request.json()
        console.log('Error logging in ', errorResponse)
        if ('message' in errorResponse && errorResponse.message === 'email not verified') {
            redirect('/email-confirmation')
        }
        // TODO: handle error
        // throw new Error('Error logging in')
    }

    const response = await request.json() as UserResponse
    const { token, user } = response
    await createSession(token.token)
    
    return response

}

export async function signout() {


    await deleteSession()

}