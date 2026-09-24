import { Suspense } from "react";
import styles from "./styles.module.scss";
import BasketList from "@/features/BasketList/BasketList";
import BasketInfo from "@/features/BasketInfo/BasketInfo";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { db } from "@/shared/db/db";
import { eq } from "drizzle-orm";
import { basket } from "@/entities/user/model/schema";
import getUserByCookies from "@/shared/lib/getUserByCookies";
import { Metadata } from "next";
import BasketSkeleton from "@/shared/ui/loaders/BasketSkeleton/BasketSkeleton";

export const metadata: Metadata = {
    title: "Basket",
};

async function getBasketList(userId: string) {
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

async function BasketContent() {
    const cookiesClient = await cookies();
    const token = cookiesClient.get("session_token")?.value;

    if (!token) {
        redirect("/login");
    }

    const userData = await getUserByCookies(token);

    if (!userData) {
        redirect("/login");
    }

    const data = await getBasketList(userData.user.id);

    return (
        <div className={styles.wrapper}>
            <div className={styles.header}>
                <h1>Your basket</h1>
                <p>{data?.basketItems?.length ?? 0} Items</p>
            </div>
            <div className={styles.main}>
                <BasketList basketProduct={data?.basketItems ?? []} />
                <BasketInfo
                    userPhone={userData.user.phoneNumber}
                    basketProduct={data?.basketItems ?? []}
                />
            </div>
        </div>
    );
}

export default function BasketPage() {
    return (
        <Suspense fallback={<BasketSkeleton/>}>
            <BasketContent />
        </Suspense>
    );
}