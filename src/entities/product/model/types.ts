export interface Product {
    id?: string;
    type: string;
    title: string;
    currentPrice: number;
    oldPrice:  number | null;
    count: number;
    assessment: number;
    numOfFeedbacks: number;
    imgUrl: string;
}