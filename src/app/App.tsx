import React from 'react'
import { Route, Routes } from 'react-router-dom'

import { NotFound } from 'components/NotFound'
import { StackedLayout } from 'elements/layouts/StackedLayout'
import { CartPage } from 'pages/Cart'
import { CategoriesPage } from 'pages/Categories'
import { MainPage } from 'pages/Main'
import { ProductPage } from 'pages/Product'
import { WallpapersPage } from 'pages/Wallpapers'

import 'swiper/css'
import 'swiper/css/navigation'

const App = () => {
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
