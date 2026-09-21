import ProductGridWrapper from "@/widgets/ProductGrid/ProductGridWrapper";
import {Suspense} from "react";
import GridLoader from "@/entities/product/ui/loaders/GridLoader/GridLoader";
import {db} from "@/shared/db/db";
import {product} from "@/entities/product/model/schema";
import CatalogSidebarWrapper from "@/widgets/CatalogSidebar/CatalogSidebarWrapper";

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
        <div className="pt-4 flex flex-col md:flex-row gap-4">
            <CatalogSidebarWrapper/>
            <Suspense fallback={<GridLoader/>}>
                <ProductGridWrapper/>
            </Suspense>
        </div>
    )
}