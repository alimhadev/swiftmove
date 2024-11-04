import 'server-only'
import { SignJWT, jwtVerify } from 'jose'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import { getServerUrl } from './utils'
const secretKey = "eieYyoy/H0gxnYy37dUIHcHmLw7WrLNn6vG1KAJve6w="
const encodedKey = new TextEncoder().encode(secretKey)

export async function encrypt(payload: any) {
    return new SignJWT(payload)
        .setProtectedHeader({ alg: 'HS256' })
        .setIssuedAt()
        .setExpirationTime('7d')
        .sign(encodedKey)
}

export async function decrypt(session: string | undefined = '') {
    try {
        const { payload } = await jwtVerify(session, encodedKey, {
            algorithms: ['HS256'],
        })
        return payload
    } catch (error) {
        console.log('Failed to verify session ', error)
        return null
    }
}

export async function createSession(userId: string) {
    const cookieStore = cookies()
    const expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)
    const session = await encrypt({ userId, expiresAt })
    cookieStore.set(
        'session',
        session,
        {
            httpOnly: true,
            secure: true,
            expires: expiresAt,
            sameSite: 'lax',
            path: '/',
        }
    )
}

export async function updateSession() {
    const session = cookies().get('session')?.value
    const payload = await decrypt(session)

    if (!session || !payload) {
        return null
    }

    const expires = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)

    const cookieStore = cookies()
    cookieStore.set('session', session, {
        httpOnly: true,
        secure: true,
        expires: expires,
        sameSite: 'lax',
        path: '/',
    })
}

export async function deleteSession() {
    const cookieStore = cookies()
    cookieStore.delete('session')
}

export const checkSession = async () => {
    const token = cookies().get('token')?.value
    if (!token) {
        return redirect('/sign-in')
    }
    const serverUrl = getServerUrl();
    const request = await fetch(`${serverUrl}/current-user`, {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
        },
    });
    const response = await request.json()
    if (!request.ok) {
        return redirect('/sign-in')
    }
    return response as User

}