import React from 'react'
import { Link, useNavigate } from 'react-router-dom'

import { Spinner } from '@chakra-ui/react'
import { Button } from 'components/UI/Button'
import { axiosRequest } from 'configs/api'
import { useCart } from 'hooks/useCart'
import { ProductTypes } from 'types/products'

import cls from './styles.module.scss'

export const PopularProductsSection = () => {
  const navigate = useNavigate()

  const {
    productsCart,
    actions: { onAddToProductsCart },
  } = useCart()

  const [products, setProducts] = React.useState<ProductTypes.Raw[] | null>(null)

  const getPopularProducts = React.useCallback(async () => {
    try {
      const { data } = await axiosRequest.get<ProductTypes.Raw[]>('/products/popular')

      data && setProducts(data.slice(0, 8))
    } catch (e: any) {
      console.log(e)
    }
  }, [])

  React.useEffect(() => {
    getPopularProducts()
  }, [getPopularProducts])

  return (
    <section
      className={cls.root}
      id="popular"
    >
      <h1 className={cls.title}>Популярные товары</h1>

      {
        !products && (
          <div className="flex items-center justify-center p-10">
            <Spinner
              color="red.500"
              size="xl"
            />
          </div>
        )
      }

      {
        products && (
          <div className={cls.productContainer}>
            {
              products.map(product => {
                const isProductInCart = productsCart?.find(cartProduct => product.id === cartProduct.id)

                return (
                  <div
                    key={product.id}
                    className={cls.product}
                  >
                    <div className={cls.productImg}>
                      <img
                        src={product.images[0]?.image || 'https://www.salonlfc.com/wp-content/uploads/2018/01/image-not-found-scaled-1150x647.png'}
                        alt={product.title}
                        onClick={() => navigate('/products/' + product.id)}
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
                                  <span className={cls.salesPrice}>{(Number(product.price) - product.sale_price)} СОМ</span>
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
                          onClick={() => !isProductInCart ? onAddToProductsCart(product) : navigate('/cart')}
                        >{ isProductInCart ? 'Перейти в корзину' : 'Добавить в корзину' }</Button>
                      </div>
                    </div>

                  </div>
                )
              })
            }
          </div>
        )
      }

    </section>
  )
}
