import styles from "@/widgets/Header/Header.module.scss";
import { cookies } from "next/headers";
import Link from "next/link";
import { ShoppingCart } from "lucide-react";
import { db } from "@/shared/db/db";
import { redirect } from "next/navigation";
import { cacheLife, cacheTag } from "next/cache";

async function getCachedBasketCount(token: string) {
    "use cache";
    cacheTag(`basket-count-${token}`);
    cacheLife("seconds");

    const session = await db.query.sessions.findFirst({
        where: (sessions, { eq }) => eq(sessions.id, token),
        with: {
            user: {
                with: {
                    basket: {
                        with: {
                            basketItems: true,
                        },
                    },
                },
            },
        },
    });

    return session?.user?.basket?.basketItems?.length ?? 0;
}

export default async function HeaderActions() {
    const cookiesClient = await cookies();
    const token = cookiesClient.get("session_token")?.value;

    if (!token) {
        redirect("/login");
    }

    const basketCount = await getCachedBasketCount(token);

    return (
        <Link href="/shop/basket" className={styles.cartLink}>
            <ShoppingCart />
            <span className={styles.badge}>{basketCount}</span>
        </Link>
    );
}