import styles from './FeatureGrid.module.css'
import { FileText, UsersThree, UploadSimple, GearSix, CurrencyCircleDollar, SquaresFour } from '@phosphor-icons/react'

const cards = [
  { 
    icon: <FileText size={24} weight="duotone" />, 
    title: 'Built-in CISA & CAIS Compliance', 
    desc: 'Generate your Cooperative Information System Archive (CISA) and Cooperative Auditing Information System (CAIS) reports automatically. Fully CDA-compliant and exported with a single click, completely eliminating manual Excel conversions and midnight head-scratching.' 
  },
  { 
    icon: <UsersThree size={24} weight="duotone" />, 
    title: 'Instant Member Masterlist', 
    desc: "Say goodbye to missing physical folders. Pull up any member's complete history of Share Capital, Savings, and active Loans in one click." 
  },
  { 
    icon: <UploadSimple size={24} weight="duotone" />, 
    title: 'Hands-on Excel Migration', 
    desc: 'Worried about moving your old records? Our onboarding team completely cleans, structures, and migrates all your physical logs and Excel spreadsheets for you.' 
  },
  { 
    icon: <GearSix size={24} weight="duotone" />, 
    title: 'Tellers & Bookkeepers Finally Aligned', 
    desc: 'Every teller transaction automatically updates the General Ledger. No more double-entry errors between your front desk and your accountant.' 
  },
  { 
    icon: <CurrencyCircleDollar size={24} weight="duotone" />, 
    title: 'Automatic Dividend Distribution', 
    desc: 'What used to take weeks of manual Excel formulas now happens in minutes, with surplus allocations and statutory funds computed automatically.' 
  },
  { 
    icon: <SquaresFour size={24} weight="duotone" />, 
    title: 'Real-Time Branch Tracking', 
    desc: 'Monitor daily cash collections and teller remittances across all your locations without manual consolidation.' 
  },
]

export default function FeatureGrid(){
  return (
    <section className={styles.featuresSection} id="features">
      <div className="container">
        <div className={styles.featuresHeader}>
          <span className={styles.featuresLabel}>The Solution</span>
          <h2 className={styles.featuresTitle}>A System Actually Built for Philippine Cooperatives</h2>
          <p className={styles.featuresSubtitle}>No generic SaaS templates. CORA is built specifically to handle CDA compliance, member ledgers, and cooperative accounting.</p>
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
