export namespace ProductTypes {
  export interface Raw {
    id: number
    category: number
    title: string
    description: string
    price: string
    sale_percentage: number
    sale_price: number
    created_at: Date
    images: {
      id: number
      image: string
    }[]
  }

  export interface Sale {
    id: number
    product: Raw
    persent: number
    interest_amount: number
  }
}
