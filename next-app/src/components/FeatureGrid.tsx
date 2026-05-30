import styles from './FeatureGrid.module.css'
import { FileText, UsersThree, UploadSimple, GearSix, CurrencyCircleDollar, SquaresFour } from '@phosphor-icons/react'
import Image from 'next/image'

const cards = [
  { 
    icon: <FileText size={24} weight="duotone" />, 
    title: 'Live Demo 1: Finish your audit report in 3 clicks', 
    desc: 'Watch how the report gets built live for CISA and CAIS submission, without extra Excel juggling or manual copy-and-paste.',
    img: '/images/cora_cooperative_reports.png'
  },
  { 
    icon: <UsersThree size={24} weight="duotone" />, 
    title: 'Live Demo 2: Look up any member account instantly', 
    desc: "See how to pull up a member's savings, loans, and share history from one screen—without digging through paper files.",
    img: '/images/cora_member_records.png'
  },
  { 
    icon: <UploadSimple size={24} weight="duotone" />, 
    title: 'Live Demo 3: Move old spreadsheets safely', 
    desc: 'We show how your existing Excel or paper records get cleaned and moved across so nothing is lost and everything stays ready for audit.',
    img: '/images/cora_legacy_migration.png'
  },
  { 
    icon: <GearSix size={24} weight="duotone" />, 
    title: 'Live Demo 4: Match teller totals with your books automatically', 
    desc: 'Watch a teller transaction update the day book and ledger at the same time, so manual balancing becomes a thing of the past.',
    img: '/images/cora_teller_sync.png'
  },
  { 
    icon: <CurrencyCircleDollar size={24} weight="duotone" />, 
    title: 'Live Demo 5: Compute dividends without spreadsheet pain', 
    desc: 'See the system calculate surplus sharing and statutory funds in minutes, instead of hours of formula work.',
    img: '/images/cora_dividend_calculator.png'
  },
  { 
    icon: <SquaresFour size={24} weight="duotone" />, 
    title: 'Live Demo 6: Track branch collections from one screen', 
    desc: 'Watch how branch cash and teller remittances show up in one place, without anyone having to merge different reports by hand.',
    img: '/images/cora_collections_dashboard.png'
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
              {c.img && (
                <div className={styles.bentoImageWrapper}>
                  <Image src={c.img} alt={c.title} fill className={styles.bentoImage} sizes="(max-width: 768px) 100vw, 33vw" />
                </div>
              )}
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
