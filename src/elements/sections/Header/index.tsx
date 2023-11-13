import React from 'react'
import { Link } from 'react-router-dom'

import { axiosRequest } from 'configs/api'
import { PiShoppingCartLight } from 'react-icons/pi'
import { CategoryTypes } from 'types/categories'

import { CategoriesSkeleton } from './components/CategoriesSkeleton'
import cls from './styles.module.scss'

export const Header = () => {
  const [isLoading, setIsLoading] = React.useState(false)
  const [categories, setCategories] = React.useState<CategoryTypes.Raw[] | null>(null)

  const getCategories = React.useCallback(async () => {
    setIsLoading(true)

    try {
      const { data } = await axiosRequest.get<CategoryTypes.Raw[]>('/categories')

      if (data) {
        setCategories(data)
      }
    } catch (e: any) {
      console.log(e)
    } finally {
      setIsLoading(false)
    }
  }, [])

  React.useEffect(() => {
    getCategories()
  }, [getCategories])

  return (
    <div className={cls.root}>
      <Link
        to="/"
        className={cls.logo}
      >
        <img
          src="/assets/logo.png"
          alt="logo"
        />
      </Link>

      <div className={cls.categories}>
        {
          isLoading
            ? <CategoriesSkeleton />
            : (
              <>
                <Link
                  to={{
                    hash: 'sale',
                    pathname: '/',
                  }}
                >Акции</Link>
                <Link
                  to="/wallpapers"
                >Обои</Link>
                {
                  categories?.map(({ id, title }) => (
                    <Link
                      key={id}
                      to={'/categories/' + id}
                    >{title}</Link>
                  ))
                }</>
            )
        }

      </div>

      <Link
        to="/cart"
        className={cls.cart}
      >
        <PiShoppingCartLight
          color="#5D6066"
        />
        <span>Корзина</span>
      </Link>
    </div>
  )
}
