import styles from "./styles.module.scss";
import AddToBasketWid from "@/widgets/AddToBasketWid/AddToBasketWid";
import Feedback from "@/widgets/Feedback/Feedback";
import {db} from "@/shared/db/db";
import ErrorToFetch from "@/entities/product/ui/ErrorToFetch/ErrorToFetch";

interface Props{
    params: Promise<{id: string}>
}

async function fetchProduct(id: string) {
    try {
        const item = await db.query.product.findFirst({
            where: (product, {eq}) => eq(product.id, id),
            with: {
                feedbacks: {
                    with: {
                        user: true
                    }
                },
            }
        });

        if (!item) {
            return { success: false, error: "Product not found." };
        }

        return { success: true, data: item };
    } catch {
        return { success: false, error: "Product not found." };
    }
}

export default async function ProductsPage({params}: Props){
    const {id} = await params;

    const product = await fetchProduct(id);

    if (!product.success || !product || !product.data) {
        return (
            <ErrorToFetch/>
        )
    }

    return (
        <div className={styles.wrapper}>
            <AddToBasketWid product={product.data}/>
            <Feedback id={id} feedbacks={product.data.feedbacks}/>
        </div>
    )
}