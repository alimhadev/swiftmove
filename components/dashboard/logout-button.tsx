import { logout } from "@/action/auth";
import { Button } from "@/components/ui/button";
export default function LogoutButton() {
    return (
        <form action={async () => {
            await logout()
            // delete the token from local storage
            localStorage.removeItem("token")
        }}>

            <Button variant="outline" >
                Se déconnecter
            </Button>
        </form>
    )
}