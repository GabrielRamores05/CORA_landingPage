import styles from './SegmentSection.module.css'

const segments = [
  'Credit Cooperatives',
  'Multipurpose Cooperatives',
  'Agriculture Cooperatives',
  'Transport Cooperatives',
  'Electric Cooperatives',
  'School Cooperatives',
  'Consumer Cooperatives',
  'Housing Cooperatives',
]

export default function SegmentSection(){
  return (
    <section className={styles.segmentSection} id="coop-segments">
      <div className={`${styles.segmentInner} container`}>
        <div className={styles.header}>
          <span className={styles.label}>Versatile Platform</span>
          <h2 className={styles.title}>Built for Different Types of Cooperatives</h2>
          <p className={styles.description}>CORA adapts to your specific operational workflows, supporting different cooperative sectors across the Philippines.</p>
        </div>
        <div className={styles.pillCloud}>
          {segments.map((label) => (
            <div key={label} className={styles.pill}>
              <span className={styles.pillDot} />
              {label}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
