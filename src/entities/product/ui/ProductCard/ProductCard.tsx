import Link from "next/link";
import styles from "./ProductCard.module.scss"
import Image from "next/image";
import Stars from "@/shared/ui/Stars/Stars";
import AddToBasket from "@/shared/ui/AddToBasket/AddToBasket";

export default function ProductCard(){
    return (
        <Link href="/shop/catalog/1">
            <article className={styles.card}>
                <div className={styles.imageWrapper}>
                    <div className={styles.badge}>BESTSELLER</div>
                    <Image src={""} alt="hello"
                           fill
                           sizes="(max-width: 768px) 100vw, 300px"
                           style={{ objectFit: 'cover' }}/>
                </div>

                <div className={styles.content}>
                    <span className={styles.category}>BELT</span>
                    <h1 className={styles.title}>IPF BELT 13mm</h1>

                    <div className={styles.rating}>
                        <Stars count={3} />
                        <span className={styles.reviewCount}>(321)</span>
                    </div>

                    <footer className={styles.footer}>
                        <div className={styles.prices}>
                            <span className={styles.currentPrice}>123$</span>
                            <span className={styles.oldPrice}>123$</span>
                        </div>
                        <AddToBasket/>
                    </footer>
                </div>
            </article>
        </Link>
    )
}