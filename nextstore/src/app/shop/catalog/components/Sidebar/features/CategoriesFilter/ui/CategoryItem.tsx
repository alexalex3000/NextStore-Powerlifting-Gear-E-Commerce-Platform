"use client";

import styles from "@/app/shop/catalog/components/Sidebar/Sidebar.module.scss";

interface Props {
    itemName: string;
    numOfItems: number;
    onClick: () => void;
    isActive?: boolean;
}

export default function CategoryItem({ itemName, numOfItems, onClick, isActive }: Props) {
    return (
        <label className={styles.listItem}>
            <input
                type="checkbox"
                checked={Boolean(isActive)}
                onChange={onClick} // Используем onChange вместо onClick на label
                className={styles.checkbox}
            />
            <span className={styles.itemName}>{itemName}</span>
            <span className={styles.itemCount}>{numOfItems}</span>
        </label>
    );
}