"use client";

import Input from "@/shared/ui/Input/Input";
import { type BasketInfoType } from "@/features/BasketInfo/BasketInfo";
import BasketProductInfo from "@/features/BasketInfo/ui/BasketProductInfo";
import SectionPart from "@/shared/ui/SectionPart/SectionPart";
import styles from "./OrderModal.module.scss";
import Button from "@/shared/ui/buttons/Button/Button";
import Section from "@/shared/ui/Section/Section";
import { useRouter } from "next/navigation";
import { X } from "lucide-react";

interface Props {
    basketProduct: BasketInfoType[];
    subtotal: number;
    deliveryPrice: number;
    setIsOpen: (isOpen: boolean) => void;
}

export default function OrderModal({ basketProduct, deliveryPrice, subtotal,setIsOpen }: Props) {
    const router = useRouter();

    return (
        <div className={styles.overlay}>
            <div className={styles.modal}>
                <button
                    type="button"
                    aria-label="Close modal"
                    onClick={() => {setIsOpen(false)}}
                    className={styles.closeButton}
                >
                    <X size={18} />
                </button>

                <div className={styles.leftColumn}>
                    <header className={styles.header}>
                        SHIPPING ADDRESS
                    </header>
                    <form className={styles.form}>
                        <Input type="text" label="Country" name="country" />
                        <Input type="text" label="City" name="city" />
                        <Input type="text" label="Street address" name="street" />
                    </form>
                </div>
                <Section black>
                    <SectionPart black>
                        <div className={styles.summaryDivider}>
                            <BasketProductInfo
                                subtotal={subtotal}
                                deliveryPrice={deliveryPrice}
                                basketProduct={basketProduct}
                            />
                        </div>
                    </SectionPart>
                    <SectionPart black>
                        <div className={`${styles.totalContainer} ${styles.totalPart}`}>
                            <div className={styles.totalRow}>
                                <h1>TOTAL</h1>
                                <span>${subtotal > 500 ? subtotal : subtotal + deliveryPrice}</span>
                            </div>
                            <div className={styles.orderButtonWrapper}>
                                <Button isPending={false} value={false ? "ORDER..." : "ORDER"} />
                            </div>
                            <p className={styles.securedNote}>SSL SECURED · IRONHIVE STORE</p>
                        </div>
                    </SectionPart>
                </Section>
            </div>
        </div>
    );
}