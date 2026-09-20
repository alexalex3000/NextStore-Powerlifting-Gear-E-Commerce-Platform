import styles from "@/widgets/Header/Header.module.scss";
import {cookies} from "next/headers";
import Link from "next/link";
import {ShoppingCart} from "lucide-react";
import {db} from "@/shared/db/db";
import {redirect} from "next/navigation";


export default async function HeaderActions() {
    const cookiesClient = await cookies();
    const token = cookiesClient.get("session_token")?.value;

    if(!token) {
        redirect("/login");
    }

    const numOfProd = await db.query.sessions.findFirst({
        where: (sessions, {eq}) => eq(sessions.id, token),
        with: {
            user: {
                with: {
                    basket: {
                        with: {
                            basketItems: true
                        }
                    }
                }
            }
        }
    })

    return (
        <Link href="/shop/basket" className={styles.cartLink}>
            <ShoppingCart/>
            <span className={styles.badge}>{numOfProd?.user?.basket?.basketItems?.length ?? 0}</span>
        </Link>
    )
}