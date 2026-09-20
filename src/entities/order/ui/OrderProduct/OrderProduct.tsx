import styles from "./OrderProduct.module.scss";
import {OrderItems} from "@/entities/order/ui/OrderBlock/OrderBlock";
import Image from "next/image";
import {redirect} from "next/navigation";

interface Props {
    product: OrderItems;
}

export default function OrderProduct({product}: Props) {
    if (!product.product) {
        redirect("/profile");
    }

    return (
        <div className={styles.orderProduct}>
            <div>
                <div>
                    <Image src={product.product.imgUrl} alt={product.product.title} fill sizes="90px" style={{ objectFit: "cover" }}/>
                </div>
                <div>
                    <h1>{product.product.title}</h1>
                    <p>Qty: {product.count}</p>
                </div>
                <div className={styles.price}>
                    ${product.product.currentPrice}
                </div>
            </div>
        </div>
    );
}