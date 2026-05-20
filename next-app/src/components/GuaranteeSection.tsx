import styles from './GuaranteeSection.module.css'
import { ShieldCheck, Heart, ClipboardText, CalendarCheck, CloudArrowUp } from '@phosphor-icons/react'

const guarantees = [
  {
    icon: <ShieldCheck size={24} weight="duotone" />,
    title: 'Built for CDA Compliance',
    desc: 'Pre-configured with standard Philippine cooperative charts of accounts and CDA reporting formats.',
  },
  {
    icon: <Heart size={24} weight="duotone" />,
    title: 'Tellers & Bookkeepers Love It',
    desc: 'No complex tech jargon. The interface mimics the logical workflow your staff already uses daily.',
  },
  {
    icon: <ClipboardText size={24} weight="duotone" />,
    title: 'We Handle the Excel Migration',
    desc: 'Worried about moving your old records? Our onboarding team cleans and migrates your Excel data for you.',
  },
  {
    icon: <CalendarCheck size={24} weight="duotone" />,
    title: 'No More Year-End Panic',
    desc: 'Surplus allocations and statutory funds are computed automatically. Close your books without overtime.',
  },
  {
    icon: <CloudArrowUp size={24} weight="duotone" />,
    title: 'Secure Daily Backups',
    desc: 'Stop worrying about broken hard drives or corrupted flash drives. Your data is backed up to secure servers daily.',
  },
]

export default function GuaranteeSection(){
  return (
    <section className={styles.guaranteeSection} id="why-choose-cora">
      <div className={styles.inner}>
        <div className={styles.header}>
          <span className={styles.label}>Our Commitment</span>
          <h2 className={styles.title}>The CORA Guarantee</h2>
          <p className={styles.description}>We don't just sell software. We partner with your cooperative to ensure operational success from day one.</p>
        </div>
        <div className={styles.list}>
          {guarantees.map((item) => (
            <article key={item.title} className={styles.item}>
              <div className={styles.icon}>{item.icon}</div>
              <div className={styles.content}>
                <h3>{item.title}</h3>
                <p>{item.desc}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
