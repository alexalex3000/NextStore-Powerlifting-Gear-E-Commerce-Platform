import OrderGrid from "@/widgets/OrderGrid/OrderGrid";
import {Metadata} from "next";

export const metadata: Metadata = {
    title: "Orders",
}

export default function OrdersPage() {
    return (
        <OrderGrid/>
    )
}