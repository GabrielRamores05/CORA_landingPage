import styles from './Hero.module.css'
import CountdownTimer from './CountdownTimer'

type Props = {
  onOpenBooking: () => void
}

export default function Hero({ onOpenBooking }: Props){
  return (
    <section className={styles.hero} id="hero">
      <div className={`${styles.heroWrapper} container`}>
        <div className={styles.heroGrid}>
          <div className={styles.heroLeft}>
            <span className={styles.heroCategoryTag}>TOMORROW: LIVE CO-OP DEMO</span>
            <h1 className={styles.heroTitle}>
              Balance your books by 5:00 PM<br />
              <span className={styles.highlight}>without manual cross-checking.</span>
            </h1>
            <p className={styles.heroSubtitle}>
              Friday, May 29. See how CORA's real-time teller-to-ledger sync and 3-click CISA/CAIS exports eliminate Excel chaos. Stop stressing over CDA compliance penalties. Watch the exact process your co-op can use.
            </p>

            <CountdownTimer />
            
            <button type="button" className={`${styles.heroCta} ${styles.heroCtaPulse}`} onClick={onOpenBooking}>
              SECURE MY LIVE DEMO SEAT
            </button>

            <div className={styles.heroTrustLine}>
              <span>✓ Live walk-through of day-book balancing</span>
              <span>✓ See how reports get ready without extra Excel work</span>
              <span>✓ Receive the Google Meet link immediately</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
