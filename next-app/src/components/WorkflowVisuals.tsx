import styles from './WorkflowVisuals.module.css'
import Image from 'next/image'

const visuals = [
  {
    src: '/images/cora_member_records.png',
    alt: 'Member Records Workflow',
    title: 'Member Records Masterlist',
    desc: 'Centralized database to search, view, and manage profile balances, savings accounts, and active loans instantly.',
  },
  {
    src: '/images/cora_collections_dashboard.png',
    alt: 'Collections Dashboard Workflow',
    title: 'Collections Dashboard',
    desc: 'Real-time tracker showing daily deposits, cash-in points, and collections across branches.',
  },
  {
    src: '/images/cora_cooperative_reports.png',
    alt: 'Cooperative Reports Workflow',
    title: 'Cooperative Reports Hub',
    desc: 'Instantly generate CDA-compliant balance sheets, trial balances, and financial summaries in clicks, not days.',
  },
]

export default function WorkflowVisuals(){
  return (
    <section className={styles.workflowSection} id="workflow-visuals">
      <div className="container">
        <div className={styles.header}>
          <span className={styles.label}>Inside the System</span>
          <h2 className={styles.title}>Take a Look Inside CORA</h2>
          <p className={styles.description}>No complicated dashboards. Just clean, simple screens designed for tellers and accountants.</p>
        </div>
        <div className={styles.grid}>
          {visuals.map((visual) => (
            <article key={visual.title} className={styles.card}>
              <div className={styles.browserFrame}>
                <div className={styles.browserHeader}>
                  <div className={styles.browserDots}>
                    <span className={styles.dot}></span>
                    <span className={styles.dot}></span>
                    <span className={styles.dot}></span>
                  </div>
                  <div className={styles.browserUrlBar}>cora.coop/app/{visual.title.toLowerCase().replace(/\s+/g, '-')}</div>
                </div>
                <div className={styles.imageContainer}>
                  <Image src={visual.src} alt={visual.alt} className={styles.image} width={900} height={520} priority />
                </div>
              </div>
              <div className={styles.caption}>
                <h3>{visual.title}</h3>
                <p>{visual.desc}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
