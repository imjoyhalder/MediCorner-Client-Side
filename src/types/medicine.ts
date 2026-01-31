
export interface Category {
    id: string
    name: string
    slug: string
}

export interface SellerInfo {
    price: number
    expiryDate: string
    stockQuantity: number
}

export interface Medicine {
    id: string
    name: string
    brandName: string
    genericName: string
    manufacturer: string
    description: string | null
    isOtc: boolean
    thumbnail: string | null
    categoryId: string
    category: Category
    sellers: SellerInfo[]
    reviews: unknown[]
}
