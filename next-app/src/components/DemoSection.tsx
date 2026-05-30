import styles from './DemoSection.module.css'
import Image from 'next/image'
import { Calendar } from '@phosphor-icons/react'

type Props = {
  onOpenBooking: () => void
}

const deployments = [
  { src: '/images/Onboarding-LCCMPC.jpg', label: 'LCCMPC Deployment', alt: 'Edgepoint CORA onboarding at LCCMPC' },
  { src: '/images/Onboarding_SEMCO1.jpg', label: 'SEMCO Onboarding', alt: 'Edgepoint CORA onboarding at SEMCO' },
]

export default function DemoSection({ onOpenBooking }: Props){
  return (
    <section className={styles.demoSection} id="demo">
      <div className="container">
        <div className={styles.inner}>
          <div className={styles.content}>
            <span className={styles.label}>Proven in the Field</span>
            <h2 className={styles.title}>Edgepoint Onboarding & Deployments</h2>
            <p className={styles.subtitle}>CORA isn't just an idea—it's actively running in the real world. See how we hand-hold our cooperative partners during deployment to ensure zero downtime and absolute confidence.</p>

            <div className={styles.gallery}>
              {deployments.map((dep) => (
                <div key={dep.label} className={styles.galleryItem}>
                  <div className={styles.imageWrapper}>
                    <Image src={dep.src} alt={dep.alt} fill className={styles.image} sizes="(max-width: 768px) 100vw, 50vw" />
                  </div>
                  <div className={styles.galleryCaption}>
                    <span className={styles.dot}></span>
                    <span className={styles.galleryLabel}>{dep.label}</span>
                  </div>
                </div>
              ))}
            </div>

            <div className={styles.actionWrapper}>
              <button type="button" className="btn-primary" onClick={onOpenBooking}>
                <Calendar size={18} weight="bold" />
                <span>Schedule a Live Demo</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
