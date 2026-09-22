"use client"

import {Star} from "lucide-react";
import styles from "./RateStars.module.scss"

interface Props{
    rating:number;
    setRating: (rating:number) => void;
}

export default function RateStars({rating, setRating}: Props){
    const arr:number[] = new Array(5).fill(0);
    const stars = arr.map((_, index)=>{
        if(rating > index){
            return 1;
        }
        return 0;
    })


    const handleClick = (rate: number) => {
        setRating(rate);
    }

    return (
        <div className={styles.stars}>
            {
                stars.map((item, index) => (
                    <div key={index} onClick={() => {handleClick(index + 1)}}>
                        {
                            item == 1 ? <Star className={styles.starFilled}/> : <Star className={styles.starEmpty}/>
                        }
                    </div>
                ))
            }
        </div>
    )
}