"use client"

import styles from "./StarFilter.module.scss";
import FilterBlock from "@/shared/ui/FIlterBlock/FilterBlock";
import Stars from "@/shared/ui/Stars/Stars";
import {usePathname, useSearchParams} from "next/navigation";

export default function StarFilter() {
    const query = useSearchParams()
    const path = usePathname()

    const starInner = [
        {
            count: 1,
            title: "ALL"
        },
        {
            count: 2,
            title: "2+ STARS"
        },
        {
            count: 3,
            title: "3+ STARS"
        },
        {
            count: 4,
            title: "4+ STARS"
        },
    ]

    const activeCategory = Number(query.get("stars")) ?? 1;


    const handleClick = (count: number) => {
        const params = new URLSearchParams(window.location.search);

        if(Number(params.get("stars")) === count) {
            params.delete("stars");
        }
        else{
            params.set("stars", `${count}`);
        }

        const queryString = params.toString();
        const newUrl = queryString ? `${path}?${queryString}` : path;

        window.history.replaceState(null, '', newUrl);
    }

    return (
        <div className={styles.stars}>
            <div className={styles.section}>
                <h2 className={styles.sectionTitle}>Stars</h2>
                <div className={styles.list}>
                    {starInner.map((item, index) => {
                        const isSelected = activeCategory === item.count;

                        return (
                            <FilterBlock key={index} isActive={isSelected} onClick={() => handleClick(item.count)}>
                                <div className={styles.innerFilter}>
                                    <Stars count={item.count}/>
                                    <p>{item.title}</p>
                                </div>
                            </FilterBlock>
                        );
                    })}
                </div>
            </div>
        </div>
    )
}