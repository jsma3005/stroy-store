import React from 'react'

import { PageLayout } from 'elements/layouts/PageLayout'

import cls from './styles.module.scss'

export const AboutSection = () => {
  return (
    <PageLayout className={cls.root}>
      <div
        className={cls.bgContainer}
        style={{
          backgroundImage: 'url(\'/assets/about-bg.png\')',
        }}
      >
        <div className={cls.content}>
          <h2 className={cls.title}>О компании</h2>

          <p className="mb-3">В СтройкаСтор вы всегда можете купить все необходимые товары для ремонта дома и дачи. Хотите сделать ремонт в квартире? Строите загородный дом? Используйте строительные и отделочные материалы из нашего каталога.</p>

          <p>
            Быстрая доставка строительных товаров по низким ценам сделает ваши покупки более приятными. Ремонт может стоить дешево, если делать его с нами. Для вас всегда в наличии более 30 000 товаров для строительства по низким ценам каждый день. СтройкаСтор — это широкий ассортимент товаров для дома и ремонта недорого; Возможность заказать строительные и отделочные материалы для дома и дачи.
          </p>
        </div>
      </div>
    </PageLayout>
  )
}
