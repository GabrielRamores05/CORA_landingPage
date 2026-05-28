import styles from './FeatureGrid.module.css'
import { FileText, UsersThree, UploadSimple, GearSix, CurrencyCircleDollar, SquaresFour } from '@phosphor-icons/react'

const cards = [
  { 
    icon: <FileText size={24} weight="duotone" />, 
    title: 'Live Demo 1: Generating a CDA-Compliant CISA Report in 3 Clicks', 
    desc: 'Watch how CORA generates your Cooperative Information System Archive (CISA) and Cooperative Auditing Information System (CAIS) reports automatically. Fully CDA-compliant and exported with a single click—no more midnight spreadsheet battles.' 
  },
  { 
    icon: <UsersThree size={24} weight="duotone" />, 
    title: 'Live Demo 2: Pulling Up Complete Member History in Seconds', 
    desc: "See how CORA pulls any member's complete history of Share Capital, Savings, and active Loans instantly. Physical folders and Excel chaos, gone." 
  },
  { 
    icon: <UploadSimple size={24} weight="duotone" />, 
    title: 'Live Demo 3: How We Migrate & Clean Your Legacy Data', 
    desc: 'Watch how we take your physical logs and Excel spreadsheets, clean them completely, structure them properly, and migrate them into CORA—so you never lose a record.' 
  },
  { 
    icon: <GearSix size={24} weight="duotone" />, 
    title: 'Live Demo 4: Tellers & Bookkeepers Finally Aligned', 
    desc: 'See real-time synchronization: every teller transaction automatically updates the General Ledger. Double-entry errors between front desk and accounting? History.' 
  },
  { 
    icon: <CurrencyCircleDollar size={24} weight="duotone" />, 
    title: 'Live Demo 5: Automatic Dividend Distribution in Minutes', 
    desc: 'Watch what used to take weeks of manual Excel formulas happen in minutes. Surplus allocations and statutory funds computed automatically—live.' 
  },
  { 
    icon: <SquaresFour size={24} weight="duotone" />, 
    title: 'Live Demo 6: Real-Time Multi-Branch Tracking', 
    desc: 'Monitor daily cash collections and teller remittances across all your locations in one dashboard—no more manual consolidation spreadsheets.' 
  },
]

export default function FeatureGrid(){
  return (
    <section className={styles.featuresSection} id="features">
      <div className="container">
        <div className={styles.featuresHeader}>
          <span className={styles.featuresLabel}>Tomorrow's Agenda</span>
          <h2 className={styles.featuresTitle}>What You Will See Live This Friday</h2>
          <p className={styles.featuresSubtitle}>Six live demonstrations showing exactly how CORA eliminates manual spreadsheets and automates compliance, member management, and reporting.</p>
        </div>

        <div className={styles.bentoGrid}>
          {cards.map((c, i) => (
            <article key={i} className={styles.bentoCard}>
              <div className={styles.bentoIcon}>{c.icon}</div>
              <h3 className={styles.bentoTitle}>{c.title}</h3>
              <p className={styles.bentoDesc}>{c.desc}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
