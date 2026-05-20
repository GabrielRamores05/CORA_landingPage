import styles from './TransformationSection.module.css'

const cards = [
  {
    oldLabel: 'The Old Way',
    oldTitle: '15+ Fragmented Excel Files',
    newLabel: 'The CORA Standard',
    newTitle: '1 Centralized General Ledger',
  },
  {
    oldLabel: 'The Old Way',
    oldTitle: '2-Week Audit Preparation',
    newLabel: 'The CORA Standard',
    newTitle: 'One-Click CDA Compliance',
  },
  {
    oldLabel: 'The Old Way',
    oldTitle: 'Manual Loan Aging & Penalties',
    newLabel: 'The CORA Standard',
    newTitle: 'Real-Time Collection Dashboards',
  },
]

export default function TransformationSection(){
  return (
    <section className={styles.shiftSection} id="transformation">
      <div className={`${styles.inner} container`}>
        <div className={styles.header}>
          <span className={styles.label}>A Better Way Forward</span>
          <h2 className={styles.title}>See How CORA Simplifies Your Daily Operations</h2>
          <p className={styles.description}>Your cooperative deserves tools designed for the way you actually work. Here's what changes when CORA supports your team.</p>
        </div>
        <div className={styles.cards}>
          {cards.map((card) => (
            <article key={card.oldTitle} className={styles.card}>
              <div className={styles.oldBlock}>
                <span>{card.oldLabel}</span>
                <h4>{card.oldTitle}</h4>
              </div>
              <div className={styles.divider}>
                <div className={styles.line} />
                <div className={styles.arrow}>→</div>
              </div>
              <div className={styles.newBlock}>
                <span>{card.newLabel}</span>
                <h4>{card.newTitle}</h4>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
