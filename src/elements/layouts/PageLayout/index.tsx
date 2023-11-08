import React from 'react'

import cn from 'classnames'

import cls from './styles.module.scss'

interface Props {
  children: React.ReactNode
  className?: string
}

export const PageLayout = ({ children, className }: Props) => {
  return (
    <div className={cn(cls.root, className)}>
      {children}
    </div>
  )
}
