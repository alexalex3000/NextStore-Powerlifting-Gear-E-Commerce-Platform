"use client";

import { useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Stars from "@/shared/ui/Stars/Stars";
import Bestseller from "@/entities/product/ui/demandType/Bestseller/Bestseller";
import SelectSize from "@/entities/product/ui/SelectSize/SelectSize";
import { Product } from "@/entities/product/model/types";
import styles from "./ModalWindow.module.scss";

interface ModalWindowProps {
    product: Product;
}

export default function ModalWindow({ product }: ModalWindowProps) {
    const router = useRouter();

    const handleClose = useCallback(() => {
        router.back();
    }, [router]);

    const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
        if (e.target === e.currentTarget) {
            handleClose();
        }
    };

    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === "Escape") {
                handleClose();
            }
        };

        document.addEventListener("keydown", handleKeyDown);
        const originalOverflow = document.body.style.overflow;
        document.body.style.overflow = "hidden";

        return () => {
            document.removeEventListener("keydown", handleKeyDown);
            document.body.style.overflow = originalOverflow;
        };
    }, [handleClose]);

    const isAvailable = product.count > 0;

    return (
        <div
            className={styles.backdrop}
            onClick={handleBackdropClick}
            role="dialog"
            aria-modal="true"
            aria-labelledby="modal-product-title"
        >
            <div className={styles.modal}>
                <button
                    onClick={handleClose}
                    className={styles.closeButton}
                    aria-label="Close modal"
                >
                    ✕
                </button>

                <div className={styles.imageWrapper}>
                    <Image
                        src={product.imgUrl}
                        alt={product.title}
                        fill
                        sizes="(max-width: 768px) 100vw, 450px"
                        priority
                    />
                    <Bestseller />
                </div>

                <div className={styles.contentWrapper}>
                    <div className={styles.headerInfo}>
                        <span className={styles.productType}>{product.type}</span>

                        <h1 id="modal-product-title" className={styles.productTitle}>
                            {product.title}
                        </h1>

                        <div className={styles.ratingRow}>
                            <Stars count={product.assessment} />
                            <span className={styles.feedbacksCount}>
                ({product.numOfFeedbacks})
              </span>
                        </div>

                        <div className={styles.divider} />
                    </div>

                    <div className={styles.bottomSection}>
                        <div className={styles.pricingBlock}>
                            <div className={styles.priceRow}>
                <span className={styles.currentPrice}>
                  ${product.currentPrice}
                </span>
                                {product.oldPrice && (
                                    <span className={styles.oldPrice}>
                    ${product.oldPrice}
                  </span>
                                )}
                            </div>

                            <div
                                className={`${styles.stockStatus} ${
                                    !isAvailable ? styles.outOfStock : ""
                                }`}
                            >
                                <span className={styles.pulseDot} />
                                {isAvailable ? "In Stock" : "Not in Stock"}
                            </div>
                        </div>

                        <div className={styles.controlsBlock}>
                            <SelectSize id={product.id!} />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}