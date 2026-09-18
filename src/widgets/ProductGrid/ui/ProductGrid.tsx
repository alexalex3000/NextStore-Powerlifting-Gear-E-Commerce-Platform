"use client"

import styles from "@/widgets/ProductGrid/ProductGrid.module.scss";
import {ProductId} from "@/entities/product/model/types";
import ProductCard from "@/entities/product/ui/ProductCard/ProductCard";
import {useSearchParams} from "next/navigation";

interface Props{
    products: ProductId[];
}

export default function ProductGrid({products}: Props){
    const searchParams = useSearchParams();

    const stars =  searchParams.get("stars")
    const maxPrice =  searchParams.get("max_price")
    const categories =  searchParams.get("category")
    const search =  searchParams.get("search")

    const starNum = stars ? Number(stars) : null;
    const maxPriceNum = maxPrice ? Number(maxPrice) : null;
    const categoryLower = categories ? categories.toLowerCase() : null;
    const searchLower = search ? search.toLowerCase() : null;

    const filteredProducts = products.filter((product: ProductId) => {
        if (starNum !== null) {
            const matchesZero = product.assessment === 0 && starNum === 1;
            const matchesRating = product.assessment >= starNum;
            if (!matchesZero && !matchesRating) return false;
        }

        if (maxPriceNum !== null) {
            if (product.currentPrice > maxPriceNum) return false;
        }

        if (categoryLower !== null) {
            if (product.type.toLowerCase() !== categoryLower) return false;
        }

        if(searchLower != null){
            if (!product.title.toLowerCase().includes(searchLower)) return false;
        }

        return true;
    });

    return (
        <>
            <div className={styles.grid}>
                {
                    filteredProducts.map((product: ProductId, index:number) => (
                        <ProductCard key={index} product={product} />
                    ))
                }
            </div>
        </>
    )
}