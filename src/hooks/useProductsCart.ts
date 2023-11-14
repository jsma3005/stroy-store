import React from 'react'

import { CartTypes } from 'types/cart'
import { ProductTypes } from 'types/products'

export const useProductsCart = () => {
  const cartFromLocalStorage: CartTypes.Product[] = JSON.parse(localStorage.getItem('cart') as string) || []

  const [cart, setCart] = React.useState<CartTypes.Product[]>(cartFromLocalStorage)

  const [totalPrice, setTotalPrice] = React.useState<number>(0)

  const onAddToCart = React.useCallback((product: ProductTypes.Raw) => {
    const productToCart = {
      ...product,
      quantity: 1,
    }

    // if (!cart) {
    //   localStorage.setItem('cart', JSON.stringify([productToCart]))
    //   setCart([productToCart])
    // } else {
    //   localStorage.setItem('cart', JSON.stringify([...cart, productToCart]))
    //   setCart([...cart, productToCart])
    // }
  }, [])

  const onDelete = React.useCallback((product: ProductTypes.Raw) => {
    if (!cart) return

    const askDelete = window.confirm('Вы действительно хотите удалить данный товар из корзины?')

    if (!askDelete) return

    const filteredCart = cart.filter(cartProduct => cartProduct.id !== product.id)

    localStorage.setItem('cart', JSON.stringify(filteredCart))

    setCart(filteredCart)
  }, [cart])

  const onPlusQuantity = React.useCallback((product: ProductTypes.Raw) => {
    const changedCart = cart.map(cartProduct =>
      cartProduct.id === product.id ? { ...cartProduct, quantity: cartProduct.quantity + 1 } : cartProduct,
    )

    localStorage.setItem('cart', JSON.stringify(changedCart))
    setCart(changedCart)
  }, [cart])

  const onMinusQuantity = React.useCallback((product: ProductTypes.Raw) => {
    const changedCart = cart.map(cartProduct =>
      cartProduct.id === product.id && cartProduct.quantity > 1
        ? { ...cartProduct, quantity: cartProduct.quantity - 1 }
        : cartProduct,
    )

    localStorage.setItem('cart', JSON.stringify(changedCart))
    setCart(changedCart)
  }, [cart])

  return {
    cart,
    totalPrice: Math.round(totalPrice),
    actions: {
      onMinus: onMinusQuantity,
      onPlus: onPlusQuantity,
      onDelete,
      setCart,
      onAdd: onAddToCart,
    },
  }
}
