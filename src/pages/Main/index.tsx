import React from 'react'

import { SpecialOffer } from 'pages/Main/components/SpecialOffer'

import { AboutSection } from './components/About'
import { Contacts } from './components/Contacts'
import { PopularProductsSection } from './components/PopularProducts'
import { SalesSection } from './components/Sales'

export const MainPage = () => {
  React.useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    })
  }, [])

  return (
    <div>
      <SpecialOffer />
      <SalesSection />
      <PopularProductsSection />
      <AboutSection />
      <Contacts />
    </div>
  )
}
