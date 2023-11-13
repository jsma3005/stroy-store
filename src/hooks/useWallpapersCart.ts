import React from 'react'

import { CartTypes } from 'types/cart'
import { WallpaperTypes } from 'types/wallpaper'

export const useWallpapersCart = () => {
  const cartFromLocalStorage: CartTypes.Wallpaper[] | null = JSON.parse(localStorage.getItem('cart-wallpapers') as string) || null

  const [wallpapersCart, setWallpapersCart] = React.useState<CartTypes.Wallpaper[] | null>(cartFromLocalStorage)

  const onAddToWallpapersCart = React.useCallback((wallpaper: WallpaperTypes.Raw) => {
    const wallpaperToCart = {
      ...wallpaper,
      quantity: 1,
    }

    if (!wallpapersCart) {
      localStorage.setItem('cart-wallpapers', JSON.stringify([wallpaperToCart]))
      setWallpapersCart([wallpaperToCart])
    } else {
      localStorage.setItem('cart-wallpapers', JSON.stringify([...wallpapersCart, wallpaperToCart]))
      setWallpapersCart([...wallpapersCart, wallpaperToCart])
    }
  }, [wallpapersCart])

  return {
    wallpapersCart,
    setWallpapersCart,
    onAddToWallpapersCart,
  }
}
