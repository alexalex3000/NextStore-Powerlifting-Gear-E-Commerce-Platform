import OrderGrid from "@/widgets/OrderGrid/OrderGrid";
import {Metadata} from "next";
import {Suspense} from "react";
import ProfileInfoSkeleton from "@/shared/ui/loaders/ProfileInfoSkeleton/ProfileInfoSkeleton";

export const metadata: Metadata = {
    title: "Orders",
}

export default function OrdersPage() {
    return (
        <Suspense fallback={<ProfileInfoSkeleton/>}>
            <OrderGrid/>
        </Suspense>
    )
}