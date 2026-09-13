import SectionPart from "@/shared/ui/SectionPart/SectionPart";
import SubmitButton from "@/shared/ui/buttons/SubmitButton/SubmitButton";
import styles from "./BasketInfo.module.scss";
import Section from "@/shared/ui/Section/Section";

export default function BasketInfo() {
    return (
        <Section>
            <SectionPart>
                <div className={styles.summaryPart}>
                    <h2>Order Summary</h2>
                    <div>
                        <p>
                            IPF Lever Belt 13mm <span>$189</span>
                        </p>
                        <p>
                            Chalk Block 2lb <span>×2</span> <span>$24</span>
                        </p>
                        <p>
                            Figure-8 Straps Pro <span>$34</span>
                        </p>
                    </div>
                    <div>
                        <p>
                            Subtotal <span>$247</span>
                        </p>
                        <p>
                            Shipping <span className={styles.free}>FREE</span>
                        </p>
                    </div>
                </div>
            </SectionPart>

            <SectionPart>
                <div className={styles.totalPart}>
                    <div>
                        <h1>TOTAL</h1>
                        <span>$247</span>
                    </div>
                    <SubmitButton goal={"submit"} isPending={false} />
                    <p className={styles.securedNote}>SSL SECURED · IRONHIVE STORE</p>
                </div>
            </SectionPart>
        </Section>
    );
}