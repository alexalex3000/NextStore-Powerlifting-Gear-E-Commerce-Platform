import OrderProduct from "@/entities/order/ui/OrderProduct/OrderProduct";
import styles from "./OrderBlock.module.scss";
import OrderStatus, {Status} from "@/entities/order/ui/OrderStatus/OrderStatus";
import {getCurrentDate} from "@/shared/utils/getCurrentDate";
import {Product} from "@/entities/product/model/types";

export interface OrderItems {
    id: string;
    count: number;
    productId: string | null;
    orderId: string;
    size: "XS" | "S" | "M" | "L" | "XL" | "XXL" | null;
    product: Product | null;
}

interface Props{
    id: string,
    createdAt: Date,
    products: OrderItems[],
    status: Status
}

export default function OrderBlock({id, createdAt, products, status}: Props) {
    const date = getCurrentDate(new Date(createdAt));
    let total = products.reduce((acc, product) => {
        const price = product.product?.currentPrice ?? 0;
        return acc + price * product.count;
    }, 0)

    if(total < 500){
        total*=1.05
        total.toFixed(2)
    }


    return (
        <div className={styles.orderBlock}>
            <header>
                <div>
                    <h2>ORD-{id.slice(0,6)}</h2>
                    <p>{date}</p>
                </div>
                <div>
                    <OrderStatus status={status}/>
                </div>
            </header>
            <div>
                {
                    products.map(product => (
                        <OrderProduct product={product} key={product.id} />
                    ))
                }
            </div>
            <footer>
                <p className={styles.tracking}>
                    TRACKING: <span>{id.slice(0, 10)}</span>
                </p>
                <p>
                    Order total: <span>${total}</span>
                </p>
            </footer>
        </div>
    );
}