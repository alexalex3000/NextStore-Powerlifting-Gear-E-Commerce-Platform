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
import {useActionState, useEffect} from "react";
import {orderDrop} from "@/entities/order/api/order.action";
import FormError from "@/shared/ui/FormError/FormError";

interface Props {
    basketProduct: BasketInfoType[];
    subtotal: number;
    deliveryPrice: number;
    setIsOpen: (isOpen: boolean) => void;
    userPhone: string | null;
}

interface StateType {
    success: boolean;
    error?: {
        server?: string;
        country?: string;
        city?: string;
        address?: string;
    }
}

export default function OrderModal({ userPhone, basketProduct, deliveryPrice, subtotal,setIsOpen }: Props) {
    const [state, formAction, isPending] = useActionState<StateType, FormData>(async (previousState, formData) => {
        const shippingCountry = formData.get("country") as string
        const shippingCity = formData.get("city") as string
        const shippingAddress = formData.get("address") as string
        const phoneNumber = formData.get("phone") as string

        let data;

        if(phoneNumber){
            data = await orderDrop({
                shippingCountry,
                shippingAddress,
                shippingCity,
                phoneNumber,
            })
        }
        else{
            data = await orderDrop({
                shippingCountry,
                shippingAddress,
                shippingCity,
            })
        }

        console.log(data)

        if(data.serverError){
            return {
                success: false,
                error: {
                    server: data.serverError,
                }
            }
        }

        if(data.validationErrors){
            return {
                success: false,
                error: {
                    country: data.validationErrors?.shippingCountry?._errors?.[0],
                    city: data.validationErrors?.shippingCity?._errors?.[0],
                    address: data.validationErrors?.shippingAddress?._errors?.[0],
                }
            }
        }

        return {success: true}
    }, {success: false});

    useEffect(() => {
        if(state.success === true){
            setIsOpen(false);
        }
    }, [state])

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
                    <form className={styles.form} id={"order_form"} action={formAction}>
                        {state?.error?.server && <FormError error={state?.error?.server} />}
                        {!userPhone && <Input type="text" label="Phone Number" name="phone" />}
                        <Input error={state?.error?.country} type="text" label="Country" name="country" />
                        <Input error={state?.error?.city} type="text" label="City" name="city" />
                        <Input error={state?.error?.address} type="text" label="Street address" name="address" />
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
                                <Button form={"order_form"} isPending={false} value={false ? "ORDER..." : "ORDER"} />
                            </div>
                            <p className={styles.securedNote}>SSL SECURED · IRONHIVE STORE</p>
                        </div>
                    </SectionPart>
                </Section>
            </div>
        </div>
    );
}