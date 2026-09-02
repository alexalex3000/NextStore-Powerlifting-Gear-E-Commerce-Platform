"use client"

import styles from "./CategoriesFilter.module.scss"
import {usePathname, useSearchParams} from "next/navigation";
import {trimWord} from "@/shared/utils/trimWord";
import FilterBlock from "@/shared/ui/FIlterBlock/FilterBlock";
import Stars from "@/shared/ui/Stars/Stars";

export default function CategoriesFilter() {
    const queryParams = useSearchParams()
    const path = usePathname()
    const activeCategory = queryParams.get("category") ?? ""

    const categories = [
        {title: "BELTS", num: 31},
        {title: "KNEESLEEVEES", num: 32},
        {title: "T-SHIRTS", num: 33},
    ]

    const handleClick = (item: string) => {
        const trimmedItem = trimWord(item).toLowerCase();

        const params = new URLSearchParams(window.location.search);

        if (activeCategory === trimmedItem) {
            params.delete("category");
        } else if (trimmedItem) {
            params.set("category", trimmedItem);
        }

        const queryString = params.toString();
        const newUrl = queryString ? `${path}?${queryString}` : path;

        window.history.replaceState(null, '', newUrl);
    };

    return (
        <div className={styles.categories}>
            <div className={styles.section}>
                <h2 className={styles.sectionTitle}>Categories</h2>
                <div className={styles.list}>
                    {categories.map((item, index) => {
                        const isSelected = activeCategory === item.title.toLowerCase();

                        return (
                            <FilterBlock key={index} isActive={isSelected} onClick={() => handleClick(item.title)}>
                                <div className={styles.innerFilter}>
                                    <p>{item.title}</p>
                                    <p>{item.num}</p>
                                </div>
                            </FilterBlock>
                        );
                    })}
                </div>
            </div>
        </div>
    )
}