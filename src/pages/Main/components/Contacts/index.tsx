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
        <h2 className={cls.title}>ООО «СтройкаСтор»</h2>

        <div className={cls.row}>
          <div className={cls.address}>
            <p>115114, г. Москва, Дербеневская набережная, д. 7, стр. 8</p>

            <p>Павелецкая</p>
            <p>Автобусы 13, 106, 158, 184, 632</p>
            <p>Остановка «Дербеневская наб., д. 7»</p>
          </div>

          <div className={cls.bankData}>
            <p>ОГРН: 1047796688554</p>
            <p>ИНН 7703528301</p>
            <p>КПП 774850001</p>
            <p>ОКТМО 45380000</p>
            <p>ОГРН 1047796688554</p>
            <p>Расчетный рублевый счет: 40702810900001403352</p>
            <p>Банк: АО «Сбербанк» г. Москва</p>
            <p>Корреспондентский счет: 30101810200000000700</p>
            <p>БИК: 044525700</p>
          </div>
          <div className={cls.supports}>
            <p>Поддержка клиентов</p>
            <p>info@stroykastore.ru</p>
          </div>
        </div>

      </div>
    </PageLayout>
  )
}
