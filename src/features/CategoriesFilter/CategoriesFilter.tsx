"use client"

import styles from "./CategoriesFilter.module.scss"
import {usePathname, useSearchParams} from "next/navigation";
import {trimWord} from "@/shared/utils/trimWord";
import FilterBlock from "@/shared/ui/FIlterBlock/FilterBlock";

interface Props{
    categories: {type: string, num: number}[];
}

export default function CategoriesFilter({categories}: Props) {
    console.log(categories);

    const queryParams = useSearchParams()
    const path = usePathname()
    const activeCategory = queryParams.get("category") ?? ""

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
                        const isSelected = activeCategory === item.type.toLowerCase();

                        return (
                            <FilterBlock key={index} isActive={isSelected} onClick={() => handleClick(item.type)}>
                                <div className={styles.innerFilter}>
                                    <p>{item.type}</p>
                                    <p>{item.num == 0 ? "" : item.num}</p>
                                </div>
                            </FilterBlock>
                        );
                    })}
                </div>
            </div>
        </div>
    )
}