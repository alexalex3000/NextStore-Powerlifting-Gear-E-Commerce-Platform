"use client"

import styles from "@/app/shop/catalog/components/Sidebar/Sidebar.module.scss";
import {ChangeEvent, useEffect, useRef} from "react";
import {usePathname, useRouter, useSearchParams} from "next/navigation";

interface Props {
    maxValue: number;
}

export default function PriceFilter({maxValue}: Props) {
    const path = usePathname()
    const router = useRouter()
    const searchParams = useSearchParams()

    useEffect(() => {
        router.replace(`${path}?maxPrice=${maxValue}`)
    }, []);

    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        const params = new URLSearchParams(searchParams.toString())
        params.set("maxPrice", event.target.value)
        router.replace(`${path}?${params.toString()}`,{scroll: false})
    }

    return (
        <div className={styles.section}>
            <h2 className={styles.sectionTitle}>Price range</h2>

            <div className={styles.priceHeader}>
                <span className={styles.priceAccent}>Up to ${searchParams.get("maxPrice")}</span>
            </div>

            <input
                onChange={handleChange}
                type="range"
                min="0"
                max={maxValue}
                defaultValue={maxValue}
                className={styles.rangeInput}
            />

            <div className={styles.priceFooter}>
                <span className={styles.priceDim}>$0</span>
                <span className={styles.priceDim}>${maxValue}</span>
            </div>
        </div>
    )
}
