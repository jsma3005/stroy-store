import React from 'react'
import { Link, useNavigate } from 'react-router-dom'

import { Spinner } from '@chakra-ui/react'
import { Button } from 'components/UI/Button'
import { axiosRequest } from 'configs/api'
import { useCart } from 'hooks/useCart'
import { ProductTypes } from 'types/products'

import cls from './styles.module.scss'

export const SalesSection = () => {
  const navigate = useNavigate()

  const {
    productsCart,
    actions: { onAddToProductsCart },
  } = useCart()

  const [sales, setSales] = React.useState<ProductTypes.Sale[] | null>(null)

  const getSaleProducts = React.useCallback(async () => {
    try {
      const { data } = await axiosRequest.get<ProductTypes.Sale[]>('/stocks/')

      data && setSales(data.slice(0, 4))
    } catch (e: any) {
      console.log(e)
    }
  }, [])

  React.useEffect(() => {
    getSaleProducts()
  }, [getSaleProducts])

  console.log(sales)

  return (
    <section
      className={cls.root}
      id="sale"
    >
      <h1 className={cls.title}>Акции</h1>

      {
        !sales && (
          <div className="flex items-center justify-center p-10">
            <Spinner
              color="red.500"
              size="xl"
            />
          </div>
        )
      }

      {
        sales && (
          <div className={cls.salesContainer}>
            {
              sales.map(sale => {
                const product = sale.product
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
                        sale.persent && (
                          <div className={cls.salePercentage}>-{sale.persent}%</div>
                        )
                      }
                    </div>

                    <div className={cls.productInfo}>
                      <Link to={'/products/1'} className={cls.productTitle}>{product.title}</Link>

                      <div>
                        <p className={cls.price}>
                          <span>{(Number(product.price) - sale.interest_amount)} СОМ</span>
                          <span>{product.price} CОМ</span>
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
