import React from 'react'

import { LocalStorage } from 'const'
import { cartState } from 'state/cart'
import { CartTypes } from 'types/cart'
import { ProductTypes } from 'types/products'
import { WallpaperTypes } from 'types/wallpaper'
import { useSnapshot } from 'valtio'

function calculateTotalProductsPrice (cart: CartTypes.Product[]): number {
  return cart.reduce((totalSum, product) => {
    const price = product.sale_price !== null ? (Number(product.price) - product.sale_price) : Number(product.price)
    return totalSum + price * product.quantity
  }, 0)
}

function calculateTotalWallpapersPrice (cart: CartTypes.Wallpaper[]): number {
  return cart.reduce((totalSum, product) => totalSum + (Number(product.price) * product.quantity), 0)
}

export const useCart = () => {
  const {
    productsCart,
    wallpapersCart,
    productsTotalPrice,
    totalPrice,
    wallpapersTotalPrice,
  } = useSnapshot(cartState)

  // Products
  React.useEffect(() => {
    cartState.productsTotalPrice = calculateTotalProductsPrice(productsCart as CartTypes.Product[])
  }, [productsCart])

  const onAddToProductsCart = (good: ProductTypes.Raw) => {
    const goodToCart: CartTypes.Product = {
      ...good,
      quantity: 1,
      type: 'product',
    }

    localStorage.setItem(LocalStorage.PRODUCTS_CART, JSON.stringify([...productsCart, goodToCart]))
    cartState.productsCart.push(goodToCart)
  }

  const onPlusProduct = React.useCallback((product: ProductTypes.Raw) => {
    const changedCart = productsCart.map(cartProduct =>
      cartProduct.id === product.id ? { ...cartProduct, quantity: cartProduct.quantity + 1 } : cartProduct,
    ) as CartTypes.Product[]

    localStorage.setItem(LocalStorage.PRODUCTS_CART, JSON.stringify(changedCart))

    cartState.productsCart = changedCart
  }, [productsCart])

  const onMinusProduct = React.useCallback((product: ProductTypes.Raw) => {
    const changedCart = productsCart.map(cartProduct =>
      cartProduct.id === product.id && cartProduct.quantity > 1
        ? { ...cartProduct, quantity: cartProduct.quantity - 1 }
        : cartProduct,
    ) as CartTypes.Product[]

    localStorage.setItem(LocalStorage.PRODUCTS_CART, JSON.stringify(changedCart))

    cartState.productsCart = changedCart
  }, [productsCart])

  const onDeleteProduct = React.useCallback((product: ProductTypes.Raw) => {
    if (!productsCart) return

    const askDelete = window.confirm('Вы действительно хотите удалить данный товар из корзины?')

    if (!askDelete) return

    const filteredCart = productsCart.filter(cartProduct => cartProduct.id !== product.id) as CartTypes.Product[]

    localStorage.setItem(LocalStorage.PRODUCTS_CART, JSON.stringify(filteredCart))

    cartState.productsCart = filteredCart
  }, [productsCart])

  // Wallpapers
  React.useEffect(() => {
    cartState.wallpapersTotalPrice = calculateTotalWallpapersPrice(wallpapersCart as CartTypes.Wallpaper[])
  }, [wallpapersCart])

  const onAddToWallpapersCart = (good: WallpaperTypes.Raw) => {
    const goodToCart: CartTypes.Wallpaper = {
      ...good,
      quantity: 1,
      type: 'wallpaper',
    }

    localStorage.setItem(LocalStorage.WALLPAPERS_CART, JSON.stringify([...wallpapersCart, goodToCart]))
    cartState.wallpapersCart.push(goodToCart)
  }

  const onPlusWallpaper = React.useCallback((wallpaper: WallpaperTypes.Raw) => {
    const changedCart = wallpapersCart.map(cartWallpaper =>
      cartWallpaper.id === wallpaper.id ? { ...cartWallpaper, quantity: cartWallpaper.quantity + 1 } : cartWallpaper,
    ) as CartTypes.Wallpaper[]

    localStorage.setItem(LocalStorage.WALLPAPERS_CART, JSON.stringify(changedCart))

    cartState.wallpapersCart = changedCart
  }, [wallpapersCart])

  const onMinusWallpaper = React.useCallback((wallpaper: WallpaperTypes.Raw) => {
    const changedCart = wallpapersCart.map(cartWallpaper =>
      cartWallpaper.id === wallpaper.id && cartWallpaper.quantity > 1
        ? { ...cartWallpaper, quantity: cartWallpaper.quantity - 1 }
        : cartWallpaper,
    ) as CartTypes.Wallpaper[]

    localStorage.setItem(LocalStorage.WALLPAPERS_CART, JSON.stringify(changedCart))

    cartState.wallpapersCart = changedCart
  }, [wallpapersCart])

  const onDeleteWallpaper = React.useCallback((wallpaper: WallpaperTypes.Raw) => {
    if (!wallpapersCart) return

    const askDelete = window.confirm('Вы действительно хотите удалить данный товар из корзины?')

    if (!askDelete) return

    const filteredCart = wallpapersCart.filter(cartWallpaper => cartWallpaper.id !== wallpaper.id) as CartTypes.Wallpaper[]

    localStorage.setItem(LocalStorage.WALLPAPERS_CART, JSON.stringify(filteredCart))

    cartState.wallpapersCart = filteredCart
  }, [wallpapersCart])

  const resetCart = React.useCallback(() => {
    localStorage.removeItem(LocalStorage.PRODUCTS_CART)
    localStorage.removeItem(LocalStorage.WALLPAPERS_CART)
    cartState.productsCart = []
    cartState.wallpapersCart = []
  }, [])

  React.useEffect(() => {
    cartState.totalPrice = productsTotalPrice + wallpapersTotalPrice
  }, [productsTotalPrice, wallpapersTotalPrice])

  return {
    productsCart,
    wallpapersCart,
    productsTotalPrice,
    wallpapersTotalPrice,
    totalPrice,
    actions: {
      onAddToProductsCart,
      onAddToWallpapersCart,
      onPlusProduct,
      onMinusProduct,
      onPlusWallpaper,
      onMinusWallpaper,
      onDeleteWallpaper,
      onDeleteProduct,
      resetCart,
    },
  }
}
