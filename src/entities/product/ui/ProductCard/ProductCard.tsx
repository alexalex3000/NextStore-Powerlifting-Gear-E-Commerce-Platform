import Link from "next/link";
import styles from "./ProductCard.module.scss"
import Image from "next/image";
import Stars from "@/shared/ui/Stars/Stars";
import AddToBasket from "@/shared/ui/AddToBasket/AddToBasket";
import Bestseller from "@/entities/product/ui/demandType/Bestseller/Bestseller";
import Price from "@/entities/product/ui/Price/Price";

interface ProductId {
    id: string;
    type: string;
    title: string;
    currentPrice: number;
    oldPrice:  number | null;
    count: number;
    assessment: number;
    numOfFeedbacks: number;
    imgUrl: string;
}

interface Props{
    product: ProductId;
}

export default function ProductCard({product}: Props){
    return (
        <Link href={`/shop/catalog/${product.id}`}>
            <article className={styles.card}>
                <div className={styles.imageWrapper}>
                    <Bestseller/>
                    <Image src={product.imgUrl} alt={product.title}
                           fill
                           sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 600px"
                           style={{ objectFit: 'cover' }}/>
                </div>

                <div className={styles.content}>
                    <span className={styles.category}>{product.type}</span>
                    <h1 className={styles.title}>{product.title}</h1>

                    <div className={styles.rating}>
                        <Stars count={product.assessment} />
                        <span className={styles.reviewCount}>({product.numOfFeedbacks})</span>
                    </div>

                    <footer className={styles.footer}>
                        <Price size="small" currentPrice={product.currentPrice} oldPrice={product.oldPrice ? product.oldPrice : null}/>
                        <AddToBasket id={product.id} />
                    </footer>
                </div>
            </article>
        </Link>
    )
}