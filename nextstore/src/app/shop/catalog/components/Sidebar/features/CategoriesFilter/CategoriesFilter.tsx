'use client';

import styles from "@/app/shop/catalog/components/Sidebar/Sidebar.module.scss";
import { wordTrim } from "@/utils/wordTrim";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import CategoryItem from "@/app/shop/catalog/components/Sidebar/features/CategoriesFilter/ui/CategoryItem";

export default function CategoriesFilter() {
    const router = useRouter();
    const pathname = usePathname();
    const searchParams = useSearchParams();

    const activeCategory = searchParams.get("category") ?? "";

    const allSetting = [
        { title: "belts", num: 2 },
        { title: "shoes", num: 2 },
        { title: "chalk", num: 2 },
        { title: "straps", num: 2 }
    ];

    const handleClick = (item: string) => {
        const trimmedItem = wordTrim(item).toLowerCase();
        const params = new URLSearchParams(searchParams.toString());

        if (activeCategory === trimmedItem) {
            params.delete("category");
        } else if (trimmedItem) {
            params.set("category", trimmedItem);
        }

        router.replace(`${pathname}?${params.toString()}`, {scroll: false});
    };

    return (
        <div className={styles.categories}>
            <div className={styles.section}>
                <h2 className={styles.sectionTitle}>Categories</h2>
                <div className={styles.list}>
                    {allSetting.map((item) => {
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