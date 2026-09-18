"use client"

import styles from "../BasketInfo.module.scss";

export interface BasketItemProduct {
    id: string;
    type: string;
    title: string;
    currentPrice: number;
    oldPrice: number | null;
    count: number;
    assessment: number;
    numOfFeedbacks: number;
    imgUrl: string;
}

export interface BasketInfoType {
    id: string;
    count: number;
    productId: string | null;
    basketId: string;
    product: BasketItemProduct | null;
}

interface Props {
    basketProduct: BasketInfoType[];
    subtotal: number;
    deliveryPrice: number;
}

export default function BasketProductInfo({ basketProduct, subtotal, deliveryPrice }: Props) {
    return (
        <div className={styles.summaryPart}>
            <h2>Order Summary</h2>
            <div>
                {basketProduct.map((item) => {
                    const price = item.product?.currentPrice ?? 0;
                    const itemTotal = price * item.count;

                    return (
                        <p key={item.id}>
                            {item.product?.title} {item.count > 1 && <span>×{item.count}</span>} <span>${itemTotal}</span>
                        </p>
                    );
                })}
            </div>
            <div>
                <p>
                    Subtotal <span>${subtotal}</span>
                </p>
                <p>
                    Shipping <span className={styles.free}>{subtotal > 500 ? "FREE" : `$${deliveryPrice}`}</span>
                </p>
            </div>
        </div>
    );
}