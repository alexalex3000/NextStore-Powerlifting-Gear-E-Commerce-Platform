"use client"

import CategoriesFilter from "@/features/CategoriesFilter/CategoriesFilter";
import styles from "../CatalogSideBar.module.scss"
import StarFilter from "@/features/StarFilter/StarFilter";
import PriceFilter from "@/features/PriceFilter/PriceFilter";
import {useState, useEffect} from "react";
import {SlidersHorizontal} from "lucide-react";

type Params =  {
    types: {
        type: string
        num: number
    }[]
    maxPrice: number
} | null

interface Props{
    filterData: Params;
}

const categories = [
    {type: "BELTS", num: 0},
    {type: "T-SHIRT", num: 0},
    {type: "KNEESLEEVES", num: 0},
]

export default function CatalogSidebar({filterData}: Props){
    const [isOpen, setIsOpen] = useState(false);
    const [isMobile, setIsMobile] = useState(false);


    useEffect(() => {
        const handleResize = () => setIsMobile(window.innerWidth <= 768);
        handleResize();

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
                    <CategoriesFilter categories={filterData?.types ?? categories}/>
                    <PriceFilter maxPrice={300}/>
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

            <CategoriesFilter categories={filterData?.types ?? categories}/>
            <PriceFilter maxPrice={filterData?.maxPrice ?? 1000}/>
            <StarFilter />
        </aside>
    );
}