"use client"

import styles from "@/app/shop/catalog/components/Sidebar/Sidebar.module.scss";
import { ChangeEvent, useEffect } from "react";
import { usePathname, useSearchParams } from "next/navigation";

interface Props {
    maxValue: number;
}

export default function PriceFilter({ maxValue }: Props) {
    const path = usePathname();
    const searchParams = useSearchParams();

    const currentMaxPrice = searchParams.get("maxPrice") ?? maxValue.toString();

    useEffect(() => {
        const params = new URLSearchParams(window.location.search);
        let updated = false;

        if (!params.has("maxPrice")) {
            params.set("maxPrice", maxValue.toString());
            updated = true;
        }

        if (!params.has("star")) {
            params.set("star", "1");
            updated = true;
        }

        if (updated) {
            window.history.replaceState(null, '', `${path}?${params.toString()}`);
        }
    }, [maxValue, path]);

    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        const params = new URLSearchParams(window.location.search);
        params.set("maxPrice", event.target.value);

        window.history.replaceState(null, '', `${path}?${params.toString()}`);
    };

    return (
        <div className={styles.section}>
            <h2 className={styles.sectionTitle}>Price range</h2>

            <div className={styles.priceHeader}>
                <span className={styles.priceAccent}>Up to ${currentMaxPrice}</span>
            </div>

            <input
                onChange={handleChange}
                type="range"
                min="0"
                max={maxValue}
                value={currentMaxPrice}
                className={styles.rangeInput}
            />

            <div className={styles.priceFooter}>
                <span className={styles.priceDim}>$0</span>
                <span className={styles.priceDim}>${maxValue}</span>
            </div>
        </div>
    );
}