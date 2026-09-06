import styles from "./ProductPage.module.scss"
import Bestseller from "@/entities/product/ui/demandType/Bestseller/Bestseller";
import Stars from "@/shared/ui/Stars/Stars";
import Price from "@/entities/product/ui/Price/Price";
import {BadgeCheck, BadgeMinus} from "lucide-react";
import SelectSize from "@/entities/product/ui/pageUi/SelectSize/SelectSize";
import SubmitButton from "@/shared/ui/buttons/SubmitButton/SubmitButton";

export default function ProductPage() {
    return (
        <div className={styles.wrapper}>
            <div className={styles.headWrapper}>
                <div className={styles.img}>{/*Не трогать*/}</div>
                <div className={styles.productInfo}>
                    <div className={styles.head}>
                        <Bestseller/>
                        <p className={styles.type}>BELTS</p>
                        <p className={styles.title}>IPF BELT</p>
                        <div className={styles.stars}>
                            <Stars count={3}/>
                            <p>(234 reviews)</p>
                        </div>
                    </div>
                    <div className={styles.price}>
                        <Price size="large" currentPrice={321} oldPrice={123}/>
                    </div>
                    <div className={styles.state}>
                        <div className={styles.inStock}>
                            <BadgeCheck />
                            In Stock
                        </div>
                        <div className={styles.outOfStock}>
                            <BadgeMinus/>
                            Out of Stock
                        </div>
                        <SelectSize/>
                    </div>
                </div>
            </div>
            <div className={styles.reviews}>
                <header>
                    <h1>Athlete Reviews <span>(234)</span></h1>
                </header>
                <div className={styles.reviewsGrid}>
                    <form className={styles.form}>
                        <h2>LEAVE AN REVIEW</h2>
                        <div className={styles.forLabels}>
                            <p>YOUR RATING</p>
                            <Stars count={3}/>
                        </div>
                        <div className={styles.forLabels}>
                            <label htmlFor="review">YOUR REVIEW</label>
                            <textarea name="review" id="review" cols={30} rows={10}></textarea>
                        </div>
                        <SubmitButton goal={"review"} isPending={false}/>
                    </form>
                    <div className={styles.allReview}>
                        <div className={styles.review}>
                            <header className={styles.header}>
                                <div className={styles.reviewAuthor}>
                                    <div className={styles.logo}>{/*не трогать*/}</div>
                                    <h2>Marcus</h2>
                                </div>
                                <div className={styles.assetment}>
                                    <Stars count={3}/>
                                    <p>July 28, 2021</p>
                                </div>
                            </header>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}