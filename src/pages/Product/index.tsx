import React from 'react'
import { useParams } from 'react-router-dom'

import { Spinner } from '@chakra-ui/react'
import { NotFound } from 'components/NotFound'
import { Button } from 'components/UI/Button'
import { axiosRequest } from 'configs/api'
import { PageLayout } from 'elements/layouts/PageLayout'
import { AiOutlinePlus, AiOutlineMinus } from 'react-icons/ai'
import { Navigation } from 'swiper/modules'
import { Swiper, SwiperSlide } from 'swiper/react'
import { ProductTypes } from 'types/products'

import cls from './styles.module.scss'

const PageLoader = () => (
  <div className="flex items-center justify-center w-full h-screen">
    <Spinner
      color="red.500"
      size="xl"
    />
  </div>
)

export const ProductPage = () => {
  const { id } = useParams()

  const [product, setProduct] = React.useState<ProductTypes.Raw | null>(null)

  const [isLoading, setIsLoading] = React.useState(false)
  const [isProductNotFound, setIsProductNotFound] = React.useState<boolean | null>(null)

  const getProduct = React.useCallback(async (productId: string) => {
    setIsLoading(true)

    try {
      const { data } = await axiosRequest.get<ProductTypes.Raw>('/products/' + productId)

      setProduct(data)
    } catch (e: any) {
      setIsProductNotFound(true)
    } finally {
      setIsLoading(false)
    }
  }, [])

  React.useEffect(() => {
    id && getProduct(id)
  }, [getProduct, id])

  if (isLoading) return <PageLoader />

  if (isProductNotFound) return <NotFound title="Страница не найдена!" description="Продукт, который вы ищите не найден!" />

  return (
    <PageLayout className={cls.root}>
      <div className={cls.productCard}>
        <div className={cls.images}>
          {
            product?.images.length
              ? (
                <Swiper
                  slidesPerView={1}
                  loop
                  navigation
                  modules={[Navigation]}
                >
                  {
                    product?.images.map(img => (
                      <SwiperSlide
                        key={img.id}
                        className={cls.swiperSlide}
                      >
                        <img
                          src={img.image}
                          alt="product image"
                        />
                      </SwiperSlide>
                    ))
                  }
                </Swiper>
              )
              : <img src="https://www.salonlfc.com/wp-content/uploads/2018/01/image-not-found-scaled-1150x647.png" />
          }
        </div>

        <div className={cls.info}>
          <h2 className={cls.title}>{product?.title}</h2>

          <p className={cls.price}>{product?.price} СОМ</p>

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

          <div dangerouslySetInnerHTML={{ __html: product?.description as string }} />
        </div>
      </div>
    </PageLayout>
  )
}
