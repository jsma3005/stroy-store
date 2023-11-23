import React from 'react'
import { Map, Placemark, YMaps } from 'react-yandex-maps'

import { PageLayout } from 'elements/layouts/PageLayout'

import cls from './styles.module.scss'

export const Contacts = () => {
  return (
    <PageLayout className={cls.root}>
      <h2 className={cls.title}>Контакты</h2>

      <div className={cls.mapContainer}>
        <YMaps>
          <Map
            defaultState={{ center: [40.543983, 72.786113], zoom: 18 }}
            className={cls.map}
          >
            <Placemark geometry={[40.543914, 72.785915]} />
          </Map>

        </YMaps>
      </div>

      <div className={cls.companyInfo}>
        <p>&quot;Фантазия – здесь рождаются ваши уникальные идеи. Дизайн, который отражает вашу индивидуальность, в каждой детали и обои на каждой стене.&quot;</p>

      </div>
    </PageLayout>
  )
}
