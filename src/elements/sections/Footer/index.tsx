import React from 'react'
import { Link } from 'react-router-dom'

import { FaLocationDot } from 'react-icons/fa6'
import { FiMail } from 'react-icons/fi'

import cls from './styles.module.scss'

export const Footer = () => {
  return (
    <div className={cls.root}>
      <div className={cls.footer}>
        <div className={cls.content}>
          <Link
            to="/"
            className={cls.logo}
          >
            <img
              src="/assets/logo-white.png"
              alt="logo"
            />
          </Link>

          <ul className={cls.categoriesList}>
            <li>
              <Link
                to="/"
              >
                Корзина
              </Link>
            </li>

            <li>
              <Link
                to="/"
              >
                Каталог
              </Link>
            </li>

            <li>
              <Link
                to="/"
              >
                Контакты
              </Link>
            </li>
          </ul>

          <ul className={cls.contactsList}>
            <li>
              <a
                href="mailto:example@example.com"
              >
                <FiMail />
                <span>info@stroykastore.ru</span>
              </a>
            </li>

            <li>
              <a
                href="https://2gis.kg/bishkek"
              >
                <FaLocationDot />
                <span>Москва, ул. Камушкина 10</span>
              </a>
            </li>
          </ul>

        </div>
      </div>
    </div>
  )
}
