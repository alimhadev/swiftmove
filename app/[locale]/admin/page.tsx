import AdminDashboard from "@/components/dashboard/admin-view";
import { getUser, } from "@/lib/session";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
export default async function page() {

    const user = await getUser()
    if (!user) {
        return redirect('/sign-in')
    }
    console.log(user)
    if (!user.isAdmin && !user.isSuperAdmin) {
        return redirect('/dashboard')
    }
    return (
        <AdminDashboard user={user} />
    );
}


