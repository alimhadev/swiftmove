import 'server-only'
import { cookies } from 'next/headers'
import { getServerUrl } from './utils'


export const getUser = async () => {
    const token = cookies().get('token')?.value
    if (!token) {
        return undefined
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
        return undefined
    }
    return response as User

}