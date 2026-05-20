import styles from './JourneySection.module.css'
import Image from 'next/image'

const steps = [
  {
    src: '/images/Onboarding_SEMCO1.jpg',
    alt: 'Workflow Review',
    number: '01',
    title: 'Workflow Review',
    desc: 'We assess your current chart of accounts, loan products, and manual ledgers to match CORA to your exact processes.',
  },
  {
    src: '/images/Onboarding_SEMCO2.jpg',
    alt: 'Excel Data Migration',
    number: '02',
    title: 'Excel Data Migration',
    desc: 'You give us your Excel files and member records. Our team cleans, formats, and uploads everything into CORA for you so you start with clean data.',
  },
  {
    src: '/images/Onboarding-LCCMPC.jpg',
    alt: 'Staff Training & Go-Live',
    number: '03',
    title: 'Staff Training & Go-Live',
    desc: 'We sit down with your tellers, bookkeepers, and admins to ensure everyone knows exactly how to use the system confidently before going live.',
    badge: 'Live Client',
  },
]

export default function JourneySection(){
  return (
    <section className={styles.journeySection} id="onboarding">
      <div className={`${styles.inner} container`}>
        <div className={styles.header}>
          <span className={styles.label}>Implementation Support</span>
          <h2 className={styles.title}>We don’t just hand you a login. We move in with you.</h2>
          <p className={styles.description}>Transitioning to a new system is scary. That’s why our team guides the entire process to make sure CORA becomes second nature to your staff.</p>
        </div>
        <div className={styles.timeline}>
          {steps.map((step) => (
            <article key={step.number} className={styles.step}>
              <div className={styles.visual}>
                <Image src={step.src} alt={step.alt} width={900} height={300} />
                {step.badge && <span className={styles.badge}>{step.badge}</span>}
              </div>
              <div className={styles.content}>
                <div className={styles.stepNum}>{step.number}</div>
                <h3>{step.title}</h3>
                <p>{step.desc}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
