import { signout } from "@/action/auth";
import { Button } from "@/components/ui/button";
export default function LogoutButton() {
    return (
        <form action={async () => {
            await signout()
        }}>

            <Button variant="outline" >
                Se déconnecter
            </Button>
        </form>
    )
}