import React, { useEffect } from 'react'
// import but don't use for stylesheet placement
// @ts-ignore
import ModalStyles from './Modal.module.css'
import { Button, Space } from './../../../index'
import { AnimationTailwindClasses } from '../../types'
import * as Dialog from '@radix-ui/react-dialog'
import styleHandler from '../../lib/theme/styleHandler'

export type ModalProps = RadixProps & Props

interface RadixProps
  extends Dialog.DialogProps,
    Pick<
      Dialog.DialogContentProps,
      | 'onOpenAutoFocus'
      | 'onCloseAutoFocus'
      | 'onEscapeKeyDown'
      | 'onPointerDownOutside'
      | 'onInteractOutside'
    > {}

interface Props {
  children?: React.ReactNode
  customFooter?: React.ReactNode
  closable?: boolean
  description?: string
  hideFooter?: boolean
  alignFooter?: 'right' | 'left'
  layout?: 'horizontal' | 'vertical'
  icon?: React.ReactNode
  loading?: boolean
  onCancel?: any
  cancelText?: string
  onConfirm?: any
  confirmText?: string
  showIcon?: boolean
  footerBackground?: boolean
  title?: string | React.ReactNode
  variant?: 'danger' | 'warning' | 'success'
  visible: boolean
  size?: 'tiny' | 'small' | 'medium' | 'large' | 'xlarge' | 'xxlarge'
  style?: React.CSSProperties
  overlayStyle?: React.CSSProperties
  contentStyle?: React.CSSProperties
  className?: string
  overlayClassName?: string
  transition?: AnimationTailwindClasses
  transitionOverlay?: AnimationTailwindClasses
  triggerElement?: React.ReactNode
  header?: React.ReactNode
}

const Modal = ({
  children,
  customFooter = undefined,
  closable,
  description,
  hideFooter = false,
  alignFooter = 'left',
  layout = 'horizontal',
  loading = false,
  cancelText = 'Cancel',
  onConfirm = () => {},
  onCancel = () => {},
  confirmText = 'Confirm',
  showIcon = false,
  title,
  footerBackground,
  icon,
  variant = 'success',
  visible = false,
  size = 'large',
  style,
  overlayStyle,
  contentStyle,
  className = '',
  overlayClassName,
  triggerElement,
  header,
  ...props
}: ModalProps) => {
  const [open, setOpen] = React.useState(visible ? visible : false)
  const __styles = styleHandler('modal')

  useEffect(() => {
    setOpen(visible)
  }, [visible])

  const footerContent = customFooter ? (
    customFooter
  ) : (
    <div
      className="flex w-full space-x-2"
      style={{
        width: '100%',
        justifyContent:
          layout === 'vertical' ? 'center' : alignFooter === 'right' ? 'flex-end' : 'flex-start',
      }}
    >
      <Button type="default" onClick={onCancel} disabled={loading}>
        {cancelText}
      </Button>
      <Button onClick={onConfirm} loading={loading} danger={variant === 'danger'}>
        {confirmText}
      </Button>
    </div>
  )

  function handleOpenChange(open: boolean) {
    if (visible !== undefined && !open) {
      // controlled component behaviour
      onCancel()
    } else {
      // un-controlled component behaviour
      setOpen(open)
    }
  }

  return (
    <Dialog.Root open={open} onOpenChange={handleOpenChange}>
      {triggerElement && <Dialog.Trigger>{triggerElement}</Dialog.Trigger>}
      <Dialog.Portal>
        <Dialog.Overlay className={__styles.overlay} />
        <Dialog.Overlay className={__styles.scroll_overlay}>
          <Dialog.Content
            className={[__styles.base, __styles.size[size]].join(' ')}
            onInteractOutside={props.onInteractOutside}
          >
            {header && <div className={__styles.header}>{header}</div>}
            {children}
            {!hideFooter && <div className={__styles.footer}>{footerContent}</div>}
          </Dialog.Content>
        </Dialog.Overlay>
      </Dialog.Portal>
    </Dialog.Root>
  )
}

function Content({ children }: { children: React.ReactNode }) {
  const __styles = styleHandler('modal')
  return <div className={__styles.content}>{children}</div>
}

export function Separator() {
  const __styles = styleHandler('modal')
  return <div className={__styles.separator}></div>
}

Modal.Content = Content
Modal.Separator = Separator
export default Modal
