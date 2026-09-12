import styles from "./Sidebar.module.scss";
import NavBlock from "@/widgets/Sidebar/ui/NavBlock/NavBlock";
import {Suspense} from "react";
import {cookies} from "next/headers";
import {redirect} from "next/navigation";
import UserProfile from "@/features/UserProfile/UserProfile";
import UserProfileSkeleton from "@/shared/ui/UserProfileSkeleton/UserProfileSkeleton";


export default async function Sidebar() {
    const cookiesClient = await cookies();
    const token = cookiesClient.get("session_token")?.value;

    if(!token){
        redirect("/shop/catalog")
    }

    return (
        <aside className={styles.sidebar}>
            <Suspense fallback={<UserProfileSkeleton/>}>
                <UserProfile token={token} />
            </Suspense>
            <NavBlock/>
        </aside>
    );
}