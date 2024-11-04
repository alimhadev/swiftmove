import { logout } from "@/action/auth";
import { Button } from "@/components/ui/button";
export default function LogoutButton() {
    return (
        <form action={async () => {
            await logout()
        }}>

            <Button variant="outline" >
                Se déconnecter
            </Button>
        </form>
    )
}