import styles from "./OrderProduct.module.scss";

export default function OrderProduct() {
    return (
        <div className={styles.orderProduct}>
            <div>
                <div>
                    <img src="/belt-placeholder.jpg" alt="IPF LEVER BELT 13MM" />
                </div>
                <div>
                    <h1>IPF LEVER BELT 13MM</h1>
                    <p>Qty: 1</p>
                </div>
                <div className={styles.price}>
                    $189
                </div>
            </div>
        </div>
    );
}