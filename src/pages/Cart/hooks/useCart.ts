import React from 'react'

import { CartTypes } from 'types/cart'
import { ProductTypes } from 'types/products'

function calculateTotalCartPrice (cart: CartTypes.Raw[]): number {
  return cart.reduce((totalSum, product) => {
    const price = product.sale_price !== null ? (product.price - product.sale_price) : Number(product.price)
    return totalSum + price * product.quantity
  }, 0)
}

export const useCartPage = () => {
  const cartFromLocalStorage: CartTypes.Raw[] = JSON.parse(localStorage.getItem('cart') as string) || []

  const [cart, setCart] = React.useState<CartTypes.Raw[]>(cartFromLocalStorage)

  const [totalPrice, setTotalPrice] = React.useState<number>(calculateTotalCartPrice(cart))

  const onDelete = React.useCallback((product: ProductTypes.Raw) => {
    if (!cart) return

    const askDelete = window.confirm('Вы действительно хотите удалить данный товар из корзины?')

    if (!askDelete) return

    const filteredCart = cart.filter(cartProduct => cartProduct.id !== product.id)

    localStorage.setItem('cart', JSON.stringify(filteredCart))

    setCart(filteredCart)

    setTotalPrice(calculateTotalCartPrice(filteredCart))
  }, [cart])

  const onPlusQuantity = React.useCallback((product: ProductTypes.Raw) => {
    const changedCart = cart.map(cartProduct =>
      cartProduct.id === product.id ? { ...cartProduct, quantity: cartProduct.quantity + 1 } : cartProduct,
    )

    localStorage.setItem('cart', JSON.stringify(changedCart))
    setCart(changedCart)
    setTotalPrice(calculateTotalCartPrice(changedCart))
  }, [cart])

  const onMinusQuantity = React.useCallback((product: ProductTypes.Raw) => {
    const changedCart = cart.map(cartProduct =>
      cartProduct.id === product.id && cartProduct.quantity > 1
        ? { ...cartProduct, quantity: cartProduct.quantity - 1 }
        : cartProduct,
    )

    localStorage.setItem('cart', JSON.stringify(changedCart))
    setCart(changedCart)
    setTotalPrice(calculateTotalCartPrice(changedCart))
  }, [cart])

  return {
    cartFromLocalStorage,
    cart,
    totalPrice,
    actions: {
      onMinus: onMinusQuantity,
      onPlus: onPlusQuantity,
      onDelete,
      setCart,
    },
  }
}
