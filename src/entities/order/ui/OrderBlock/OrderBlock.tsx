import OrderProduct from "@/entities/order/ui/OrderProduct/OrderProduct";
import styles from "./OrderBlock.module.scss";
import OrderStatus from "@/entities/order/ui/OrderStatus/OrderStatus";

export default function OrderBlock() {
    return (
        <div className={styles.orderBlock}>
            <header>
                <div>
                    <h2>ORD-2313</h2>
                    <p>Aug 10, 2026</p>
                </div>
                <div>
                    <OrderStatus status={"shipped"}/>
                </div>
            </header>
            <div>
                <OrderProduct />
            </div>
            <footer>
                <p className={styles.tracking}>
                    TRACKING: <span>1Z999AA1012345678</span>
                </p>
                <p>
                    Order total: <span>$123</span>
                </p>
            </footer>
        </div>
    );
}