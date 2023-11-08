import { ProductTypes } from './products'

export namespace CartTypes {
  export interface Raw extends ProductTypes.Raw {
    quantity: number
  }
}
