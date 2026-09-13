"use client"

import PaymentCard from "@/entities/order/ui/PaymentCard/PaymentCard";
import Button from "@/shared/ui/buttons/Button/Button";
import {useActionState} from "react";
import {addCard} from "@/entities/order/api/addCard.action";

export default function PaymentBlock() {
    const [state, formAction, isPending] = useActionState<{
        success: boolean
    }, FormData>(async (previousState, formData) => {
        const res = await addCard()

        return {success: res.success}
    }, {success: false});

    if(state.success) {
        console.log("Card is successful added")
    }

    return (
        <form action={formAction} className="flex flex-col gap-4">
            <PaymentCard type={"VISA"}/>
            <PaymentCard type={"MASTERCARD"}/>
            <Button isPending={isPending}  onClick={() => console.log("Adding card")} value={isPending ? "ADDING CARD..." : "ADD CARD"}/>
        </form>
    )
}