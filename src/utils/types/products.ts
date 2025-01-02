import ProductOption from "./option";

export type ProductDisplayType = {
    id: string;
    name: string;
    vendor: string;
    shortDescription: string;
    longDescription: string;
    category: string;
    imageSource: string;
    price: number;
    feature: string;
    options: ProductOption[];
    variantCount: number;
    inWishlist: boolean;
}