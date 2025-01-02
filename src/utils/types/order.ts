import { CartItemType } from "./cart"

export interface OrderType {
    userId: string
    items: CartItemType[]
    total: number
    paid: boolean
    status: "Pending" | "Processing" | "Shipped" | "Delivered" | "Cancelled"
}