import styles from "./ProductGrid.module.scss"
import NetworkError from "@/shared/ui/NetworkError/NetworkError";
import {getProducts} from "@/app/shop/catalog/page";
import ProductGrid from "@/widgets/ProductGrid/ui/ProductGrid";

export default async function ProductGridWrapper() {
    const products = await getProducts();

    if(!products.success || !products?.data || products.data?.length === 0) {
        return (
           <>
               <div className={styles.grid}>
                   NO PRODUCTS
               </div>
               <NetworkError />
           </>
        )
    }

    if(products.data.length === 0) {
        return (
            <>
                <div className={styles.grid}>
                    NO PRODUCTS
                </div>
            </>
        )
    }

    return (
        <ProductGrid products={products.data}/>
    )
}