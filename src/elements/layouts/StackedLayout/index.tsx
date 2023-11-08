import React from 'react'

import { Footer } from 'elements/sections/Footer'
import { Header } from 'elements/sections/Header'

interface Props {
  children: React.ReactNode
}

export const StackedLayout: React.FC<Props> = ({
  children,
}) => {
  return (
    <div className="w-full">
      <Header />
      { children }
      <Footer />
    </div>
  )
}
