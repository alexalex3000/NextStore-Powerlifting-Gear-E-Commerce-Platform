import {Star} from "lucide-react";
import styles from "./Stars.module.scss"
interface Props{
    count: number;
}

export default function Stars({count}: Props){
    const arr:number[] = new Array(5).fill(0);
    const stars = arr.map((_, index)=>{
        if(count > index){
            return 1;
        }
        return 0;
    })

    return (
        <div className={styles.stars}>
            {
                stars.map((item, index) => {
                    if(item === 0){
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