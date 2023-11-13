import React from 'react'

import { NotFound } from 'components/NotFound'
import { Button } from 'components/UI/Button'
import { PageLayout } from 'elements/layouts/PageLayout'
import { AiOutlinePlus, AiOutlineMinus } from 'react-icons/ai'
import { CartTypes } from 'types/cart'
import { ProductTypes } from 'types/products'

import cls from './styles.module.scss'

function calculateTotalCartPrice (cart: CartTypes.Raw[]): number {
  return cart.reduce((totalSum, product) => {
    const price = product.sale_price !== null ? (product.price - product.sale_price) : Number(product.price)
    return totalSum + price * product.quantity
  }, 0)
}

export const CartPage = () => {
  const cartFromLocalStorage: CartTypes.Raw[] = JSON.parse(localStorage.getItem('cart') as string) || []

  const [cart, setCart] = React.useState<CartTypes.Raw[]>(cartFromLocalStorage)

  const [totalPrice, setTotalPrice] = React.useState<number>(calculateTotalCartPrice(cart))

  const onDelete = React.useCallback((product: ProductTypes.Raw) => {
    if (!cart) return

    const askDelete = window.confirm('Вы действительно хотите удалить данный товар из корзины?')

    if (!askDelete) return

    const filteredCart = cart.filter(cartProduct => cartProduct.id !== product.id)

    localStorage.setItem('cart', JSON.stringify(filteredCart))

    setCart(filteredCart)

    setTotalPrice(calculateTotalCartPrice(filteredCart))
  }, [cart])

  const onPlusQuantity = React.useCallback((product: ProductTypes.Raw) => {
    const changedCart = cart.map(cartProduct =>
      cartProduct.id === product.id ? { ...cartProduct, quantity: cartProduct.quantity + 1 } : cartProduct,
    )

    localStorage.setItem('cart', JSON.stringify(changedCart))
    setCart(changedCart)
    setTotalPrice(calculateTotalCartPrice(changedCart))
  }, [cart])

  const onMinusQuantity = React.useCallback((product: ProductTypes.Raw) => {
    const changedCart = cart.map(cartProduct =>
      cartProduct.id === product.id && cartProduct.quantity > 1
        ? { ...cartProduct, quantity: cartProduct.quantity - 1 }
        : cartProduct,
    )

    localStorage.setItem('cart', JSON.stringify(changedCart))
    setCart(changedCart)
    setTotalPrice(calculateTotalCartPrice(changedCart))
  }, [cart])

  if (!cart || !cart.length) return <NotFound title="Корзина пуста!" description="Список корзины пуст! Пожалуйста, добавьте товары в корзину, чтобы отобразить их." />

  return (
    <PageLayout className={cls.root}>
      <div
        className={cls.cartHeader}
        style={{
          backgroundImage: 'url(\'/assets/cart-bg.png\')',
        }}
      >
        <h1>Корзина</h1>
      </div>

      <div className={cls.cartContainer}>
        <div className={cls.total}>
          <div className={cls.totalContent}>
            <h2>Итого</h2>

            <ul>
              <li>
                <span>Количество товаров</span>
                <span>{cart.length} шт.</span>
              </li>
              <li>
                <span>Товаров на сумму</span>
                <span>{totalPrice} СОМ</span>
              </li>
            </ul>
          </div>

          <div className={cls.actions}>
            <Button>Оформить заказ</Button>
          </div>
        </div>

        <div className={cls.cartProducts}>
          {
            cart.map(product => (
              <div
                key={product.id}
                className={cls.product}
              >
                <div className={cls.productImage}>
                  <img
                    src={product.images[0]?.image || 'https://www.salonlfc.com/wp-content/uploads/2018/01/image-not-found-scaled-1150x647.png'}
                    alt={product.title}
                  />

                  {
                    product.sale_percentage && (
                      <div className={cls.salePercentage}>-{product.sale_percentage}%</div>
                    )
                  }
                </div>

                <div className={cls.info}>
                  <p className={cls.title}>{product.title}</p>
                  <p className={cls.price}>
                    {
                      product.sale_percentage
                        ? (
                          <>
                            <span className={cls.salesPrice}>{(product.price - product.sale_price)} СОМ</span>
                            <span className={cls.realPrice}>{product.price} СОМ</span>
                          </>
                        )
                        : (
                          <span>{product.price} СОМ</span>
                        )
                    }
                  </p>

                  <div className={cls.actions}>
                    <div className={cls.quantityController}>
                      <button
                        onClick={() => onPlusQuantity(product)}
                      >
                        <AiOutlinePlus
                          width={24}
                          height={24}
                        />
                      </button>
                      <span>{product.quantity}</span>
                      <button
                        onClick={() => onMinusQuantity(product)}
                      >
                        <AiOutlineMinus
                          width={24}
                          height={24}
                        />
                      </button>
                    </div>

                    <div className={cls.delete}>
                      <button onClick={() => onDelete(product)}>Удалить товар</button>
                    </div>
                  </div>
                </div>
              </div>
            ))
          }
        </div>
      </div>
    </PageLayout>
  )
}
