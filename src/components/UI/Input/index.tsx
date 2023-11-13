import React, { forwardRef, InputHTMLAttributes } from 'react'
import { FieldError } from 'react-hook-form'

import cn from 'classnames'

import cls from './styles.module.scss'

interface InputDefaultProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string
  error?: FieldError
  className?: string
}

const InputDefault: React.ForwardRefRenderFunction<HTMLInputElement, InputDefaultProps> = (
  {
    label, error, id, className, ...rest
  },
  ref,
) => (
  <div className={cls.container}>
    <label className={cls.label} htmlFor={id}>
      {label}
    </label>

    <input
      ref={ref}
      id={id}
      className={cn(cls.input, { [cls.errorBorder]: !!error }, className)}
      {...rest}
    />

    <span className={cls.errorMessage}>{error && error.message}</span>
  </div>
)

export default forwardRef<HTMLInputElement, InputDefaultProps>(InputDefault)
