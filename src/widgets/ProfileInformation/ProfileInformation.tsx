"use client";

import styles from "./ProfileInformation.module.scss";
import {useActionState, useState} from "react";
import Section from "@/shared/ui/Section/Section";
import SectionPart from "@/shared/ui/SectionPart/SectionPart";

interface Props {
    edit: React.ReactNode;
    info: React.ReactNode;
    isActive: boolean;
    setIsActive: (active: boolean) => void;
    isPending: boolean;
}

export default function ProfileInformation({ edit, info, isActive, setIsActive, isPending }: Props) {

    const handleEditClick = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        e.stopPropagation();
        setIsActive(true);
    };

    return (
        <Section>
            <div>
                <SectionPart>
                    <div className={styles.header}>
                        <h1 className={styles.title}>PROFILE INFORMATION</h1>
                        {
                            isActive ? (
                                <button
                                    type={"submit"}
                                    className={`${styles.editBtn}`}
                                    disabled={isPending}
                                >
                                    <svg
                                        width="14"
                                        height="14"
                                        viewBox="0 0 24 24"
                                        fill="none"
                                        stroke="currentColor"
                                        strokeWidth="2"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                    >
                                        <path d="M17 3a2.828 2.828 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5L17 3z"/>
                                    </svg>
                                    <span>{"SAVE"}</span>
                                </button>
                            ) : (
                                <button
                                    className={`${styles.editBtn}`}
                                    type="button"
                                    onClick={handleEditClick}
                                >
                                    <svg
                                        width="14"
                                        height="14"
                                        viewBox="0 0 24 24"
                                        fill="none"
                                        stroke="currentColor"
                                        strokeWidth="2"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                    >
                                        <path d="M17 3a2.828 2.828 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5L17 3z"/>
                                    </svg>
                                    <span>{"EDIT"}</span>
                                </button>
                            )
                        }
                    </div>
                </SectionPart>

                <SectionPart>
                    <>
                        {isActive ? edit : info}
                    </>
                </SectionPart>
            </div>
        </Section>
    );
}