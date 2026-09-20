import OrderBlock from "@/entities/order/ui/OrderBlock/OrderBlock";
import {cookies} from "next/headers";
import {redirect} from "next/navigation";
import {db} from "@/shared/db/db";

export default async function OrderGrid() {
    const cookiesStore = await cookies()
    const token = cookiesStore.get("session_token")?.value

    if(!token) {
        redirect("/login")
    }

    const [orders] = await db.query.sessions.findMany({
        where: (sessions, {eq}) => eq(sessions.id, token),
        with: {
            user: {
                with: {
                    orders: {
                        with: {
                            items: {
                                with: {
                                    product: true
                                }
                            }
                        }
                    }
                }
            }
        }
    })

    if(!orders?.user?.orders) {
        redirect("/login")
    }

    return (
        <div className="flex flex-col gap-4">
            {
                orders.user.orders.map((order) => (
                    <OrderBlock key={order.id} id={order.id} products={order.items} createdAt={order.createdAt} status={order.status} />
                ))
            }
        </div>
    )
}