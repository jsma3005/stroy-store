import { ProductTypes } from './products'

export namespace CategoryTypes {
  export interface Raw {
    id: number
    title: string
    created_at: Date
  }

  export interface Item extends Raw {
    products: ProductTypes.Raw[]
  }
}
