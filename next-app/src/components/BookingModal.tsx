import Modal from './Modal'
import BookingForm from './BookingForm'
import styles from './Modal.module.css'

type Props = {
  open: boolean
  onClose: () => void
}

export default function BookingModal({ open, onClose }: Props) {
  if (!open) return null
  return (
    <Modal onClose={onClose}>
      <h3 className={styles.heading}>Schedule a Free Consultation &amp; Demo</h3>
      <p className={styles.subheading}>
        Let&apos;s talk about your cooperative&apos;s challenges, CISA/CAIS compliance needs, and how our team can help migrate your records.
      </p>
      <BookingForm onSuccess={onClose} />
    </Modal>
  )
}
