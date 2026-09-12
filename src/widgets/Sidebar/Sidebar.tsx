import styles from "./Sidebar.module.scss";
import NavBlock from "@/widgets/Sidebar/ui/NavBlock/NavBlock";
import {Suspense} from "react";
import StringSkeleton from "@/shared/ui/StringSkeleton/StringSkeleton";
import getUserByCookies from "@/shared/lib/getUserByCookies";
import {cookies} from "next/headers";
import {redirect} from "next/navigation";
import NoLogo from "@/entities/user/ui/NoLogo/NoLogo";


export default async function Sidebar() {
    const cookiesClient = await cookies();
    const token = cookiesClient.get("session_token")?.value;

    if(!token){
        redirect("/shop/catalog")
    }

    const userData = await getUserByCookies(token)

    if(!userData){
        redirect("/shop/catalog")
    }

    return (
        <aside className={styles.sidebar}>
            <div className={styles.userInfo}>
                <NoLogo title={`${userData.user.firstName}${userData.user.lastName}`}/>

                <Suspense fallback={<StringSkeleton/>}><h2 className={styles.userName}>{userData.user.firstName} {userData.user.lastName}</h2></Suspense>
                <Suspense fallback={<StringSkeleton/>}></Suspense><p className={styles.userEmail}>{userData.user.email}</p>
            </div>
            <NavBlock/>
        </aside>
    );
}