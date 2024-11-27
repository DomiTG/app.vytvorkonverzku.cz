import { useUser } from "@/contexts/UserContext"
import { useEffect } from "react";

export default function DashboardPage() {

    const { user, loading } = useUser();

    useEffect(() => {
        if (!user && !loading) {
            window.location.href = "/login";
        }
    }, [user, loading]);

    if(!user) return <div>Loading...</div>

    return(
        <div>
            {JSON.stringify(user)}
        </div>
    )
}
