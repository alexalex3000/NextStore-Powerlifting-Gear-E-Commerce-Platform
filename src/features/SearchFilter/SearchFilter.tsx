"use client"

import Input from "@/shared/ui/Input/Input";
import styles from "./SearchFilter.module.scss";
import {usePathname} from "next/navigation";

export default function SearchFilter() {
    const path = usePathname()

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value
        const params = new URLSearchParams(window.location.search);
        if(value.length === 0){
            params.delete("search");
        }
        else{
            params.set("search", value);
        }

        const queryString = params.toString();
        const newUrl = queryString ? `${path}?${queryString}` : path;

        window.history.replaceState(null, '', newUrl)
    }

    return (
        <div className={styles.searchFilter}>
            <Input type="text" label="" placeholder="Search gear" name="search" isSearch={true} handleChange={handleChange} />
        </div>
    );
}