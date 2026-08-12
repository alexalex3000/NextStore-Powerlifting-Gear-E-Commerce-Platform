import { SlidersHorizontal, Star } from "lucide-react";
import styles from "./Sidebar.module.scss";
import StarBlock from "@/app/shop/components/StarBlock/StarBlock";

export default function Sidebar() {
    return (
        <aside className={styles.sidebar}>
            {/* Заголовок сайдбара */}
            <div className={styles.header}>
                <SlidersHorizontal className={styles.headerIcon} />
                <h1 className={styles.headerTitle}>Filters</h1>
            </div>

            {/* Фильтр: Категории */}
            <div className={styles.categories}>
                <div className={styles.section}>
                    <h2 className={styles.sectionTitle}>Categories</h2>
                    <div className={styles.list}>
                        <label className={styles.listItem}>
                            <input type="checkbox" className={styles.checkbox} />
                            <span className={styles.itemName}>Belts</span>
                            <span className={styles.itemCount}>2</span>
                        </label>
                        <label className={styles.listItem}>
                            <input type="checkbox" className={styles.checkbox} />
                            <span className={styles.itemName}>Shoes</span>
                            <span className={styles.itemCount}>2</span>
                        </label>
                        <label className={styles.listItem}>
                            <input type="checkbox" className={styles.checkbox} defaultChecked />
                            <span className={styles.itemName}>Chalk</span>
                            <span className={styles.itemCount}>2</span>
                        </label>
                        <label className={styles.listItem}>
                            <input type="checkbox" className={styles.checkbox} />
                            <span className={styles.itemName}>Straps</span>
                            <span className={styles.itemCount}>2</span>
                        </label>
                    </div>
                </div>
            </div>

            <div className={styles.section}>
                <h2 className={styles.sectionTitle}>Price range</h2>

                <div className={styles.priceHeader}>
                    <span className={styles.priceAccent}>Up to $300</span>
                </div>

                <input
                    type="range"
                    min="0"
                    max="300"
                    defaultValue="300"
                    className={styles.rangeInput}
                />

                <div className={styles.priceFooter}>
                    <span className={styles.priceDim}>$0</span>
                    <span className={styles.priceDim}>$300</span>
                </div>
            </div>

            {/* Фильтр: Рейтинг */}
            <div className={styles.section}>
                <h2 className={styles.sectionTitle}>Min rating</h2>
                <div className={styles.list}>
                    <label className={styles.listItem}>
                        <input type="radio" name="rating" className={styles.hiddenRadio} />
                        <StarBlock numOfStars={4}/>
                        <span className={styles.itemName}>4+ Stars</span>
                    </label>

                    <label className={styles.listItem}>
                        <input type="radio" name="rating" className={styles.hiddenRadio} />
                        <StarBlock numOfStars={3}/>
                        <span className={styles.itemName}>3+ Stars</span>
                    </label>

                    <label className={styles.listItem}>
                        <input type="radio" name="rating" className={styles.hiddenRadio} />
                        <StarBlock numOfStars={2}/>
                        <span className={styles.itemName}>2+ Stars</span>
                    </label>

                    <label className={styles.listItem}>
                        <input type="radio" name="rating" className={styles.hiddenRadio} defaultChecked />
                        <StarBlock numOfStars={1}/>
                        <span className={styles.itemName}>All</span>
                    </label>
                </div>
            </div>
        </aside>
    );
}