import SectionPart from "@/shared/ui/SectionPart/SectionPart";
import SubmitButton from "@/shared/ui/buttons/SubmitButton/SubmitButton";
import styles from "./BasketInfo.module.scss";
import Section from "@/shared/ui/Section/Section";

export interface BasketItemProduct {
    id: string;
    type: string;
    title: string;
    currentPrice: number;
    oldPrice: number | null;
    count: number;
    assessment: number;
    numOfFeedbacks: number;
    imgUrl: string;
}

export interface BasketInfo {
    id: string;
    count: number;
    productId: string | null;
    basketId: string;
    product: BasketItemProduct | null;
}

interface Props {
    basketProduct: BasketInfo[];
}

export default function BasketInfo({ basketProduct }: Props) {
    const subtotal = basketProduct.reduce((sum, item) => {
        const price = item.product?.currentPrice ?? 0;
        return sum + price * item.count;
    }, 0);

    return (
        <Section>
            <SectionPart>
                <div className={styles.summaryPart}>
                    <h2>Order Summary</h2>
                    <div>
                        {basketProduct.map((item) => {
                            const price = item.product?.currentPrice ?? 0;
                            const itemTotal = price * item.count;

                            return (
                                <p key={item.id}>
                                    {item.product?.title} {item.count > 1 && <span>×{item.count}</span>} <span>${itemTotal}</span>
                                </p>
                            );
                        })}
                    </div>
                    <div>
                        <p>
                            Subtotal <span>${subtotal}</span>
                        </p>
                        <p>
                            Shipping <span className={styles.free}>{subtotal > 500 ? "FREE" : 0.05*subtotal}</span>
                        </p>
                    </div>
                </div>
            </SectionPart>

            <SectionPart>
                <div className={styles.totalPart}>
                    <div>
                        <h1>TOTAL</h1>
                        <span>${subtotal}</span>
                    </div>
                    <SubmitButton goal={"submit"} isPending={false} />
                    <p className={styles.securedNote}>SSL SECURED · IRONHIVE STORE</p>
                </div>
            </SectionPart>
        </Section>
    );
}