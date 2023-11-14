import React from 'react'
import { Link as ScrollLink } from 'react-scroll'

import { PageLayout } from 'elements/layouts/PageLayout'

import cls from './styles.module.scss'

export const SpecialOffer = () => {
  return (
    <PageLayout className={cls.root}>
      <div
        className={cls.bgContent}
        style={{
          backgroundImage: 'url(\'/assets/spec-offer-bg.png\')',
        }}
      >
        <div className={cls.row}>
          <div>
            <h1 className={cls.title}>Специальные предложения</h1>
            <p className={cls.text}>
              <span>на строительные материалы</span>
              <span>и товары для ремонта</span>
            </p>
          </div>

          <div>
            <ScrollLink
              to="popular"
              spy={true}
              smooth={true}
              offset={-70}
              duration={500}
              className={cls.moreBtn}
            >Подробнее</ScrollLink>
          </div>
        </div>
      </div>
    </PageLayout>
  )
}
