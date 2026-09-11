"use client"

import Stars from "@/shared/ui/Stars/Stars";
import Select from "@/shared/ui/Select/Select";
import {useEffect, useRef, useState} from "react";
import {useRouter} from "next/navigation";
import {Product} from "@/entities/product/model/types";
import Image from "next/image";
import Bestseller from "@/entities/product/ui/demandType/Bestseller/Bestseller";

export default function ModalWindow({product}: {product: Product}) {
    const router = useRouter();
    const [selectedSize, setSelectedSize] = useState<string>("");
    const [isSelectOpen, setIsSelectOpen] = useState<boolean>(false);
    const selectRef = useRef<HTMLDivElement>(null);

    const sizes = ["XS", "S", "M", "L", "XL", "XXL"];

    const handleClose = () => {
        router.back();
    };

    const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
        if (e.target === e.currentTarget) {
            handleClose();
        }
    };

    useEffect(() => {
        const handleClickOutside = (e: MouseEvent) => {
            if (selectRef.current && !selectRef.current.contains(e.target as Node)) {
                setIsSelectOpen(false);
            }
        };
        window.addEventListener("click", handleClickOutside);
        return () => window.removeEventListener("click", handleClickOutside);
    }, []);

    return (
        <div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-xl p-4 sm:p-6"
            onClick={handleBackdropClick}
        >
            <div className="relative flex flex-col md:flex-row w-full max-w-4xl bg-[#0a0a0a] border border-[var(--border,#262626)] text-white shadow-2xl">
                <button
                    onClick={handleClose}
                    className="absolute top-4 right-4 z-20 text-[var(--text-dim,#888)] hover:text-white transition-colors text-xl p-2 font-bold cursor-pointer"
                    aria-label="Close modal"
                >
                    ✕
                </button>

                <div className="w-full md:w-1/2 aspect-square relative bg-[#141414] overflow-hidden">
                    <Image
                        src={product.imgUrl}
                        alt={product.title}
                        fill
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 600px"
                        style={{ objectFit: 'cover' }}
                    />
                    <Bestseller />
                </div>

                <div className="w-full md:w-1/2 p-6 md:p-8 flex flex-col justify-between">
                    <div>
                        <span className="text-xs uppercase tracking-widest text-[var(--text-dim,#888)] font-semibold block mb-1 font-['Barlow_Condensed']">
                            {product.type}
                        </span>

                        <h1 className="text-3xl font-extrabold uppercase tracking-tight text-white mb-3 font-['Barlow_Condensed']">
                            {product.title}
                        </h1>

                        <div className="flex items-center gap-2 mb-6 text-sm">
                            <Stars count={product.assessment}/>
                            <span className="text-[var(--text-dim,#888)] font-medium">
                                <span className="text-zinc-600">({product.numOfFeedbacks})</span>
                            </span>
                        </div>

                        <div className="h-[1px] bg-[var(--border,#262626)] w-full mb-6" />

                        <div className="flex items-center gap-3 mb-6">
                            <span className="text-4xl font-extrabold text-[var(--accent,#d6ff00)] font-['Barlow_Condensed'] leading-none">
                                ${product.currentPrice}
                            </span>
                            <span className="text-lg text-zinc-600 line-through font-['Barlow_Condensed']">
                                {product.oldPrice ? `${product.oldPrice}` : ""}
                            </span>
                        </div>

                        <div className="flex items-center gap-2 text-xs font-semibold text-[var(--accent,#d6ff00)] mb-8 uppercase tracking-wider font-['Barlow_Condensed']">
                            <span className="inline-block w-1.5 h-1.5 rounded-full bg-[var(--accent,#d6ff00)] animate-pulse" />
                            {product.count > 0 ? "In Stock" : "Not in Stock"}
                        </div>

                        <div className="mb-6">
                            <label className="block text-xs uppercase tracking-wider text-[var(--text-dim,#888)] font-bold mb-2 font-['Barlow_Condensed']">
                                SIZE
                            </label>

                            <Select active={selectedSize} setActive={setSelectedSize} options={sizes} placeholder={"SELECT SIZE"}/>
                        </div>
                    </div>

                    <button
                        className={`w-full py-3.5 px-6 font-extrabold text-sm font-['Barlow_Condensed'] uppercase tracking-wider transition-all flex items-center justify-center gap-2 border ${
                            selectedSize
                                ? "bg-[var(--accent,#d6ff00)] text-black border-[var(--accent,#d6ff00)] hover:bg-[#c4ea00] cursor-pointer"
                                : "bg-[var(--card-2,#181818)] text-zinc-500 border-[#282828] cursor-not-allowed"
                        }`}
                    >
                        {selectedSize ? "Add to basket" : "Select a size"}
                    </button>
                </div>
            </div>
        </div>
    )
}