import styles from "@/app/shop/catalog/components/Sidebar/Sidebar.module.scss";
import {Star} from "lucide-react";

export default function StarBlock({numOfStars}: {numOfStars: number}) {
    const arrStars = new Array<number>(numOfStars);
    for(let i = 0; i < numOfStars + 1; i++){
        arrStars.push(i);
    }
    arrStars.reverse();
    for(let i = arrStars.length - 1; i < 5; i++){
        arrStars.push(0);
    }
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