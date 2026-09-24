import { Suspense } from "react";
import styles from "./styles.module.scss";
import AddToBasketWid from "@/widgets/AddToBasketWid/AddToBasketWid";
import Feedback from "@/widgets/Feedback/Feedback";
import { db } from "@/shared/db/db";
import ErrorToFetch from "@/entities/product/ui/ErrorToFetch/ErrorToFetch";
import { product as productSchema } from "@/entities/product/model/schema";
import { cacheLife, cacheTag } from "next/cache";
import AddBasketWidSkeleton from "@/shared/ui/loaders/AddBasketWidSkeleton/AddBasketWidSkeleton";

interface Props {
    params: Promise<{ id: string }>;
}

export async function generateStaticParams() {
    "use cache";
    cacheLife("days");

    const res = await db.select({ id: productSchema.id }).from(productSchema);

    return res.map((item) => ({
        id: String(item.id),
    }));
}

async function fetchProduct(id: string) {
    "use cache";
    cacheTag(`product-${id}`);
    cacheLife("minutes");

    try {
        const item = await db.query.product.findFirst({
            where: (p, { eq }) => eq(p.id, id),
            with: {
                feedbacks: {
                    with: {
                        user: true,
                    },
                },
            },
        });

        if (!item) {
            return { success: false, error: "Product not found." };
        }

        return { success: true, data: item };
    } catch {
        return { success: false, error: "Product not found." };
    }
}

async function ProductDetails({ params }: Props) {
    const { id } = await params;
    const productData = await fetchProduct(id);

    if (!productData.success || !productData.data) {
        return <ErrorToFetch />;
    }

    return (
        <div className={styles.wrapper}>
            <AddToBasketWid product={productData.data} />
            <Feedback id={id} feedbacks={productData.data.feedbacks} />
        </div>
    );
}

export default function ProductsPage({ params }: Props) {
    return (
        <Suspense fallback={<AddBasketWidSkeleton/>}>
            <ProductDetails params={params} />
        </Suspense>
    );
}