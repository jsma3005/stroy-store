import React from 'react'
import { Link } from 'react-router-dom'

import { Spinner } from '@chakra-ui/react'
import cn from 'classnames'
import { NotFound } from 'components/NotFound'
import { axiosRequest } from 'configs/api'
import { WallpaperTypes } from 'types/wallpaper'

import cls from './styles.module.scss'

export const Brands = () => {
  const [brands, setBrands] = React.useState<WallpaperTypes.Brand[] | null>(null)

  const getBrands = React.useCallback(async () => {
    try {
      const { data } = await axiosRequest.get<WallpaperTypes.Brand[]>('/wallpapers/brands')

      data && setBrands(data)
    } catch (e: any) {
      console.log(e)
    }
  }, [])

  React.useEffect(() => {
    getBrands()
  }, [getBrands])

  if (!brands) {
    return (
      <div className="flex items-center justify-center w-full h-screen">
        <Spinner
          color="red.500"
          size="xl"
        />
      </div>)
  }

  if (!brands.length) {
    return (
      <NotFound title="Бренды не найдены!" description="Простите, но список брендов отсутствует" />
    )
  }

  return (
    <div className={cls.root}>
      <h1 className={cls.title}>Бренды</h1>

      <div className={cls.brandsContainer}>
        {
          brands?.map((brand, index) => (
            <Link
              to={`/wallpapers/${brand.id}`}
              className={cn(cls.brand, { [cls.topCard]: index % 2 === 0 })}
              key={brand.id}
            >
              <img
                src={brand.image}
                alt={brand.title}
              />
              <p className={cls.brandTitle}>{brand.title}</p>
            </Link>
          ))
        }
      </div>
    </div>
  )
}
