
import UserDashboard from "@/components/dashboard/user-view";
import { checkSession, } from "@/lib/session";
export default async function page() {
    await checkSession()
    return (
        <UserDashboard />
    );
}
