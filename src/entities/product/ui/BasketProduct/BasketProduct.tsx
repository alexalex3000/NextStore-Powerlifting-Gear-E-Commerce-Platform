"use client";

import { useTransition } from "react";
import SectionPart from "@/shared/ui/SectionPart/SectionPart";
import styles from "./BasketProduct.module.scss";
import { BasketInfo } from "@/features/BasketList/BasketList";
import Image from "next/image";
import { deleteFromBasketDrop } from "@/entities/product/api/deleteFromBasket.action";
import { changeCountDrop } from "@/entities/product/api/changeCount.action";

interface Props {
    basketInfo: BasketInfo;
}

export default function BasketProduct({ basketInfo }: Props) {
    const [isPending, startTransition] = useTransition();

    if (!basketInfo || !basketInfo.product) {
        return null;
    }
    const handleDelete = () => {
        startTransition(async () => {
            await deleteFromBasketDrop({ id: basketInfo.id });
        });
    };

    const handleCountChange = (type: "inc" | "dec") => {
        startTransition(async () => {
            await changeCountDrop({ id: basketInfo.id, type });
        });
    };

    return (
        <SectionPart>
            <div className={`${styles.wrapper} ${isPending ? styles.pending : ""}`}>
                <div>
                    <div>
                        <Image
                            src={basketInfo.product.imgUrl}
                            alt={basketInfo.product.title}
                            fill
                            sizes="90px"
                            style={{ objectFit: "cover" }}
                        />
                    </div>
                    <div>
                        <p>{basketInfo.product.type}</p>
                        <h2>{basketInfo.product.title}</h2>
                        <p>
                            SIZE: <span>{basketInfo.sizes || "XS"}</span>
                        </p>
                        <div>
                            <button
                                type="button"
                                disabled={isPending}
                                onClick={() => handleCountChange("dec")}
                            >
                                −
                            </button>
                            <div>{basketInfo.count}</div>
                            <button
                                type="button"
                                disabled={isPending}
                                onClick={() => handleCountChange("inc")}
                            >
                                +
                            </button>
                        </div>
                    </div>
                </div>
                <div>
                    <button
                        type="button"
                        aria-label="Delete item"
                        disabled={isPending}
                        onClick={handleDelete}
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth="1.5"
                            stroke="currentColor"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
                            />
                        </svg>
                    </button>
                    <h2>${basketInfo.product.currentPrice * basketInfo.count}</h2>
                </div>
            </div>
        </SectionPart>
    );
}