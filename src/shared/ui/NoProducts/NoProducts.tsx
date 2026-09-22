"use client"

import styles from "@/widgets/ProductGrid/ProductGrid.module.scss";

interface Props {
    position?: "top" | "mid";
}

export default function NoProducts({position}: Props) {
    return (
        <div className={position == "top" ? styles.noProductsTop : styles.noProducts}>
            NO PRODUCTS
        </div>
    )
}