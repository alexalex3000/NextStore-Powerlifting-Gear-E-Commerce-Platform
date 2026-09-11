import styles from "./ProductGrid.module.scss"
import NetworkError from "@/shared/ui/NetworkError/NetworkError";
import ProductCard from "@/entities/product/ui/ProductCard/ProductCard";
import {Product} from "@/entities/product/model/types";
import {getProducts} from "@/app/shop/catalog/page";

export default async function ProductGrid() {
    const products = await getProducts();

    if(!products.success || !products?.data) {
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
            <div className={styles.grid}>
                NO PRODUCTS
            </div>
        )
    }

    return (
        <>
            <div className={styles.grid}>
                {
                    products.data.map((product: Product, index:number) => (
                        <ProductCard key={index} product={product} />
                    ))
                }
            </div>
        </>
    )
}