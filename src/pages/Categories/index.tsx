import React from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'

import { Spinner } from '@chakra-ui/react'
import { NotFound } from 'components/NotFound'
import { Button } from 'components/UI/Button'
import { axiosRequest } from 'configs/api'
import { PageLayout } from 'elements/layouts/PageLayout'
import { useProductsCart } from 'hooks/useProductsCart'
import { CategoryTypes } from 'types/categories'

import cls from './styles.module.scss'

export const CategoriesPage = () => {
  const { id } = useParams()
  const navigate = useNavigate()

  const { cart, onAddToCart } = useProductsCart()

  const [category, setCategory] = React.useState<CategoryTypes.Item | null>(null)
  const [isLoading, setIsLoading] = React.useState(false)

  const getCategory = React.useCallback(async (id: string) => {
    setIsLoading(true)

    try {
      const { data } = await axiosRequest.get<CategoryTypes.Item>(`/categories/${id}`)

      if (data) setCategory(data)
    } catch (e: any) {
      console.log(e)
    } finally {
      setIsLoading(false)
    }
  }, [])

  React.useEffect(() => {
    if (!id) return

    getCategory(id)
  }, [getCategory, id])

  if (isLoading) {
    return (
      <div className="flex items-center justify-center w-full h-screen">
        <Spinner
          color="red.500"
          size="xl"
        />
      </div>
    )
  }

  if (!category) return <NotFound />

  if (!category.products.length) {
    return (
      <NotFound title="Продукты не найдены!" description="Простите, но продукты данной категории отсутствуют" />
    )
  }

  return (
    <PageLayout className={cls.root}>
      <h1 className={cls.title}>{category.title}</h1>

      <div className={cls.productContainer}>
        {
          category.products.map(product => {
            const isProductInCart = cart?.find(cartProduct => product.id === cartProduct.id)

            return (
              <div
                key={product.id}
                className={cls.product}
              >
                <div className={cls.productImg}>
                  <img
                    src={product.images[0]?.image || 'https://www.salonlfc.com/wp-content/uploads/2018/01/image-not-found-scaled-1150x647.png'}
                    alt={product.title}
                    onClick={() => navigate(`/products/${category.id}`)}
                  />

                  {
                    product.sale_percentage && (
                      <div className={cls.salePercentage}>-{product.sale_percentage}%</div>
                    )
                  }
                </div>

                <div className={cls.productInfo}>
                  <Link to="/products/1" className={cls.productTitle}>{product.title}</Link>

                  <div>
                    <p className={cls.price}>
                      {
                        product.sale_percentage
                          ? (
                            <>
                              <span className={cls.salesPrice}>{product.price - product.sale_price} СОМ</span>
                              <span className={cls.realPrice}>{product.price} СОМ</span>
                            </>
                          )
                          : (
                            <span>{product.price} СОМ</span>
                          )
                      }
                    </p>
                    <Button
                      className={cls.cartBtn}
                      onClick={() => !isProductInCart ? onAddToCart(product) : navigate('/cart')}
                    >{ isProductInCart ? 'Перейти в корзину' : 'Добавить в корзину' }</Button>
                  </div>
                </div>

              </div>
            )
          })
        }
      </div>
    </PageLayout>
  )
}
