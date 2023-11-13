import { ProductTypes } from './products'
import { WallpaperTypes } from './wallpaper'

export namespace CartTypes {
  export interface Raw extends ProductTypes.Raw {
    quantity: number
  }

  export interface Wallpaper extends WallpaperTypes.Raw {
    quantity: number
  }
}
