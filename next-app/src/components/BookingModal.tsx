import Modal from './Modal'
import BookingForm from './BookingForm'
import styles from './Modal.module.css'

type Props = {
  open: boolean
  onClose: () => void
}

export default function BookingModal({ open, onClose }: Props) {
  if (!open) return null

  const handleSuccess = () => {
    // Track Meta Pixel Lead event
    if (typeof window !== 'undefined' && (window as any).coraTrackLead) {
      (window as any).coraTrackLead()
    }
    onClose()
  }

  return (
    <Modal onClose={onClose}>
      <h3 className={styles.heading}>Book Your Free Demo Review</h3>
      <p className={styles.subheading}>
        No credit card required • Free Google Meet demonstration
      </p>
      <BookingForm onSuccess={handleSuccess} />
    </Modal>
  )
}
