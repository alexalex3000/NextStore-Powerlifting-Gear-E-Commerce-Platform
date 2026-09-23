import PaymentBlock from "@/entities/order/ui/PaymentBlock/PaymentBlock";
import {Metadata} from "next";

export const metadata: Metadata = {
    title: "Payment",
}

export default async function PaymentPage() {

    return (
        <div>
            <PaymentBlock/>
        </div>
    )
}