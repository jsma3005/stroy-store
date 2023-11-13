import React from 'react'
import { Link, useParams } from 'react-router-dom'

import { Spinner } from '@chakra-ui/react'
import cn from 'classnames'
import { NotFound } from 'components/NotFound'
import { axiosRequest } from 'configs/api'
import { WallpaperTypes } from 'types/wallpaper'

import cls from './styles.module.scss'

export const Collections = () => {
  const { brandId } = useParams()

  const [collections, setCollections] = React.useState<WallpaperTypes.Collection[] | null>(null)
  const [brandTitle, setBrandTitle] = React.useState('')

  const getBrands = React.useCallback(async (brandId: string) => {
    try {
      const { data } = await axiosRequest.get<WallpaperTypes.Brand>(`/wallpapers/brands/${brandId}`)

      if (data) {
        setCollections(data.collections)

        setBrandTitle(data.title)
      }
    } catch (e: any) {
      console.log(e)
    }
  }, [])

  React.useEffect(() => {
    if (brandId) getBrands(brandId)
  }, [brandId, getBrands])

  if (!collections) {
    return (
      <div className="flex items-center justify-center w-full h-screen">
        <Spinner
          color="red.500"
          size="xl"
        />
      </div>)
  }

  if (!collections.length) {
    return (
      <NotFound title="Коллекции не найдены!" description="Простите, но список коллекций у выбранного бренда отсутствует" />
    )
  }

  return (
    <div className={cls.root}>
      <h1 className={cls.title}>Коллекции {`- ${brandTitle}`}</h1>

      <div className={cls.collectionContainer}>
        {
          collections?.map((collection, index) => (
            <Link
              to={`/wallpapers/${brandId}/${collection.id}`}
              className={cn(cls.collection, { [cls.topCard]: index % 2 === 0 })}
              key={collection.id}
            >
              <img
                src={collection.image}
                alt={collection.title}
              />
              <p className={cls.collectionTitle}>{collection.title}</p>
            </Link>
          ))
        }
      </div>
    </div>
  )
}
