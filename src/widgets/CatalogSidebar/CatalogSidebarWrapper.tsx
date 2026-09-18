import CatalogSidebar from "@/widgets/CatalogSidebar/ui/CatalogSidebar";
import {db} from "@/shared/db/db";
import {product} from "@/entities/product/model/schema";
import {count, max} from "drizzle-orm";

async function getParams() {
    try {
        const types = await db
            .select({
                type: product.type,
                num: count(product.id),
            })
            .from(product)
            .groupBy(product.type);

        const [priceResult] = await db
            .select({ maxPrice: max(product.currentPrice) })
            .from(product);

        const maxPrice = priceResult?.maxPrice ? Number(priceResult.maxPrice) : 1000;

        return { types, maxPrice };
    } catch (e) {
        console.error(e);
        return null;
    }
}

export default async function CatalogSidebarWrapper(){
    const filterData = await getParams();

    return (
        <CatalogSidebar filterData={filterData}/>
    )
}