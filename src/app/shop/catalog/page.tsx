import CatalogSidebar from "@/widgets/CatalogSidebar/CatalogSidebar";
import ProductGrid from "@/widgets/ProductGrid/ProductGrid";
import {Suspense} from "react";
import GridLoader from "@/entities/product/ui/loaders/GridLoader/GridLoader";
import {db} from "@/shared/db/db";
import {product} from "@/entities/product/model/schema";

export async function getProducts() {
    try {
        await new Promise(resolve => setTimeout(resolve, 1000));
        const data = await db
            .select()
            .from(product)

        return {success: true, data: data};
    } catch (e) {
        return {success: false};
    }
}

export default function CatalogPage(){
    return (
        <div className="pt-4 flex gap-8 flex-col md:flex-row">
            <CatalogSidebar/>
            <Suspense fallback={<GridLoader/>}>
                <ProductGrid/>
            </Suspense>
        </div>
    )
}