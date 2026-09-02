import {ShoppingCart} from "lucide-react";
import styles from "./AddToBasket.module.scss"

interface Props{
    onClick: () => void;
}

export default function AddToBasket(){
    return (
        <button className={styles.addButton}><ShoppingCart /> ADD</button>
    )
}