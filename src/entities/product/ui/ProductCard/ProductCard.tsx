import Link from "next/link";
import styles from "./ProductCard.module.scss"
import Image from "next/image";
import Stars from "@/shared/ui/Stars/Stars";
import AddToBasket from "@/shared/ui/AddToBasket/AddToBasket";
import Bestseller from "@/entities/product/ui/demandType/Bestseller/Bestseller";
import Price from "@/entities/product/ui/Price/Price";

export default function ProductCard(){
    return (
        <Link href="/shop/catalog/1">
            <article className={styles.card}>
                <div className={styles.imageWrapper}>
                    <Bestseller/>
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
                        <Price size="small" currentPrice={123} oldPrice={123}/>
                        <AddToBasket/>
                    </footer>
                </div>
            </article>
        </Link>
    )
}