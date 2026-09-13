"use client"

import styles from "./PaymentCard.module.scss";

interface Props{
    type: "VISA" | "MASTERCARD"
}

export default function PaymentCard({type}:Props) {
    return (
        <div className={styles.card}>
            <div>
                <div>{type}</div>
                <div>
                    {
                        type == "MASTERCARD" ? (
                            <>
                                <p>•••• •••• •••• 4242</p>
                                <p>Expires 09/28</p>
                            </>
                        ) : (
                            <>
                                <p>•••• •••• •••• 1232</p>
                                <p>Expires 01/12</p>
                            </>
                        )
                    }
                </div>
            </div>
            <div>
                <span>DEFAULT</span>
                <button type="button">Remove</button>
            </div>
        </div>
    );
}