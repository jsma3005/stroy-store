import { CartTypes } from 'types/cart'
import { proxy } from 'valtio'

interface CartState {
  productsCart: CartTypes.Product[]
  wallpapersCart: CartTypes.Wallpaper[]
  productsTotalPrice: number
  wallpapersTotalPrice: number
  totalPrice: number
}

export const cartState = proxy<CartState>({
  productsCart: [],
  wallpapersCart: [],
  productsTotalPrice: 0,
  totalPrice: 0,
  wallpapersTotalPrice: 0,
})
