import styles from "./AddToBasketWid.module.scss";
import Stars from "@/shared/ui/Stars/Stars";
import Bestseller from "@/entities/product/ui/demandType/Bestseller/Bestseller";
import Price from "@/entities/product/ui/Price/Price";
import {BadgeCheck, BadgeMinus} from "lucide-react";
import SelectSize from "@/entities/product/ui/SelectSize/SelectSize";
import {Product} from "@/entities/product/model/types";
import Image from "next/image";

interface Props {
    product: Product
}

export default async function AddToBasketWid({product}: Props) {
    return (
        <div className={styles.headWrapper}>
            <div className={styles.img}>
                <Image src={product.imgUrl} alt={product.title} fill style={{ objectFit: 'cover' }}/>
            </div>
            <div className={styles.productInfo}>
                <div className={styles.head}>
                    <Bestseller/>
                    <p className={styles.type}>{product.type}</p>
                    <p className={styles.title}>{product.title}</p>
                    <div className={styles.stars}>
                        <Stars count={product.assessment}/>
                        <p>({product.numOfFeedbacks} reviews)</p>
                    </div>
                </div>
                <div className={styles.price}>
                    <Price size="large" currentPrice={product.currentPrice} oldPrice={product.oldPrice}/>
                </div>
                <div className={styles.state}>
                    {
                        product.count > 0 ? (
                            <div className={styles.inStock}>
                                <BadgeCheck/>
                                In Stock
                            </div>
                        ) : (
                            <div className={styles.outOfStock}>
                                <BadgeMinus/>
                                Out of Stock
                            </div>
                        )
                    }
                    <SelectSize/>
                </div>
            </div>
        </div>
    )
}