import styles from './TrustBar.module.css'

const stats = [
  { value: '30', suffix: '+', label: 'Cooperatives Engaged' },
  { value: '10', suffix: '+', label: 'Live Events & Demos' },
  { value: '200', suffix: '+', label: 'CDA Reports Generated' },
  { value: '300', suffix: '+', label: 'Teller Hours Saved' },
]

export default function TrustBar(){
  return (
    <section className={styles.trustBar} id="trust-bar">
      <div className={`${styles.inner} container`}>
        {stats.map((stat) => (
          <div key={stat.label} className={styles.stat}>
            <div className={styles.number}>
              {stat.value}<span className={styles.suffix}>{stat.suffix}</span>
            </div>
            <div className={styles.label}>{stat.label}</div>
          </div>
        ))}
      </div>
    </section>
  )
}
