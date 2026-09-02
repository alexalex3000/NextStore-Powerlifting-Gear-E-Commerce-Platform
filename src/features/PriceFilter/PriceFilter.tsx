"use client";

import styles from "./PriceFilter.module.scss";
import {ChangeEvent, startTransition, useEffect, useState} from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

interface Props {
    maxPrice: number;
}

export default function PriceFilter({ maxPrice }: Props) {
    const router = useRouter();
    const path = usePathname();
    const searchParams = useSearchParams();

    const urlPrice = searchParams.get("max_price");
    const initialPrice = urlPrice ?? maxPrice.toString();

    const [currentPrice, setCurrentPrice] = useState(initialPrice);

    useEffect(() => {
        if (urlPrice && urlPrice !== currentPrice) {
            setCurrentPrice(urlPrice);
        }
    }, [urlPrice]);

    useEffect(() => {
        const params = new URLSearchParams(searchParams.toString());
        let updated = false;

        if (!params.has("max_price")) {
            params.set("max_price", maxPrice.toString());
            updated = true;
        }

        if (!params.has("stars")) {
            params.set("stars", "1");
            updated = true;
        }

        if (updated) {
            router.replace(`${path}?${params.toString()}`, { scroll: false });
        }
    }, []);

    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        setCurrentPrice(event.target.value);

        startTransition(() => {
            const params = new URLSearchParams(searchParams.toString());

            params.set("max_price", event.target.value.toString());

            router.replace(`${path}?${params.toString()}`, { scroll: false });
        })
    };

    return (
        <div className={styles.section}>
            <h2 className={styles.sectionTitle}>Price</h2>

            <div className={styles.priceHeader}>
                <span className={styles.priceAccent}>Up to ${currentPrice}</span>
            </div>

            <input
                onChange={handleChange}
                type="range"
                min="0"
                max={maxPrice}
                value={currentPrice}
                className={styles.rangeInput}
            />

            <div className={styles.priceFooter}>
                <span className={styles.priceDim}>$0</span>
                <span className={styles.priceDim}>${maxPrice}</span>
            </div>
        </div>
    );
}