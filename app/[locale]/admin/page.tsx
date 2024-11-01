import AdminDashboard from "@/components/dashboard/admin-view";
import { checkSession, } from "@/lib/session";
export default async function page() {
    await checkSession()
    return (
        <AdminDashboard />
    );
}


