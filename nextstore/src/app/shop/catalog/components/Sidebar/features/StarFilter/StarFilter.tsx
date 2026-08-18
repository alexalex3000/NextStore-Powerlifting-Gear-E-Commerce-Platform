"use client"

import styles from "@/app/shop/catalog/components/Sidebar/Sidebar.module.scss";
import StarBlock from "@/app/shop/components/StarBlock/StarBlock";
import {wordTrim} from "@/utils/wordTrim";
import {usePathname, useRouter, useSearchParams} from "next/navigation";
import StarItem from "@/app/shop/catalog/components/Sidebar/features/StarFilter/ui/StarItem";


export default function StarFilter() {
    const path = usePathname()
    const searchParams = useSearchParams()
    const router = useRouter()

    const activeStar = searchParams.get("star") ?? ""

    const handleClick = (item: number) => {
        const params = new URLSearchParams(searchParams.toString());

        if(activeStar == `${item}`){
            params.delete("star")
        } else{
            params.set("star", `${item}`)
        }
        router.replace(`${path}?${params.toString()}`, {scroll: false});
    };

    const arrOfStars = [4,3,2, "all"]

    return (
        <div className={styles.section}>
            <h2 className={styles.sectionTitle}>Min rating</h2>
            <div className={styles.list}>
                {
                    arrOfStars.map((star, i) => (
                        <div key={i}>
                            <StarItem numOfStar={star} onClick={() => handleClick(typeof star === "number" ? star : 1)}/>
                        </div>
                    ))
                }
            </div>
        </div>
    )
}