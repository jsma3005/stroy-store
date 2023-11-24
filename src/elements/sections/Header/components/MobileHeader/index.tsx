import React from 'react'
import { Link } from 'react-router-dom'
import { Link as ScrollLink } from 'react-scroll'

import { useDisclosure } from '@chakra-ui/react'
import Logo from 'assets/logo.png'
import cn from 'classnames'
import { IoIosMenu, IoMdClose } from 'react-icons/io'
import { PiShoppingCartLight } from 'react-icons/pi'
import { CategoryTypes } from 'types/categories'

import { MobileCategoriesSkeleton } from '../MobileCategoriesSkeleton'

import cls from './styles.module.scss'

interface Props {
  categories: CategoryTypes.Raw[] | null
  isCategoriesLoading: boolean
}

export const MobileHeader = ({
  categories,
  isCategoriesLoading,
}: Props) => {
  const { isOpen, onOpen, onClose } = useDisclosure()

  return (
    <div
      className={cls.root}
      id="header"
    >
      <Link
        to="/"
        className={cls.logo}
      >
        <img
          src={Logo}
          alt="logo"
        />
      </Link>

      <IoIosMenu
        className={cls.menuBtn}
        onClick={onOpen}
      />

      <div className={cn(cls.menu, { [cls.isOpened]: isOpen })}>
        <div className={cls.header}>
          <IoMdClose
            className={cls.closeIcon}
            onClick={onClose}
          />
        </div>

        <ul className={cls.categoriesList}>
          {
            isCategoriesLoading
              ? (
                <MobileCategoriesSkeleton />
              )
              : (
                <>
                  <li onClick={onClose}>
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
                  </li>
                  <li onClick={onClose}>
                    <Link
                      to="/wallpapers"
                    >Обои</Link>
                  </li>
                  {
                    categories?.map(({ id, title }) => (
                      <li
                        key={id}
                        onClick={onClose}
                      >
                        <Link
                          key={id}
                          to={'/categories/' + id}
                        >{title}</Link>
                      </li>
                    ))
                  }

                  <li
                    className={cls.cart}
                    onClick={onClose}
                  >
                    <Link
                      to="/cart"
                    >
                      <PiShoppingCartLight
                        color="#5D6066"
                      />
                      <span>Корзина</span>
                    </Link>
                  </li>
                </>
              )
          }
        </ul>
      </div>
    </div>
  )
}
