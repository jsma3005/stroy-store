import React from 'react'
import { Link } from 'react-router-dom'

import cls from './styles.module.scss'

export const Footer = () => {
  return (
    <div
      className={cls.root}
      style={{
        backgroundImage: 'url(\'/assets/footerBg.jpg\')',
      }}
    >
      <div className={cls.footer}>
        <div className={cls.content}>
          <Link
            to="/"
            className={cls.logo}
          >
            <img
              src="assets/logo-white.png"
              alt="logo"
            />
          </Link>

          <div className={cls.info}>
            <p className={cls.contactsTitle}>КОНТАКТЫ</p>

            <p className={cls.contactsAddress}>
              <a
                href="https://go.2gis.com/c80ka"
                target="_blank"
                rel="noreferrer"
              >Кыргызстан, г.Ош, ул. Курманжан датка 421</a>
            </p>

            <ul className={cls.phoneNumbers}>
              <li>
                <a href="tel:+996998011010">+996 998 01 10 10</a>
              </li>
              <li>
                <a href="tel:+996708011010">+996 708 01 10 10</a>
              </li>
            </ul>

            <ul className={cls.socials}>
              <li>
                <a
                  href="https://www.instagram.com/fantasia_osh/"
                  target="_blank"
                  rel="noreferrer"
                >
                  <img src="assets/icons/instagram.svg" alt="Instagram" />
                </a>
              </li>
              <li>
                <a
                  href="https://www.facebook.com/profile.php?id=61551493614512"
                  target="_blank"
                  rel="noreferrer"
                >
                  <img src="assets/icons/facebook.svg" alt="Facebook" />
                </a>
              </li>
              <li>
                <a
                  href="wa.link/m1l27y"
                  target="_blank"
                  rel="noreferrer"
                >
                  <img src="assets/icons/whatsapp.svg" alt="WhatsApp" />
                </a>
              </li>
            </ul>

            <p className={cls.email}>
              <a href="mailto:fantasiadesign.kg@gmail.com">fantasiadesign.kg@gmail.com</a>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
