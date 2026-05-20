import styles from './ResourcesHubSection.module.css'
import { FileArrowDown, ArrowRight } from '@phosphor-icons/react'

const resources = [
  { href: '/PDF/CORA-Overview.pdf', title: 'CORA System Overview', desc: 'Download the comprehensive system overview, modular highlights, and standard features.' },
  { href: '/PDF/CORA-Implementation-Checklist.pdf', title: 'Onboarding & Migration Checklist', desc: 'Step-by-step preparation checklist for data migration and employee training.' },
  { href: '/PDF/CORA-Case-Study.pdf', title: 'Cooperative Case Study', desc: 'A real-world breakdown of trial balances, collections tracking, and audits generated in hours.' },
]

export default function ResourcesHubSection(){
  return (
    <section className={styles.resourcesSection} id="resources">
      <div className="container">
        <div className={styles.inner}>
          <div className={styles.header}>
            <span className={styles.label}>Resources</span>
            <h2 className={styles.title}>Guides, PDFs, and Materials</h2>
            <p className={styles.description}>Access helpful documents to review with your board of directors, supervisory committee, and accounting staff.</p>
          </div>

          <div className={styles.grid}>
            {resources.map((r) => (
              <a key={r.title} className={styles.card} href={r.href} target="_blank" rel="noreferrer">
                <div className={styles.cardIcon}>
                  <FileArrowDown size={24} weight="duotone" />
                </div>
                <div className={styles.cardContent}>
                  <h3>{r.title}</h3>
                  <p>{r.desc}</p>
                  <span className={styles.downloadLink}>
                    Download Document
                    <ArrowRight size={12} weight="bold" style={{ marginLeft: '4px' }} />
                  </span>
                </div>
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
