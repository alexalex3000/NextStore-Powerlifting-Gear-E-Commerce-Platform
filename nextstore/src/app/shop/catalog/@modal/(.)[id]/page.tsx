"use client";

import { useRouter } from "next/navigation";
import { useState, useRef, useEffect } from "react";
import StarBlock from "@/app/shop/components/StarBlock/StarBlock";

export default function InterseptorGearPage() {
    const router = useRouter();
    const [selectedSize, setSelectedSize] = useState<string>("");
    const [isSelectOpen, setIsSelectOpen] = useState<boolean>(false);
    const selectRef = useRef<HTMLDivElement>(null);

    const sizes = ["Small (S)", "Medium (M)", "Large (L)", "Extra Large (XL)"];

    const handleClose = () => {
        router.back();
    };

    // Закрытие оверлея только при клике непосредственно по тёмному фону
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
                    <div className="absolute top-4 left-4 z-10 bg-[var(--accent,#d6ff00)] text-black text-xs font-bold px-2 py-1 uppercase tracking-wider font-['Barlow_Condensed']">
                        BESTSELLER
                    </div>
                </div>

                <div className="w-full md:w-1/2 p-6 md:p-8 flex flex-col justify-between">
                    <div>
                        <span className="text-xs uppercase tracking-widest text-[var(--text-dim,#888)] font-semibold block mb-1 font-['Barlow_Condensed']">
                            BELTS
                        </span>

                        <h1 className="text-3xl font-extrabold uppercase tracking-tight text-white mb-3 font-['Barlow_Condensed']">
                            IPF LEVER BELT 13MM
                        </h1>

                        <div className="flex items-center gap-2 mb-6 text-sm">
                            <StarBlock numOfStars={4} />
                            <span className="text-[var(--text-dim,#888)] font-medium">
                                4.8 <span className="text-zinc-600">(234 reviews)</span>
                            </span>
                        </div>

                        <div className="h-[1px] bg-[var(--border,#262626)] w-full mb-6" />

                        <div className="flex items-center gap-3 mb-6">
                            <span className="text-4xl font-extrabold text-[var(--accent,#d6ff00)] font-['Barlow_Condensed'] leading-none">
                                $189
                            </span>
                            <span className="text-lg text-zinc-600 line-through font-['Barlow_Condensed']">
                                $220
                            </span>
                        </div>

                        <div className="flex items-center gap-2 text-xs font-semibold text-[var(--accent,#d6ff00)] mb-8 uppercase tracking-wider font-['Barlow_Condensed']">
                            <span className="inline-block w-1.5 h-1.5 rounded-full bg-[var(--accent,#d6ff00)] animate-pulse" />
                            In Stock
                        </div>

                        {/* Селект в стиле сайдбара */}
                        <div className="mb-6">
                            <label className="block text-xs uppercase tracking-wider text-[var(--text-dim,#888)] font-bold mb-2 font-['Barlow_Condensed']">
                                SIZE
                            </label>

                            <div className="relative font-['Barlow_Condensed'] select-none" ref={selectRef}>
                                <div
                                    className={`flex justify-between items-center p-3.5 border cursor-pointer transition-all duration-200 font-semibold text-sm uppercase tracking-wider ${
                                        isSelectOpen
                                            ? "border-[var(--text-dim,#888)] text-white bg-[var(--card-2,#181818)]"
                                            : "border-[var(--border,#262626)] text-[var(--text-dim,#888)] hover:border-[var(--text-dim,#888)] hover:text-white hover:bg-[var(--card-2,#181818)] bg-transparent"
                                    }`}
                                    onClick={() => setIsSelectOpen((prev) => !prev)}
                                >
                                    <span>{selectedSize || "Select a size"}</span>
                                    <span
                                        className={`text-[9px] text-[var(--text-dim,#888)] transition-transform duration-200 ${
                                            isSelectOpen ? "rotate-180 text-[var(--accent,#d6ff00)]" : ""
                                        }`}
                                    >
                                        ▼
                                    </span>
                                </div>

                                {isSelectOpen && (
                                    <div className="absolute top-[calc(100%-1px)] left-0 w-full bg-[var(--card,#121212)] border border-[var(--border,#262626)] z-50 flex flex-col shadow-2xl max-h-48 overflow-y-auto">
                                        {sizes.map((size) => {
                                            const isSelected = size === selectedSize;
                                            return (
                                                <div
                                                    key={size}
                                                    className={`p-3.5 border-b border-[var(--border,#262626)] last:border-b-0 cursor-pointer font-semibold text-sm uppercase tracking-wider transition-colors duration-200 ${
                                                        isSelected
                                                            ? "bg-[var(--accent,#d6ff00)] text-black hover:bg-[var(--accent,#d6ff00)] hover:text-black"
                                                            : "text-[var(--text-dim,#888)] hover:bg-[var(--card-2,#181818)] hover:text-[var(--accent,#d6ff00)]"
                                                    }`}
                                                    onClick={() => {
                                                        setSelectedSize(size);
                                                        setIsSelectOpen(false);
                                                    }}
                                                >
                                                    {size}
                                                </div>
                                            );
                                        })}
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>

                    <button
                        className={`w-full py-3.5 px-6 font-extrabold text-sm font-['Barlow_Condensed'] uppercase tracking-wider transition-all flex items-center justify-center gap-2 border ${
                            selectedSize
                                ? "bg-[var(--accent,#d6ff00)] text-black border-[var(--accent,#d6ff00)] hover:bg-[#c4ea00] cursor-pointer"
                                : "bg-[var(--card-2,#181818)] text-zinc-500 border-[#282828] cursor-not-allowed"
                        }`}
                    >
                        <svg
                            className="w-4 h-4"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2.5"
                            viewBox="0 0 24 24"
                        >
                            <circle cx="9" cy="21" r="1.5"></circle>
                            <circle cx="20" cy="21" r="1.5"></circle>
                            <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>
                        </svg>
                        {selectedSize ? "Add to basket" : "Select a size"}
                    </button>
                </div>
            </div>
        </div>
    );
}