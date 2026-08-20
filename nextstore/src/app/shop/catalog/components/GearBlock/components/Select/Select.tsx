"use client"

import { useEffect, useRef, useState } from "react";
import styles from "./Select.module.scss";
import {usePathname, useRouter, useSearchParams} from "next/navigation";
import {wordTrim} from "@/utils/wordTrim";

export default function Select() {
    const searchParams = useSearchParams();
    const router = useRouter();
    const path = usePathname()
    const options = ["Featured", "Price Low", "Price High", "Top Rated", "Most Reviews"];

    const [activeOption, setActiveOption] = useState(options[0]);
    const [isActiveSelect, setActiveSelect] = useState<boolean>(false);

    const selectRef = useRef<HTMLDivElement>(null);

    const handleClick = (item:string) => {
        setActiveOption(item);
        setActiveSelect(false);

        const trimmedItem = wordTrim(item);

        const params = new URLSearchParams(window.location.search);
        if(trimmedItem){
            params.set("sort", trimmedItem)
        }
        else{
            params.delete("sort")
        }

        const queryString = params.toString();
        const newUrl = queryString ? `${path}?${queryString}` : path;

        window.history.replaceState(null, '', newUrl);
    }

    useEffect(() => {
        const handleActive = (event: MouseEvent) => {
            if (selectRef.current && !selectRef.current.contains(event.target as Node)) {
                setActiveSelect(false);
            }
        };

        window.addEventListener("click", handleActive);
        return () => window.removeEventListener("click", handleActive);
    }, []);

    return (
        <div className={styles.selectWrapper} ref={selectRef}>
            <div
                className={styles.selected}
                onClick={(e) => {
                    e.stopPropagation();
                    setActiveSelect(prev => !prev);
                }}
            >
                {activeOption}
            </div>

            {isActiveSelect && (
                <div className={styles.optionsList}>
                    {options.map((item, index) => (
                        <div
                            key={index}
                            className={`${styles.option} ${item == activeOption ? styles.selectedOpt : ""}`}
                            onClick={() => {handleClick(item)}}
                        >
                            {item}
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}