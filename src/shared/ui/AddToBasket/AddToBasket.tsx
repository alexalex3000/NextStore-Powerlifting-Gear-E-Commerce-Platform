"use client"

import {ShoppingCart} from "lucide-react";
import styles from "./AddToBasket.module.scss"
import {addToBasketDrop} from "@/entities/product/api/addToBasket.action";

interface Props{
    id: string
}

export default function AddToBasket({id}: Props){
    const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        e.stopPropagation()
        addToBasketDrop({id})
    }

    return (
        <button className={styles.addButton} onClick={handleClick}><ShoppingCart /> ADD</button>
    )
}