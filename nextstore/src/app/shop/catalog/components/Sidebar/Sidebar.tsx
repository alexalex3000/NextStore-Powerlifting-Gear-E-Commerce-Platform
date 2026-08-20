"use client"

import { SlidersHorizontal } from "lucide-react";
import styles from "./Sidebar.module.scss";
import CategoriesFilter from "@/app/shop/catalog/components/Sidebar/features/CategoriesFilter/CategoriesFilter";
import PriceFilter from "@/app/shop/catalog/components/Sidebar/features/PriceFilter/PriceFilter";
import StarFilter from "@/app/shop/catalog/components/Sidebar/features/StarFilter/StarFilter";
import { useState, useEffect } from "react";

export default function Sidebar() {
    const [isOpen, setIsOpen] = useState(false);
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        const handleResize = () => setIsMobile(window.innerWidth <= 910);
        handleResize(); // Проверяем ширину при монтировании

        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    if (isMobile) {
        return (
            <aside className={styles.sidebar}>
                <div
                    className={`${styles.header} cursor-pointer select-none`}
                    onClick={() => setIsOpen(prev => !prev)}
                >
                    <SlidersHorizontal className={styles.headerIcon} />
                    <h1 className={styles.headerTitle}>Filters</h1>
                </div>

                <div
                    className={`
                        overflow-hidden transition-all duration-300 ease-in-out flex flex-col gap-6
                        ${isOpen ? "max-h-[1000px] opacity-100 mt-4" : "max-h-0 opacity-0 mt-0"}
                    `}
                >
                    <CategoriesFilter />
                    <PriceFilter maxValue={100} />
                    <StarFilter />
                </div>
            </aside>
        );
    }

    return (
        <aside className={styles.sidebar}>
            <div className={styles.header}>
                <SlidersHorizontal className={styles.headerIcon} />
                <h1 className={styles.headerTitle}>Filters</h1>
            </div>

            <CategoriesFilter />
            <PriceFilter maxValue={100} />
            <StarFilter />
        </aside>
    );
}