import GearCart from "@/app/shop/catalog/components/GearCart/GearCart";
import styles from "./GearBlock.module.scss";
import Select from "@/app/shop/catalog/components/GearBlock/components/Select/Select";

export default function GearBlock() {
    return (
        <div className={styles.wrapper}>
            <header className={styles.header}>
                <h1><span>8</span>PRODUCTS</h1>
                <Select />
            </header>
            <div className={styles.gridContainer}>
                <GearCart />
                <GearCart />
                <GearCart />
                <GearCart />
                <GearCart />
                <GearCart />
            </div>
        </div>
    );
}