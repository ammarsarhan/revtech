export default interface ProductOption {
    name: string,
    label: string,
    attributes: {
        value: string,
        addOnPrice: number
    }[]
}