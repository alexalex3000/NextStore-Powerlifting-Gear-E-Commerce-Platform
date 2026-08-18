import styles from "@/app/shop/catalog/components/Sidebar/Sidebar.module.scss";
import StarBlock from "@/app/shop/components/StarBlock/StarBlock";

interface Props {
    numOfStar: number | string;
    onClick: () => void;
}

export default function StarItem({numOfStar, onClick}: Props) {
    return (
        <label onChange={onClick} className={styles.listItem}>
            <input type="radio" name="rating" className={styles.hiddenRadio} />
            <StarBlock numOfStars={typeof numOfStar === "number" ? numOfStar : 1} />
            <span className={styles.itemName}>{typeof numOfStar === "number" ? `${numOfStar}+ Stars` : "All"}</span>
        </label>
    )
}