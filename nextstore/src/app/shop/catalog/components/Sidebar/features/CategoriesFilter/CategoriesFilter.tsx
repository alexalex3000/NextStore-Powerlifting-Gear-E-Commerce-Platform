'use client';

import { usePathname, useSearchParams } from "next/navigation";
import styles from "@/app/shop/catalog/components/Sidebar/Sidebar.module.scss";
import { wordTrim } from "@/utils/wordTrim";
import CategoryItem from "@/app/shop/catalog/components/Sidebar/features/CategoriesFilter/ui/CategoryItem";

const ALL_CATEGORIES = [
    { title: "belts", num: 2 },
    { title: "shoes", num: 2 },
    { title: "chalk", num: 2 },
    { title: "straps", num: 2 }
] as const;

export default function CategoriesFilter() {
    const pathname = usePathname();
    const searchParams = useSearchParams();

    const activeCategory = searchParams.get("category") ?? "";

    const handleClick = (item: string) => {
        const trimmedItem = wordTrim(item).toLowerCase();

        // Берём АКТУАЛЬНЫЕ параметры прямо из строки браузера
        const params = new URLSearchParams(window.location.search);

        if (activeCategory === trimmedItem) {
            params.delete("category");
        } else if (trimmedItem) {
            params.set("category", trimmedItem);
        }

        const queryString = params.toString();
        const newUrl = queryString ? `${pathname}?${queryString}` : pathname;

        window.history.replaceState(null, '', newUrl);
    };

    return (
        <div className={styles.categories}>
            <div className={styles.section}>
                <h2 className={styles.sectionTitle}>Categories</h2>
                <div className={styles.list}>
                    {ALL_CATEGORIES.map((item) => {
                        const isSelected = activeCategory === item.title.toLowerCase();

                        return (
                            <CategoryItem
                                key={item.title}
                                isActive={isSelected}
                                itemName={item.title}
                                numOfItems={item.num}
                                onClick={() => handleClick(item.title)}
                            />
                        );
                    })}
                </div>
            </div>
        </div>
    );
}