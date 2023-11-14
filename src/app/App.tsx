import React from 'react'
import { Route, Routes } from 'react-router-dom'

import { NotFound } from 'components/NotFound'
import { LocalStorage } from 'const'
import { StackedLayout } from 'elements/layouts/StackedLayout'
import { CartPage } from 'pages/Cart'
import { CategoriesPage } from 'pages/Categories'
import { MainPage } from 'pages/Main'
import { ProductPage } from 'pages/Product'
import { WallpapersPage } from 'pages/Wallpapers'
import { cartState } from 'state/cart'
import 'swiper/css'
import 'swiper/css/navigation'

const App = () => {
  React.useEffect(() => {
    // Set cart
    const products = JSON.parse(localStorage.getItem(LocalStorage.PRODUCTS_CART) as string) || []
    const wallpapers = JSON.parse(localStorage.getItem(LocalStorage.WALLPAPERS_CART) as string) || []

    cartState.productsCart = products
    cartState.wallpapersCart = wallpapers
  }, [])

  return (
    <StackedLayout>
      <Routes>
        <Route index element={<MainPage />} />
        <Route path="/categories/:id" element={<CategoriesPage />} />
        <Route path="/products/:id" element={<ProductPage />} />
        <Route path="/cart" element={<CartPage />} />
        <Route path="/wallpapers/*" element={<WallpapersPage />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </StackedLayout>
  )
}

export default App
