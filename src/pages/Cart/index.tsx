import React from 'react'
import { Link } from 'react-router-dom'

import { useDisclosure } from '@chakra-ui/react'
import { NotFound } from 'components/NotFound'
import { Button } from 'components/UI/Button'
import { PageLayout } from 'elements/layouts/PageLayout'
import { AiOutlinePlus, AiOutlineMinus } from 'react-icons/ai'

import { OrderModal } from './components/OrderModal'
import { SuccessModal } from './components/SuccessModal'
import { useCartPage } from './hooks/useCart'
import cls from './styles.module.scss'

export const CartPage = () => {
  const {
    actions: {
      onDelete,
      onMinus,
      onPlus,
    },
    cart,
    totalPrice,
  } = useCartPage()

  const [isWorking, setIsWorking] = React.useState<boolean | null>(null)

  const {
    isOpen: isOpenOrderModal,
    onClose: onCloseOrderModal,
    onOpen: onOpenOrderModal,
  } = useDisclosure()

  const {
    isOpen: isOpenSuccessModal,
    onClose: onCloseSuccessModal,
    onOpen: onOpenSuccessModal,
  } = useDisclosure()

  if (!cart || !cart.length) return <NotFound title="Корзина пуста!" description="Список корзины пуст! Пожалуйста, добавьте товары в корзину, чтобы отобразить их." />

  return (
    <PageLayout className={cls.root}>
      {/* !!! Modals !!! */}
      <OrderModal
        isOpen={isOpenOrderModal}
        onClose={onCloseOrderModal}
        onOpenSuccessModal={onOpenSuccessModal}
        setIsWorking={setIsWorking}
      />

      <SuccessModal
        isOpen={isOpenSuccessModal}
        onClose={onCloseSuccessModal}
        isWorking={isWorking}
      />

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
            <Button onClick={onOpenOrderModal}>Оформить заказ</Button>
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
                  <Link
                    className={cls.title}
                    to={`/products/${product.id}`}
                  >{product.title}</Link>
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
                        onClick={() => onPlus(product)}
                      >
                        <AiOutlinePlus
                          width={24}
                          height={24}
                        />
                      </button>
                      <span>{product.quantity}</span>
                      <button
                        onClick={() => onMinus(product)}
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
