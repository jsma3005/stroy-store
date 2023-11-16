import React from 'react'
import { Link } from 'react-router-dom'

import { useDisclosure } from '@chakra-ui/react'
import { Button } from 'components/UI/Button'
import { PageLayout } from 'elements/layouts/PageLayout'
import { useCart } from 'hooks/useCart'
import { AiOutlinePlus, AiOutlineMinus } from 'react-icons/ai'
import { CartTypes } from 'types/cart'

import { OrderModal } from './components/OrderModal'
import { SuccessModal } from './components/SuccessModal'
import cls from './styles.module.scss'

export const CartPage = () => {
  const {
    productsCart,
    wallpapersCart,
    totalPrice,
    actions: {
      onMinusProduct,
      onMinusWallpaper,
      onPlusProduct,
      onPlusWallpaper,
      onDeleteProduct,
      onDeleteWallpaper,
      resetCart,
    },
  } = useCart()

  const [isWorking, setIsWorking] = React.useState<boolean | null>(null)

  React.useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    })
  }, [])

  const onResetCart = () => {
    const askReset = window.confirm('Вы действительно хотите очистить корзину?')

    if (!askReset) return

    resetCart()
  }

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
                <span>Количество продуктов</span>
                <span>{productsCart.length + wallpapersCart.length} шт.</span>
              </li>
              <li>
                <span>Товаров на сумму</span>
                <span>{totalPrice} СОМ</span>
              </li>
            </ul>
          </div>

          <div className={cls.actions}>
            <Button
              onClick={onOpenOrderModal}
              disabled={!(wallpapersCart.length + productsCart.length)}
            >Оформить заказ</Button>

            <Button
              onClick={onResetCart}
              disabled={!(wallpapersCart.length + productsCart.length)}
            >
              Очистить корзину
            </Button>
          </div>
        </div>

        <div className={cls.cartProducts}>
          { !(productsCart.length + wallpapersCart.length) && <h2 className={cls.emptyCart}>Ваша корзина пуста!</h2> }

          {
            productsCart.map(product => (
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
                            <span className={cls.salesPrice}>{(Number(product.price) - product.sale_price)} СОМ</span>
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
                        onClick={() => onPlusProduct(product as CartTypes.Product)}
                      >
                        <AiOutlinePlus
                          width={24}
                          height={24}
                        />
                      </button>
                      <span>{product.quantity}</span>
                      <button
                        onClick={() => onMinusProduct(product as CartTypes.Product)}
                      >
                        <AiOutlineMinus
                          width={24}
                          height={24}
                        />
                      </button>
                    </div>

                    <div className={cls.delete}>
                      <button onClick={() => onDeleteProduct(product as CartTypes.Product)}>Удалить товар</button>
                    </div>
                  </div>
                </div>
              </div>
            ))
          }
          {
            wallpapersCart.map(wallpaper => (
              <div
                key={wallpaper.id}
                className={cls.product}
              >
                <div className={cls.productImage}>
                  <img
                    src={wallpaper.images[0]?.image || 'https://www.salonlfc.com/wp-content/uploads/2018/01/image-not-found-scaled-1150x647.png'}
                    alt={wallpaper.title}
                  />
                </div>

                <div className={cls.info}>
                  <Link
                    className={cls.title}
                    to={`/wallpapers/${wallpaper.collection.brand}/${wallpaper.collection.id}/${wallpaper.id}`}
                  >{wallpaper.title}</Link>
                  <p className={cls.price}>
                    <span>{wallpaper.price} СОМ</span>
                  </p>

                  <div className={cls.actions}>
                    <div className={cls.quantityController}>
                      <button
                        onClick={() => onPlusWallpaper(wallpaper as CartTypes.Wallpaper)}
                      >
                        <AiOutlinePlus
                          width={24}
                          height={24}
                        />
                      </button>
                      <span>{wallpaper.quantity}</span>
                      <button
                        onClick={() => onMinusWallpaper(wallpaper as CartTypes.Wallpaper)}
                      >
                        <AiOutlineMinus
                          width={24}
                          height={24}
                        />
                      </button>
                    </div>

                    <div className={cls.delete}>
                      <button onClick={() => onDeleteWallpaper(wallpaper as CartTypes.Wallpaper)}>Удалить товар</button>
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
