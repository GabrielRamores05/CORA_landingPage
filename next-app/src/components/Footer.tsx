import styles from './Footer.module.css'

type Props = {
  onOpenBooking?: () => void
}

export default function Footer({ onOpenBooking }: Props){
  return (
    <footer className={styles.footer}>
      <div className={`${styles.inner} container`}>
        <div className={styles.grid}>
          <div className={styles.brandCol}>
            <div className={styles.brand}>CORA</div>
            <p className={styles.subtitle}>Cooperative Operations &amp; Records Application</p>
            <p className={styles.tagline}>A supportive digitalization partner for Philippine cooperatives.</p>
            <p className={styles.company}>By Edgepoint Solutions, Inc.</p>
          </div>

          <div className={styles.linkCol}>
            <h4 className={styles.colTitle}>Pages</h4>
            <ul className={styles.linksList}>
              <li><a href="#home">Home</a></li>
              <li><a href="#platform">Platform</a></li>
              <li><a href="#implementation">Implementation</a></li>
              <li><a href="#collections">Collections</a></li>
            </ul>
          </div>

          <div className={styles.linkCol}>
            <h4 className={styles.colTitle}>More Pages</h4>
            <ul className={styles.linksList}>
              <li><a href="#events">Events</a></li>
              <li><a href="#onboarding">Onboarding</a></li>
              <li><a href="#online-demo">Online Demo</a></li>
              <li><a href="#contact">Contact</a></li>
            </ul>
          </div>

          <div className={styles.contactCol}>
            <h4 className={styles.colTitle}>Contact</h4>
            <p className={styles.contactText}>
              Gmail: <a href="mailto:edgepoint.solutions.inc@gmail.com" className={styles.actionLink}>edgepoint.solutions.inc@gmail.com</a>
            </p>
            <p className={styles.contactText}>
              Mobile no: <a href="tel:+639628073120" className={styles.actionLink}>0962 807 3120</a>
            </p>
            <p className={styles.contactText}>
              Facebook: <a href="https://www.facebook.com/Cora.ph.2026" target="_blank" rel="noreferrer" className={styles.actionLink}>https://www.facebook.com/Cora.ph.2026</a>
            </p>
          </div>

          <div className={styles.addressCol}>
            <h4 className={styles.colTitle}>Address</h4>
            <p className={styles.addressText}>Level 4, Nagaland E-Mall</p>
            <p className={styles.addressText}>Elias Angeles St., Naga City 4400</p>
            <p className={styles.addressText}>Camarines Sur, Bicol Region</p>
            <p className={styles.addressText}>Philippines</p>
          </div>
        </div>

        <div className={styles.bottom}>
          <p>Copyright © 2026 EDGEPOINT SOLUTIONS, INC. | DUNS Number: 65-958-3617</p>
        </div>
      </div>
    </footer>
  )
}
