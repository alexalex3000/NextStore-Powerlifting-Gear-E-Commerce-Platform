"use client";

import {useRouter} from "next/navigation";
import {useState, useRef, useEffect} from "react";
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
            onClick={handleClose}
        >
            <div
                className="relative flex flex-col md:flex-row w-full max-w-4xl bg-[#0a0a0a] border border-[#222] text-white shadow-2xl"
                onClick={(e) => e.stopPropagation()}
            >
                <button
                    onClick={handleClose}
                    className="absolute top-4 right-4 z-20 text-zinc-400 hover:text-white transition-colors text-xl p-2 font-bold cursor-pointer"
                    aria-label="Close modal"
                >
                    ✕
                </button>

                <div className="w-full md:w-1/2 aspect-square relative bg-[#141414] overflow-hidden">
                    <div
                        className="absolute top-4 left-4 z-10 bg-[#d6ff00] text-black text-xs font-bold px-2 py-1 uppercase tracking-wider">
                        BESTSELLER
                    </div>
                </div>

                <div className="w-full md:w-1/2 p-6 md:p-8 flex flex-col justify-between">
                    <div>
            <span className="text-xs uppercase tracking-widest text-zinc-500 font-semibold block mb-1">
              BELTS
            </span>

                        <h1 className="text-3xl font-extrabold uppercase tracking-tight text-white mb-3 font-['Barlow_Condensed']">
                            IPF LEVER BELT 13MM
                        </h1>

                        <div className="flex items-center gap-2 mb-6 text-sm">
                            <StarBlock numOfStars={4}/>
                            <span className="text-zinc-400 font-medium">
                4.8 <span className="text-zinc-600">(234 reviews)</span>
              </span>
                        </div>

                        <div className="h-[1px] bg-[#1a1a1a] w-full mb-6"/>

                        <div className="flex items-center gap-3 mb-6">
              <span className="text-4xl font-extrabold text-[#d6ff00] font-['Barlow_Condensed'] leading-none">
                $189
              </span>
                            <span className="text-lg text-zinc-600 line-through font-['Barlow_Condensed']">
                $220
              </span>
                        </div>

                        <div
                            className="flex items-center gap-2 text-xs font-semibold text-[#d6ff00] mb-8 uppercase tracking-wider">
                            <span className="inline-block w-1.5 h-1.5 rounded-full bg-[#d6ff00] animate-pulse"/>
                            In Stock
                        </div>

                        <div className="mb-6">
                            <label className="block text-xs uppercase tracking-wider text-zinc-400 font-bold mb-2">
                                SIZE
                            </label>

                            <div className="relative font-['Barlow_Condensed'] select-none" ref={selectRef}>
                                <div
                                    className={`flex justify-between items-center p-3 border cursor-pointer transition-all duration-200 ${
                                        isSelectOpen
                                            ? "border-zinc-400 text-white bg-[#181818]"
                                            : "border-[#262626] text-zinc-400 hover:border-zinc-400 hover:text-white bg-transparent"
                                    }`}
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        setIsSelectOpen((prev) => !prev);
                                    }}
                                >
                  <span className="text-base font-normal tracking-wide">
                    {selectedSize || "Select a size"}
                  </span>
                                    <span
                                        className={`text-[9px] text-zinc-400 transition-transform duration-200 ${
                                            isSelectOpen ? "text-[#d6ff00]" : ""
                                        }`}
                                    >
                    ▼
                  </span>
                                </div>

                                {isSelectOpen && (
                                    <div
                                        className="absolute top-[calc(100%-1px)] left-0 w-full bg-[#121212] border border-[#262626] z-50 flex flex-col shadow-2xl max-h-48 overflow-y-auto">
                                        {sizes.map((size) => {
                                            const isSelected = size === selectedSize;
                                            return (
                                                <div
                                                    key={size}
                                                    className={`p-3 border-b border-[#262626] last:border-b-0 cursor-pointer font-semibold text-base tracking-wide transition-colors duration-200 ${
                                                        isSelected
                                                            ? "bg-[#d6ff00] text-black hover:bg-[#d6ff00] hover:text-black"
                                                            : "text-zinc-400 hover:bg-[#181818] hover:text-[#d6ff00]"
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
                        className={`w-full py-3.5 px-6 font-bold text-base font-['Barlow_Condensed'] tracking-tighter transition-all flex items-center justify-center gap-2 border ${
                            selectedSize
                                ? "bg-[#d6ff00] text-black border-[#d6ff00] hover:bg-[#c4ea00] cursor-pointer"
                                : "bg-[#181818] text-zinc-500 border-[#282828] cursor-not-allowed"
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