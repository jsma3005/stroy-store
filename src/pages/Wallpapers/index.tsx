import React from 'react'
import { Route, Routes } from 'react-router-dom'

import { PageLayout } from 'elements/layouts/PageLayout'

import { WallpapersPages } from './pages'
import cls from './styles.module.scss'

export const WallpapersPage = () => {
  return (
    <PageLayout className={cls.root}>
      <Routes>
        <Route index element={<WallpapersPages.Brands />} />
        <Route path="/collections" element={<WallpapersPages.Collections />} />
        <Route path="/collections/:id" element={<WallpapersPages.Wallpapers />} />
      </Routes>
    </PageLayout>
  )
}
