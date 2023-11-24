import React from 'react'
import { useMediaQuery } from 'react-responsive'
import { Link, useLocation } from 'react-router-dom'
import { Link as ScrollLink } from 'react-scroll'

import Logo from 'assets/logo.png'
import { axiosRequest } from 'configs/api'
import { PiShoppingCartLight } from 'react-icons/pi'
import { CategoryTypes } from 'types/categories'

import { CategoriesSkeleton } from './components/CategoriesSkeleton'
import { MobileHeader } from './components/MobileHeader'
import cls from './styles.module.scss'

export const Header = () => {
  const [isLoading, setIsLoading] = React.useState(false)
  const [categories, setCategories] = React.useState<CategoryTypes.Raw[] | null>(null)

  const isMobileScreen = useMediaQuery({
    query: '(min-width: 320px) and (max-width: 640px)',
  })

  const location = useLocation()

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

  if (isMobileScreen) return <MobileHeader categories={categories} />

  return (
    <div className={cls.root}>
      <Link
        to="/"
        className={cls.logo}
      >
        <img
          src={Logo}
          alt="logo"
        />
      </Link>

      <div className={cls.categories}>
        {
          isLoading
            ? <CategoriesSkeleton />
            : (
              <>
                {
                  location.pathname === '/'
                    ? (
                      <ScrollLink
                        to="sale"
                        spy={true}
                        smooth={true}
                        offset={-70}
                        duration={500}
                      >Акции</ScrollLink>
                    )
                    : (
                      <Link to="/">Акции</Link>
                    )
                }

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
