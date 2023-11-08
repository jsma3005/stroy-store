import {
  ButtonHTMLAttributes, ForwardedRef, forwardRef, ReactNode,
} from 'react'

import cn from 'classnames'

import cls from './styles.module.scss'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement>{
  className?: string
  disabled?: boolean
  children: ReactNode
}

export const Button = forwardRef((props: ButtonProps, ref: ForwardedRef<HTMLButtonElement>) => {
  const {
    className,
    children,
    disabled,
    ...otherProps
  } = props

  return (
    <button
      type="button"
      className={cn(cls.root, className)}
      disabled={disabled}
      {...otherProps}
      ref={ref}
    >
      {children}
    </button>
  )
})
