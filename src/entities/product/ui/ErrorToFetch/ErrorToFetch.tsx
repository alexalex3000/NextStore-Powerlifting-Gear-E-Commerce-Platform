"use client"

import {AlertOctagon, AlertTriangle, ArrowLeft, RefreshCw} from "lucide-react";
import Link from "next/link";
import styles from "./ErrorToFetch.module.scss"

export default function ErrorToFetch(){
    return (
        <div className={styles.notFoundWrapper}>
            <div className={styles.notFoundCard}>
                <div className={styles.iconBadge}>
                    <AlertTriangle size={48} />
                </div>

                <h1 className={styles.notFoundTitle}>PRODUCT NOT FOUND</h1>

                <p className={styles.notFoundDescription}>
                    The equipment you are looking for might have been removed, renamed, or is temporarily unavailable in our warehouse.
                </p>

                <div className={styles.actions}>
                    <Link href="/shop/catalog" className={styles.primaryBtn}>
                        <ArrowLeft size={18} />
                        BACK TO CATALOG
                    </Link>
                    <button
                        onClick={() => window.location.reload()}
                        className={styles.secondaryBtn}
                    >
                        <RefreshCw size={18} />
                        RETRY
                    </button>
                </div>
            </div>
        </div>
    );
}