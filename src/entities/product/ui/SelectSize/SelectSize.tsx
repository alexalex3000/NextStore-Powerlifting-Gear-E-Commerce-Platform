"use client"

import styles from "./SelectSize.module.scss"
import Select from "@/shared/ui/Select/Select";
import {useActionState, useState} from "react";
import Button from "@/shared/ui/buttons/Button/Button";
import {addToBasketDrop} from "@/entities/product/api/addToBasket.action";

interface Props{
    id: string;
}
export type ActiveType = "XS" | "S" | "M" | "L" | "XL" | "XXL" | ""

export default function SelectSize({id}: Props){
    const [active, setActive] = useState<ActiveType>("");

    const tempSizes: ActiveType[] = ["XS", "S", "M", "L", "XL", "XXL"];

    const [state, formAction, isPending] = useActionState<{success: boolean}, FormData>(async (previousState, formData) => {
        const data = await addToBasketDrop({id, size: active})

        if(data.serverError){
            setActive("")
            return {success: false}
        }

        if(data.validationErrors){
            setActive("")
            return {success: false}
        }

        setActive("")
        return {success: true}

    }, {success: false});

    return (
        <form className={styles.select} action={formAction}>
            <Select active={active} setActive={setActive} options={tempSizes} placeholder="SELECT SIZE"/>
            <Button className={active ? "!bg-[var(--accent,#d6ff00)] !text-black !border-[var(--accent,#d6ff00)] !hover:bg-[#c4ea00] cursor-pointer" : "!bg-[var(--card-2,#181818)] !text-zinc-500 !border-[#282828] cursor-not-allowed"}
                    isPending={false}
                    value="ADD TO BASKET"
                    type={"submit"}/>
        </form>
    )
}