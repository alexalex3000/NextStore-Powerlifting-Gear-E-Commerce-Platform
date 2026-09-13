import OrderBlock from "@/entities/order/ui/OrderBlock/OrderBlock";

export default function OrdersPage() {
    return (
        <div className="flex flex-col gap-4">
            <OrderBlock/>
            <OrderBlock/>
            <OrderBlock/>
        </div>
    )
}