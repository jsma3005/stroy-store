import React from 'react'
import { Link } from 'react-router-dom'
import { Link as ScrollLink } from 'react-scroll'

import { useDisclosure } from '@chakra-ui/react'
import Logo from 'assets/logo.png'
import cn from 'classnames'
import { IoIosMenu, IoMdClose } from 'react-icons/io'
import { CategoryTypes } from 'types/categories'

import cls from './styles.module.scss'

interface Props {
  categories: CategoryTypes.Raw[] | null
}

export const MobileHeader = ({ categories }: Props) => {
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
        </ul>
      </div>
    </div>
  )
}
