import { Suspense } from "react";
import ModalWindow from "@/widgets/ModalWindow/ModalWindow";
import { getProducts } from "@/app/shop/catalog/page";
import NetworkError from "@/shared/ui/NetworkError/NetworkError";
import { db } from "@/shared/db/db";
import { product as productSchema } from "@/entities/product/model/schema";
import ModalSkeleton from "@/shared/ui/loaders/ModalSkeleton/ModalSkeleton";

interface Props {
    params: Promise<{ id: string }>;
}

export async function generateStaticParams() {
    "use cache";
    const res = await db.select({ id: productSchema.id }).from(productSchema);
    return res.map((item) => ({ id: String(item.id) }));
}

async function InterceptorContent({ params }: Props) {
    const { id } = await params;
    const productObj = await getProducts();
    const product = productObj?.data?.find((prod) => String(prod.id) === String(id));

    if (!productObj || !productObj.success || !productObj.data || !product) {
        return (
            <>
                Error 404
                <NetworkError />
            </>
        );
    }

    return <ModalWindow product={product} />;
}

export default function InterseptorGearPage({ params }: Props) {
    return (
        <Suspense fallback={<ModalSkeleton/>}>
            <InterceptorContent params={params} />
        </Suspense>
    );
}