"use client"

import styles from "./GearCart.module.scss";
import StarBlock from "@/app/shop/components/StarBlock/StarBlock";
import AddButton from "@/app/shop/catalog/components/GearCart/ui/AddButton/AddButton";
import Link from "next/link";

export default function GearCart() {
    return (
        <Link href="/shop/catalog/1">
            <article className={styles.card}>
                <div className={styles.imageWrapper}>
                    <div className={styles.badge}>BESTSELLER</div>
                    <div className={styles.imagePlaceholder}></div>
                </div>

                <div className={styles.content}>
                    <span className={styles.category}>BELTS</span>
                    <h1 className={styles.title}>IPF LEVER BELT 13MM</h1>

                    <div className={styles.rating}>
                        <StarBlock numOfStars={4} />
                        <span className={styles.reviewCount}>(234)</span>
                    </div>

                    <footer className={styles.footer}>
                        <div className={styles.prices}>
                            <span className={styles.currentPrice}>$189</span>
                            <span className={styles.oldPrice}>$220</span>
                        </div>
                        <AddButton/>
                    </footer>
                </div>
            </article>
        </Link>
    );
}