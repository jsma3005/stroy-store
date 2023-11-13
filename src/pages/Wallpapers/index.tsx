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
        <Route path="/:brandId" element={<WallpapersPages.Collections />} />
        <Route path="/:brandId/:collectionId" element={<WallpapersPages.WallpapersList />} />
        <Route path="/:brandId/:collectionId/:wallpaperId" element={<WallpapersPages.Wallpaper />} />
      </Routes>
    </PageLayout>
  )
}
