import styles from './Hero.module.css'

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
            <span className={styles.heroCategoryTag}>Cooperative Operations Automation</span>
            <h1 className={styles.heroTitle}>
              A Supportive Partner For<br />
              <span className={styles.highlight}>Your Cooperative</span>
            </h1>
            <p className={styles.heroSubtitle}>
              CORA provides warm, supportive digitalization and applied automation built specifically to ease your operations. Manage members, savings, and loans effortlessly, while we handle the entire migration for you.
            </p>

            <div className={styles.heroUrgencyBadge}>
              <span className={styles.urgencyDot}></span>
              Built-in CISA &amp; CAIS Report Generation System
            </div>
            
            <button type="button" className={`${styles.heroCta} ${styles.heroCtaPulse}`} onClick={onOpenBooking}>
              BOOK A DEMO NOW
            </button>

            <div className={styles.heroTrustLine}>
              <span>✓ Complete CISA &amp; CAIS automated exports</span>
              <span>✓ We clean &amp; migrate your Excel data</span>
              <span>✓ Supportive personal onboarding &amp; training</span>
            </div>
          </div>

          {/* Right Column: Founder Image */}
          <div className={styles.heroRight}>
            <div className={styles.founderCard}>
              <div className={styles.founderImageWrapper}>
                <img src="/images/Hero1.png" alt="Joannah Ramores, Founder of CORA" />
                <span className={styles.founderBadge}>FOUNDER</span>
                <div className={styles.imageGlow}></div>
              </div>
              <div className={styles.founderInfo}>
                <p className={styles.founderQuote}>
                  &ldquo;We are here to walk with you through every step of digitalization.&rdquo; — Joannah Ramores, Founder
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
