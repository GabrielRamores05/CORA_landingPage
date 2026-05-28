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
          {/* Left Column: Content */}
          <div className={styles.heroLeft}>
            <span className={styles.heroCategoryTag}>⏰ LIMITED TIME EVENT</span>
            <h1 className={styles.heroTitle}>
              Exclusive Live Demo:<br />
              <span className={styles.highlight}>Automating Your Co-op's CISA & CAIS Compliance</span>
            </h1>
            <p className={styles.heroSubtitle}>
              Happening Tomorrow: Friday, May 29 | Stop losing sleep over manual ledgers and failed audits. Join our live, step-by-step system walkthrough tomorrow and see how CORA eliminates Excel errors and automates your mandatory reports in minutes.
            </p>

            <CountdownTimer />
            
            <button type="button" className={`${styles.heroCta} ${styles.heroCtaPulse}`} onClick={onOpenBooking}>
              SECURE MY LIVE DEMO SEAT
            </button>

            <div className={styles.heroTrustLine}>
              <span>✓ See live CISA & CAIS report generation</span>
              <span>✓ Watch real Excel data migration in action</span>
              <span>✓ Get your registration confirmation instantly</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
