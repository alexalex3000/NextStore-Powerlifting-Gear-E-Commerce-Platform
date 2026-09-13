import styles from "./styles.module.scss";
import BasketList from "@/features/BasketList/BasketList";
import BasketInfo from "@/features/BasketInfo/BasketInfo";
import {cookies} from "next/headers";
import {redirect} from "next/navigation";
import {db} from "@/shared/db/db";
import {eq} from "drizzle-orm";
import {basket} from "@/entities/user/model/schema";
import getUserByCookies from "@/shared/lib/getUserByCookies";

export async function getBasketList(userId: string) {
    return await db.query.basket.findFirst({
        where: eq(basket.userId, userId),
        with: {
            basketItems: {
                with: {
                    product: true,
                },
            },
        },
    });
}

export default async function BasketPage() {
    const cookiesClient = await cookies()
    const token = cookiesClient.get("session_token")?.value

    if(!token) {
        redirect("/login");
    }

    const userData = await getUserByCookies(token)

    if(!userData) {
        redirect("/login");
    }

    const data = await getBasketList(userData.user.id);

    if(!data || !data.basketItems) {
        redirect("/login");
    }

    return (
        <div className={styles.wrapper}>
            <div className={styles.header}>
                <h1>Your basket</h1>
                <p>{data.basketItems.length} items</p>
            </div>
            <div className={styles.main}>
                <BasketList basketProduct={data.basketItems}/>
                <BasketInfo basketProduct={data.basketItems}/>
            </div>
        </div>
    );
}