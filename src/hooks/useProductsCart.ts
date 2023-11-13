import React from 'react'

import { CartTypes } from 'types/cart'
import { ProductTypes } from 'types/products'

export const useProductsCart = () => {
  const cartFromLocalStorage: CartTypes.Raw[] | null = JSON.parse(localStorage.getItem('cart') as string) || null

  const [cart, setCart] = React.useState<CartTypes.Raw[] | null>(cartFromLocalStorage)

  const onAddToCart = React.useCallback((product: ProductTypes.Raw) => {
    const productToCart = {
      ...product,
      quantity: 1,
    }

    if (!cart) {
      localStorage.setItem('cart', JSON.stringify([productToCart]))
      setCart([productToCart])
    } else {
      localStorage.setItem('cart', JSON.stringify([...cart, productToCart]))
      setCart([...cart, productToCart])
    }
  }, [cart])

  return {
    cart,
    setCart,
    onAddToCart,
  }
}
