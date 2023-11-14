import { ProductTypes } from './products'
import { WallpaperTypes } from './wallpaper'

export namespace CartTypes {
  export type GoodType = 'wallpaper' | 'product'

  export interface Product extends ProductTypes.Raw {
    quantity: number
    type: GoodType
  }

  export interface Wallpaper extends WallpaperTypes.Raw {
    quantity: number
    type: GoodType
  }
}
