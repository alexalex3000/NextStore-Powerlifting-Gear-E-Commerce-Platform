"use client"

import {ShoppingCart} from "lucide-react";
import styles from "./AddToBasket.module.scss"

export default function AddToBasket(){
    return (
        <button className={styles.addButton}><ShoppingCart /> ADD</button>
    )
}