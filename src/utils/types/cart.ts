import { ProductDisplayType } from "./products"

export type CartItemType = {
    product: ProductDisplayType,
    productOptions: number[],
    price: number,
    quantity: number
}