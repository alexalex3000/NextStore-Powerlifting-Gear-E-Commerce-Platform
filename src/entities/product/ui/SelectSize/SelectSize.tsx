"use client"

import styles from "./SelectSize.module.scss"
import Select from "@/shared/ui/Select/Select";
import {useState} from "react";
import Button from "@/shared/ui/buttons/Button/Button";

export default function SelectSize(){
    const [active, setActive] = useState<string>("");

    const tempSizes = ["XS", "S", "M", "L", "XL", "XXL"];

    return (
        <div className={styles.select}>
            <Select active={active} setActive={setActive} options={tempSizes} placeholder="SELECT SIZE"/>
            <Button isPending={false} value="ADD TO BASKET" onClick={() => console.log("add to basket")}/>
        </div>
    )
}