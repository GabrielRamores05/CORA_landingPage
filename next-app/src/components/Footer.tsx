import styles from './Footer.module.css'

type Props = {
  onOpenBooking?: () => void
}

export default function Footer({ onOpenBooking }: Props){
  const handleRegisterClick = () => {
    const registrationForm = document.getElementById('registration-form')
    if (registrationForm) {
      registrationForm.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <footer className={styles.footer}>
      <div className={`${styles.inner} container`}>
        <div className={styles.urgentMessage}>
          <p className={styles.urgentText}>⏰ Registration closes tonight. Don't let your cooperative fall behind using manual spreadsheets.</p>
          <button 
            type="button" 
            className={styles.urgentButton}
            onClick={handleRegisterClick}
          >
            Secure Your Seat Now
          </button>
        </div>

        <div className={styles.divider}></div>

        <div className={styles.grid}>
          <div className={styles.brandCol}>
            <div className={styles.brand}>CORA</div>
            <p className={styles.subtitle}>Cooperative Operations &amp; Records Application</p>
            <p className={styles.company}>By Edgepoint Solutions, Inc.</p>
          </div>

          <div className={styles.contactCol}>
            <h4 className={styles.colTitle}>Contact</h4>
            <p className={styles.contactText}>
              Email: <a href="mailto:edgepoint.solutions.inc@gmail.com" className={styles.actionLink}>edgepoint.solutions.inc@gmail.com</a>
            </p>
            <p className={styles.contactText}>
              Mobile: <a href="tel:+639628073120" className={styles.actionLink}>0962 807 3120</a>
            </p>
          </div>
        </div>

        <div className={styles.bottom}>
          <p>Copyright © 2026 EDGEPOINT SOLUTIONS, INC. | DUNS Number: 65-958-3617</p>
        </div>
      </div>
    </footer>
  )
}
