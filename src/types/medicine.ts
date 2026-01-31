
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

// export interface Medicine {
//   id: string
//   name: string
//   genericName: string
//   manufacturer: string
//   isOtc: boolean
//   thumbnail: string | null
//   category: {
//     id: string
//     name: string
//     slug: string
//   }
//   sellers: {
//     price: number
//     stockQuantity: number
//   }[]
// }

export interface Medicine {
    id: string
    name: string
    genericName: string
    manufacturer: string
    isOtc: boolean
    thumbnail: string | null
    category: {
        id: string
        name: string
        slug: string
    }
    sellers: {
        price: number
        stockQuantity: number
    }[]
}

