"use client"

import Image from "next/image";
import styles from "@/features/UserProfile/UserProfile.module.scss";
import NoLogo from "@/entities/user/ui/NoLogo/NoLogo";
import {UserData} from "@/entities/user/model/types";
import {ChangeEvent, useState, useTransition} from "react";
import {Plus} from "lucide-react";
import {logoDrop} from "@/entities/user/api/addLogo.action";

interface Props{
    userData: UserData;
}

export default function UserLogo({userData}: Props) {
    const [isPending, startTranition] = useTransition()

    const [currentURL, setCurrentURL] = useState<string | null>(null);

    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0]

        if(!file) return

        const objectURL = URL.createObjectURL(file)
        setCurrentURL(objectURL)

        startTranition(async () => {
            try{
                await logoDrop({file})
            } catch (e){
                setCurrentURL(null)
            }
        })
    }

    const currentLogo = currentURL || userData.user.logoUrl

    return (
        <div className={styles.avatarWrapper}>
            {currentLogo ? (
                <Image
                    src={currentLogo}
                    alt={`${userData.user.firstName} ${userData.user.lastName}`}
                    width={96}
                    height={96}
                    className={styles.avatarImage}
                    unoptimized={Boolean(currentURL)}
                />
            ) : (
                <NoLogo
                    size="large"
                    title={`${userData.user.firstName} ${userData.user.lastName}`}
                />
            )}

            <div className={`${styles.overlay} ${isPending ? styles.loading : ""}`}>
                <Plus className={styles.plusIcon} />
            </div>

            <input
                type="file"
                accept="image/*"
                disabled={isPending}
                onChange={handleChange}
                className={styles.fileInput}
            />
        </div>
    )
}