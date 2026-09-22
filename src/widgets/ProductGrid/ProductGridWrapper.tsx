import styles from "./ProductGrid.module.scss"
import NetworkError from "@/shared/ui/NetworkError/NetworkError";
import {getProducts} from "@/app/shop/catalog/page";
import ProductGrid from "@/widgets/ProductGrid/ui/ProductGrid";
import NoProducts from "@/shared/ui/NoProducts/NoProducts";

export default async function ProductGridWrapper() {
    const products = await getProducts();

    if (!products.success || !products?.data) {
        return (
            <>
                <div className={styles.grid}>
                    <NoProducts position={"top"}/>
                </div>
                <NetworkError/>
            </>
        )
    }

    if (products.data?.length === 0) {
        return (
            <NoProducts position={"top"}/>
        )
    }

    return (
        <ProductGrid products={products.data}/>
    )
}