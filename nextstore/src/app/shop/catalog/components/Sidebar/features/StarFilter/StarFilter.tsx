"use client"

import styles from "@/app/shop/catalog/components/Sidebar/Sidebar.module.scss";
import { usePathname, useSearchParams } from "next/navigation";
import StarItem from "@/app/shop/catalog/components/Sidebar/features/StarFilter/ui/StarItem";

const STARS_OPTIONS = [4, 3, 2, "all"] as const;

export default function StarFilter() {
    const path = usePathname();
    const searchParams = useSearchParams();

    const activeStar = searchParams.get("star") ?? "";

    const handleClick = (item: number | "all") => {
        const params = new URLSearchParams(window.location.search);

        if (item === "all") {
            params.delete("star");
        } else {
            const starStr = item.toString();
            if (activeStar === starStr) {
                params.delete("star");
            } else {
                params.set("star", starStr);
            }
        }

        const queryString = params.toString();
        const newUrl = queryString ? `${path}?${queryString}` : path;

        window.history.replaceState(null, '', newUrl);
    };

    return (
        <div className={styles.section}>
            <h2 className={styles.sectionTitle}>Min rating</h2>
            <div className={styles.list}>
                {STARS_OPTIONS.map((star) => {
                    const isSelected = star === "all"
                        ? !activeStar
                        : activeStar === star.toString();

                    return (
                        <StarItem
                            key={star}
                            numOfStar={star}
                            isActive={isSelected}
                            onClick={() => handleClick(star)}
                        />
                    );
                })}
            </div>
        </div>
    );
}