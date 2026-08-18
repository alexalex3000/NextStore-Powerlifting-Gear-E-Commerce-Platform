import { SlidersHorizontal } from "lucide-react";
import styles from "./Sidebar.module.scss";
import StarBlock from "@/app/shop/components/StarBlock/StarBlock";
import CategoriesFilter from "@/app/shop/catalog/components/Sidebar/features/CategoriesFilter/CategoriesFilter";
import PriceFilter from "@/app/shop/catalog/components/Sidebar/features/PriceFilter/PriceFilter";
import StarFilter from "@/app/shop/catalog/components/Sidebar/features/StarFilter/StarFilter";


export default function Sidebar() {
    return (
        <aside className={styles.sidebar}>
            <div className={styles.header}>
                <SlidersHorizontal className={styles.headerIcon} />
                <h1 className={styles.headerTitle}>Filters</h1>
            </div>

            <CategoriesFilter/>

            <PriceFilter maxValue={100}/>

            <StarFilter/>
        </aside>
    );
}