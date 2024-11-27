
import UserDashboard from "@/components/dashboard/user-view";
import { getUser, } from "@/lib/session";
import { redirect } from "next/navigation";
export default async function page() {
    const user = await getUser()
    console.log("dashboard", user)
    if (!user) {
        return redirect('/sign-in')
    }
    return (
        <UserDashboard user={user} />
    );
}
