import styles from './DemoSection.module.css'
import Image from 'next/image'
import { Calendar } from '@phosphor-icons/react'

type Props = {
  onOpenBooking: () => void
}

const demos = [
  { src: '/images/April 30 Online Demo.jpg', label: 'April 30, 2026 Online Demo', alt: 'CORA online demo April 30, 2026' },
  { src: '/images/Online-Demo-May-8.jpg', label: 'May 8, 2026 Online Demo', alt: 'CORA online demo May 8, 2026' },
  { src: '/images/Online-Demo-May-15.jpg', label: 'May 15, 2026 Online Demo', alt: 'CORA online demo May 15, 2026' },
]

export default function DemoSection({ onOpenBooking }: Props){
  return (
    <section className={styles.demoSection} id="demo">
      <div className="container">
        <div className={styles.inner}>
          <div className={styles.content}>
            <span className={styles.label}>Live Sessions</span>
            <h2 className={styles.title}>Online Demos — See CORA Live</h2>
            <p className={styles.subtitle}>We host interactive online demos to walkthrough features, compliance updates, and daily operational ease. Join the next one — online, anywhere in the Philippines.</p>

            <div className={styles.gallery}>
              {demos.map((demo) => (
                <div key={demo.label} className={styles.galleryItem}>
                  <div className={styles.imageWrapper}>
                    <Image src={demo.src} alt={demo.alt} fill className={styles.image} sizes="(max-width: 768px) 100vw, 33vw" />
                  </div>
                  <div className={styles.galleryCaption}>
                    <span className={styles.dot}></span>
                    <span className={styles.galleryLabel}>{demo.label}</span>
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
