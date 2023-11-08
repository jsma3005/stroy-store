export namespace ProductTypes {
  export interface Raw {
    id: number
    category: number
    title: string
    description: string
    price: number
    sale_percentage: number
    img: string
    sale_price: number
    created_at: Date
    images: {
      id: number
      image: string
    }[]
  }
}
