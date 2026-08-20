"use client"

import styles from "@/app/components/Header/Header.module.scss";
import {Search} from "lucide-react";
import {usePathname, useRouter, useSearchParams} from "next/navigation";
import {ChangeEvent} from "react";

export default function SearchBlock() {
    const path = usePathname()
    const searchParams = useSearchParams()
    const router = useRouter()

    const handleChange = (event:ChangeEvent<HTMLInputElement>) => {
        const value = event.target.value;
        const params = new URLSearchParams(window.location.search);

        if(value.length === 0){
            params.delete("search");
        } else{
            params.set("search", value);
        }

        const queryString = params.toString();
        const newUrl = queryString ? `${path}?${queryString}` : path;

        window.history.replaceState(null, '', newUrl);
    }

    return (
        <div className={styles.searchWrapper}>
            <Search className={styles.searchIcon} />
            <input
                onChange={handleChange}
                type="text"
                placeholder="Search equipment..."
                className={styles.searchInput}
            />
        </div>
    )
}