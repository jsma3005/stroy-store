import React from 'react'
import { Controller, useForm } from 'react-hook-form'
import InputMask from 'react-input-mask'

import { Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay } from '@chakra-ui/react'
import { Button } from 'components/UI/Button'
import Input from 'components/UI/Input'
import { axiosRequest } from 'configs/api'
import { CartTypes } from 'types/cart'

import cls from './styles.module.scss'

interface Props {
  isOpen: boolean
  onClose: () => void
  onOpenSuccessModal: () => void
  setIsWorking: React.Dispatch<React.SetStateAction<boolean | null>>
}

interface Form {
  first_name: string
  last_name: string
  phone_number: string
  email: string
  purchases: CartTypes.Raw[]
}

const required = 'Обязательное поле'
const emailRegex = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,}$/

export const OrderModal = ({
  isOpen,
  onClose,
  onOpenSuccessModal,
  setIsWorking,
}: Props) => {
  const {
    register,
    handleSubmit,
    control,
    formState: {
      errors,
    },
    reset,
  } = useForm<Form>()

  const [isLoading, setIsLoading] = React.useState(false)

  const onSubmit = React.useCallback(async (body: Form) => {
    const cart: CartTypes.Raw[] = JSON.parse(localStorage.getItem('cart') as string) || []
    setIsLoading(true)

    try {
      const { data } = await axiosRequest.post<{
        status: string
        is_working: boolean
      }>('/orders/', {
        ...body,
        purchases: cart.map(product => ({
          product: product.id,
          quantity: product.quantity,
          wallpaper: null,
        })),
      })

      setIsWorking(data.is_working)

      onOpenSuccessModal()

      reset({
        email: '',
        first_name: '',
        last_name: '',
        phone_number: '',
      })

      localStorage.removeItem('cart')

      onClose()
    } catch (e) {
      console.log(e)
    } finally {
      setIsLoading(false)
    }
  }, [onClose, onOpenSuccessModal, reset, setIsWorking])

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
    >
      <ModalOverlay />
      <ModalContent
        className={cls.modal}
      >
        <ModalHeader className={cls.title}>Оформление заказа</ModalHeader>
        <ModalCloseButton />
        <ModalBody className={cls.modalBody}>
          <Input
            label="Имя"
            placeholder="Дастан"
            error={errors.first_name}
            {...register('first_name', {
              required: 'Обязательное поле',
            })}
          />

          <Input
            label="Фамилия"
            placeholder="Кубатбаев"
            error={errors.first_name}
            {...register('last_name', {
              required,
            })}
          />

          <Input
            label="Email"
            placeholder="example@example.com"
            error={errors.email}
            {...register('email', {
              required,
              pattern: {
                value: emailRegex,
                message: 'Введите корректную почту',
              },
            })}
          />

          <Controller
            name="phone_number"
            rules={{
              required,
            }}
            control={control}
            defaultValue=""
            render={({ field }) => (
              <InputMask
                onChange={field.onChange}
                value={field.value}
                mask={'+\\9\\96 (999) 99-99-99'}
              >
                <Input
                  label="Номер телефона"
                  type="tel"
                  error={errors.phone_number}
                  placeholder="+996 (550) 01-02-03"
                />
              </InputMask>
            )}
          />
        </ModalBody>

        <ModalFooter className={cls.modalFooter}>
          <Button
            onClick={handleSubmit(onSubmit)}
            className={cls.btn}
            disabled={isLoading}
          >
            Отправить
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  )
}
