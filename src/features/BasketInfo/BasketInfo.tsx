"use client"

import SectionPart from "@/shared/ui/SectionPart/SectionPart";
import styles from "./BasketInfo.module.scss";
import Section from "@/shared/ui/Section/Section";
import Button from "@/shared/ui/buttons/Button/Button";
import {useState} from "react";
import OrderModal from "@/widgets/OrderModal/OrderModal";
import BasketProductInfo from "@/features/BasketInfo/ui/BasketProductInfo";

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
}

export default function BasketInfo({ basketProduct }: Props) {
    const [isOpen, setIsOpen] = useState(true);

    const subtotal = basketProduct.reduce((sum, item) => {
        const price = item.product?.currentPrice ?? 0;
        return sum + price * item.count;
    }, 0);

    const deliveryPrice = Number((0.05*subtotal).toFixed(2));

    return (
        <>
            <Section>
                <SectionPart>
                    <BasketProductInfo subtotal={subtotal} deliveryPrice={deliveryPrice} basketProduct={basketProduct}/>
                </SectionPart>

                <SectionPart>
                    <div className={styles.totalPart}>
                        <div>
                            <h1>TOTAL</h1>
                            <span>${subtotal > 500 ? subtotal : subtotal + deliveryPrice}</span>
                        </div>
                        <Button onClick={() => {setIsOpen(true)}} isPending={false} value={false ? "ORDER..." : "ORDER"}/>
                        <p className={styles.securedNote}>SSL SECURED · IRONHIVE STORE</p>
                    </div>
                </SectionPart>
            </Section>
            {isOpen && <OrderModal subtotal={subtotal} deliveryPrice={deliveryPrice} basketProduct={basketProduct} setIsOpen={setIsOpen}/>}
        </>
    );
}