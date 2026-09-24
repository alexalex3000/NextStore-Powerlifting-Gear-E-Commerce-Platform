import OrderGrid from "@/widgets/OrderGrid/OrderGrid";
import {Metadata} from "next";
import {Suspense} from "react";

export const metadata: Metadata = {
    title: "Orders",
}

export default function OrdersPage() {
    return (
        <Suspense fallback={null}>
            <OrderGrid/>
        </Suspense>
    )
}