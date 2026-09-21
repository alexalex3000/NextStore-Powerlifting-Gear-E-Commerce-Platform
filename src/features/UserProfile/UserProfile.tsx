import styles from "./UserProfile.module.scss";
import {redirect} from "next/navigation";
import getUserByCookies from "@/shared/lib/getUserByCookies";
import NoLogo from "@/entities/user/ui/NoLogo/NoLogo";

interface Props {
    token: string;
}

export default async function UserProfile({ token }: Props) {
    const userData = await getUserByCookies(token)

    if(!userData){
        redirect("/shop/catalog")
    }

    return (
        <div className={styles.userInfo}>
            <NoLogo size="large" title={`${userData.user.firstName}${userData.user.lastName}`}/>

            <h2 className={styles.userName}>{userData.user.firstName} {userData.user.lastName}</h2>
            <p className={styles.userEmail}>{userData.user.email}</p>
        </div>
    )
}