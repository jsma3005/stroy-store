import React from 'react'
import { useNavigate } from 'react-router-dom'

import { Modal, ModalBody, ModalContent, ModalFooter, ModalOverlay } from '@chakra-ui/react'
import { Button } from 'components/UI/Button'
import { BsPatchCheck } from 'react-icons/bs'

import cls from './styles.module.scss'

interface Props {
  isOpen: boolean
  onClose: () => void
  isWorking: boolean | null
}

export const SuccessModal = ({
  isOpen,
  onClose,
  isWorking,
}: Props) => {
  const navigate = useNavigate()

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      closeOnEsc={false}
      closeOnOverlayClick={false}
    >
      <ModalOverlay />
      <ModalContent
        className={cls.modal}
      >
        <ModalBody className={cls.modalBody}>
          <div className={cls.iconContainer}>
            <BsPatchCheck />
          </div>

          <h2>Спасибо</h2>
          <p>{isWorking ? 'Ваша заявка принята. Мы свяжемся с вами в ближайшее время.' : 'Ваша заявка принята. Мы свяжемся с вами рабочее время.'}</p>
        </ModalBody>

        <ModalFooter className={cls.modalFooter}>
          <Button
            className={cls.btn}
            onClick={() => navigate('/')}
          >
            Перейти на главную
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  )
}
