import React from 'react'
import { useParams } from 'react-router-dom'

import { Spinner } from '@chakra-ui/react'
import { NotFound } from 'components/NotFound'
import { Button } from 'components/UI/Button'
import { axiosRequest } from 'configs/api'
import { PageLayout } from 'elements/layouts/PageLayout'
import { AiOutlinePlus, AiOutlineMinus } from 'react-icons/ai'
import { WallpaperTypes } from 'types/wallpaper'

import cls from './styles.module.scss'

const PageLoader = () => (
  <div className="flex items-center justify-center w-full h-screen">
    <Spinner
      color="red.500"
      size="xl"
    />
  </div>
)

export const Wallpaper = () => {
  const {
    wallpaperId,
  } = useParams()

  const [isLoading, setIsLoading] = React.useState(false)
  const [wallpaper, setWallpaper] = React.useState<WallpaperTypes.Raw | null>(null)

  const getProduct = React.useCallback(async (wallpaperId: string) => {
    setIsLoading(true)

    try {
      const { data } = await axiosRequest.get<WallpaperTypes.Raw>('/wallpapers/' + wallpaperId)

      data && setWallpaper(data)
    } catch (e: any) {
      console.log(e)
    } finally {
      setIsLoading(false)
    }
  }, [])

  React.useEffect(() => {
    wallpaperId && getProduct(wallpaperId)
  }, [getProduct, wallpaperId])

  if (isLoading) return <PageLoader />

  if (!isLoading && !wallpaper) return <NotFound title="Страница не найдена!" description="Обои, которые вы ищите не найдены!" />

  return (
    <PageLayout className={cls.root}>
      <div className={cls.productCard}>
        <div className={cls.images}>
          <img
            src={wallpaper?.images[0].image || 'https://www.salonlfc.com/wp-content/uploads/2018/01/image-not-found-scaled-1150x647.png'}
            alt="Wallpaper image"
          />
        </div>

        <div className={cls.info}>
          <h2 className={cls.title}>
            <span>{wallpaper?.title}</span>
            <span>(артикул: {wallpaper?.article})</span>
          </h2>

          <div className={cls.extraInfo}>
            <p className={cls.price}>{wallpaper?.price} СОМ</p>
            <p className={cls.size}>Размеры: {wallpaper?.size}</p>
            <p className={cls.size}>Коллекция: {wallpaper?.collection.title}</p>
          </div>

          <div className={cls.actions}>
            <Button className={cls.toCartBtn}>В корзину</Button>

            <div className={cls.cartSum}>
              <button>
                <AiOutlinePlus
                  width={24}
                  height={24}
                />
              </button>
              <span>1</span>
              <button>
                <AiOutlineMinus
                  width={24}
                  height={24}
                />
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className={cls.descriptionCard}>

        <div className={cls.content}>
          <h2 className={cls.title}>Описание:</h2>

          <div dangerouslySetInnerHTML={{ __html: wallpaper?.description as string }} />
        </div>
      </div>
    </PageLayout>
  )
}
