import React from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'

import { Spinner } from '@chakra-ui/react'
import { NotFound } from 'components/NotFound'
import { Button } from 'components/UI/Button'
import { axiosRequest } from 'configs/api'
import { useCart } from 'hooks/useCart'
import { WallpaperTypes } from 'types/wallpaper'

import cls from './styles.module.scss'

export const WallpapersList = () => {
  const {
    collectionId,
    brandId,
  } = useParams()

  const {
    wallpapersCart,
    actions: {
      onAddToWallpapersCart,
    },
  } = useCart()

  const [collectionTitle, setCollectionTitle] = React.useState('')

  const navigate = useNavigate()

  const [wallpapers, setWallpapers] = React.useState<WallpaperTypes.Raw[] | null>(null)

  const getWallpapers = React.useCallback(async (collectionId: string) => {
    try {
      const { data } = await axiosRequest.get<WallpaperTypes.Collection>(`/wallpapers/brands/collections/${collectionId}`)

      if (data) {
        setWallpapers(data.wallpapers)

        setCollectionTitle(data.title)
      }
    } catch (e: any) {
      console.log(e)
    }
  }, [])

  React.useEffect(() => {
    if (collectionId) getWallpapers(collectionId)
  }, [collectionId, getWallpapers])

  if (!wallpapers) {
    return (
      <div className="flex items-center justify-center w-full h-screen">
        <Spinner
          color="red.500"
          size="xl"
        />
      </div>)
  }

  if (!wallpapers.length) {
    return (
      <NotFound title="Обои не найдены!" description="Простите, но список обоев у выбранной коллекции отсутствует" />
    )
  }

  return (
    <div className={cls.root}>
      <h1 className={cls.title}>{collectionTitle}</h1>

      <div className={cls.productContainer}>
        {
          wallpapers.map(wallpaper => {
            const isWallpaperInCart = wallpapersCart.find(good => good.id === wallpaper.id)

            return (
              <div
                key={wallpaper.id}
                className={cls.product}
              >
                <div className={cls.productImg}>
                  <img
                    src={wallpaper.images[0]?.image || 'https://www.salonlfc.com/wp-content/uploads/2018/01/image-not-found-scaled-1150x647.png'}
                    alt={wallpaper.title}
                    onClick={() => navigate(`/wallpapers/${brandId}/${collectionId}/${wallpaper.id}`)}
                  />
                </div>

                <div className={cls.productInfo}>
                  <Link to={`/wallpapers/${brandId}/${collectionId}/${wallpaper.id}`} className={cls.productTitle}>{wallpaper.title}</Link>

                  <div>
                    <p className={cls.price}>
                      <span>{wallpaper.price} СОМ</span>
                    </p>
                    <Button
                      className={cls.cartBtn}
                      onClick={() => !isWallpaperInCart ? onAddToWallpapersCart(wallpaper) : navigate('/cart')}
                    >{ isWallpaperInCart ? 'Перейти в корзину' : 'Добавить в корзину' }</Button>
                  </div>
                </div>

              </div>
            )
          })
        }
      </div>
    </div>
  )
}
