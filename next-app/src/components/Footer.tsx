import styles from './Footer.module.css'

type Props = {
  onOpenBooking?: () => void
}

export default function Footer({ onOpenBooking }: Props){
  return (
    <footer className={styles.footer}>
      <div className={`${styles.inner} container`}>
        <div className={styles.grid}>
          {/* Brand Column */}
          <div className={styles.brandCol}>
            <div className={styles.brand}>CORA</div>
            <p className={styles.subtitle}>Cooperative Operations &amp; Records Automation</p>
            <p className={styles.tagline}>A supportive digitalization partner for Philippine cooperatives.</p>
            <p className={styles.company}>By Edgepoint Solutions, Inc.</p>
          </div>

          {/* Quick Links Column */}
          <div className={styles.linksCol}>
            <h4 className={styles.colTitle}>Explore</h4>
            <ul className={styles.linksList}>
              <li><a href="#features">Features</a></li>
              <li><a href="#why-choose-cora">Why Choose CORA</a></li>
              <li><a href="#demo">Live Demos</a></li>
              <li><a href="#resources">Resources</a></li>
            </ul>
          </div>

          {/* Contact & Support Column */}
          <div className={styles.contactCol}>
            <h4 className={styles.colTitle}>Support &amp; Consultation</h4>
            <p className={styles.contactText}>Have questions about CDA compliance, CISA, or your data migration?</p>
            {onOpenBooking && (
              <button type="button" onClick={onOpenBooking} className={styles.consultationBtn}>
                Request Free Consultation
              </button>
            )}
            <div className={styles.socials}>
              <a href="https://facebook.com" target="_blank" rel="noreferrer" className={styles.socialLink}>
                Follow us on Facebook
              </a>
            </div>
          </div>
        </div>

        <div className={styles.bottom}>
          <p>&copy; {new Date().getFullYear()} Edgepoint Solutions, Inc. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}
