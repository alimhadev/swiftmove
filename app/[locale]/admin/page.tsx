import AdminDashboard from "@/components/dashboard/admin-view";
import { checkSession, } from "@/lib/session";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
export default async function page() {

    const session = await checkSession()
    console.log(session)
    if (!session.isAdmin && !session.isSuperAdmin) {
        return redirect('/dashboard')
    }
    return (
        <AdminDashboard />
    );
}


