import styles from "@/app/shop/catalog/components/Sidebar/Sidebar.module.scss";
import {Star} from "lucide-react";

export default function StarBlock({numOfStars}: {numOfStars: number}) {
    const arr = new Array<number>(5).fill(0);
    const arrStars = arr.map((item, index) => {
        if(index < numOfStars){
            return 1;
        }

        return 0;
    })

    return (
        <div className={styles.stars}>
            {
                arrStars.map((item, index) => {
                    if(item == 0){
                        return (
                            <div key={index}><Star className={styles.starEmpty} /></div>
                        )
                    }

                    return (
                        <div key={index}><Star className={styles.starFilled} /></div>
                    )
                })
            }
        </div>
    )
}