import FilterBlock from "@/shared/ui/FIlterBlock/FilterBlock";
import CatalogSidebar from "@/widgets/CatalogSidebar/CatalogSidebar";
import ProductCard from "@/entities/product/ui/ProductCard/ProductCard";
import ProductGrid from "@/widgets/ProductGrid/ProductGrid";

export default function CatalogPage(){
    return (
        <div className="pt-4 flex gap-8 flex-col md:flex-row">
            <CatalogSidebar/>
            <ProductGrid/>
        </div>
    )
}