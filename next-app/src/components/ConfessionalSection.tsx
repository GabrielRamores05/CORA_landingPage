import styles from './ConfessionalSection.module.css'
import { Check } from '@phosphor-icons/react'

const items = [
  { bold: 'Easing administrative fatigue:', rest: ' Giving your tellers and bookkeepers intuitive tools so they can finish their tasks within regular hours and spend evenings with their families.' },
  { bold: 'Fast member responses:', rest: ' Accessing savings and loan balances instantly so members can get immediate updates, building deeper trust in the community.' },
  { bold: 'Stress-free compliance:', rest: ' Generating Cooperative Development Authority (CDA) reports like the CISA and CAIS automatically, giving your treasurer peace of mind during audit seasons.' },
  { bold: 'Streamlined surplus allocations:', rest: ' Computing year-end dividends and patronage refunds in clicks, ensuring fast, error-free distributions for everyone.' },
  { bold: 'Consolidated multi-branch tracking:', rest: ' Getting a clear, real-time overview of collections and operations across all locations without manual consolidation.' },
]

type Props = {
  onOpenBooking: () => void
}

export default function ConfessionalSection({ onOpenBooking }: Props){
  return (
    <section className={styles.confessionalSection} id="challenges">
      <div className={`${styles.inner} container`}>
        <div className={styles.left}>
          <span className={styles.eyebrow}>We are here to help</span>
          <h2 className={styles.headline}>We understand the unique responsibility of running a cooperative.</h2>
          <p className={styles.sub}>Managing members, loans, and statutory compliance takes immense dedication. Your team works tirelessly to support your community — and we are here to support them with automation that lightens the load.</p>
          <button type="button" className="btn-primary" onClick={onOpenBooking}>
            <span>Review your operations with us →</span>
          </button>
        </div>
        <div className={styles.right}>
          {items.map((item) => (
            <div key={item.bold} className={styles.item}>
              <div className={styles.arrow}>
                <Check size={14} weight="bold" />
              </div>
              <p><strong>{item.bold}</strong>{item.rest}</p>
            </div>
          ))}
          <div className={styles.resolve}>
            <strong>Let&apos;s make daily operations simpler and more rewarding for your team.</strong> CORA is here to support your cooperative&apos;s digitalization journey.
          </div>
        </div>
      </div>
    </section>
  )
}
