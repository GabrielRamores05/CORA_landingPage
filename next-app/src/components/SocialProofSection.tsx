import styles from './SocialProofSection.module.css'
import Image from 'next/image'

type Props = {
  onOpenBooking: () => void
}

const eventCards = [
  { src: '/images/Onboarding-LCCMPC.jpg', alt: 'LCCMPC onboarding with CORA', location: 'Onsite Onboarding', title: 'La Consolacion College MPC (LCCMPC)', featured: true },
  { src: '/images/Online-Demo-May-8.jpg', alt: 'Online demo May 8', location: 'Online Demo', title: 'Interactive System Tour (May 8)' },
  { src: '/images/Online-Demo-May-15.jpg', alt: 'Online demo May 15', location: 'Online Demo', title: 'Cooperative Operations Demo (May 15)' },
  { src: '/images/Event_COOPdayCamNorte1.jpg', alt: 'Coop Day Camarines Norte', location: 'Camarines Norte', title: 'Cooperative Day Celebration' },
  { src: '/images/Event_COOPdayCamNorte2.jpg', alt: 'Coop Day session', location: 'Camarines Norte', title: 'Automation Training Seminar' },
  { src: '/images/Event_COOPdayNagaCity1.jpg', alt: 'Naga City event', location: 'Naga City', title: 'Bicol Cooperative Assembly' },
  { src: '/images/Event_FACCSliveDemo1.jpg', alt: 'FACCS live demo', location: 'FACCS Conference', title: 'Live System Demo for Federation' },
  { src: '/images/Event_FACCSliveDemo2.jpg', alt: 'FACCS presentation', location: 'FACCS Conference', title: 'Interactive Board Walkthrough' },
  { src: '/images/Event_FACCSliveDemo3.jpg', alt: 'FACCS booth', location: 'FACCS Conference', title: 'Federation Exhibition Booth' },
]

const testimonials = [
  {
    quote: 'Mas naging organized yung member records namin. Hindi na kami nahihirapan mag-hanap kapag may gustong mag-withdraw o mag-loan na member.',
    cite: 'Operations Manager',
    coop: 'Multi-Purpose Cooperative in Laguna'
  },
  {
    quote: 'Dati, inaabot kami ng madaling araw sa pag-reconcile ng general ledger at financial statements para sa CDA reports. Ngayon sa CORA, a few clicks na lang, generated at accurate na kaagad.',
    cite: 'Board Secretary & Treasurer',
    coop: 'Cooperative in Camarines Sur'
  },
  {
    quote: 'Sobrang daling gamitin kahit ng mga hindi tech-savvy na staff. Setup was very smooth din kasi tinulungan talaga kami ng team mula day one.',
    cite: 'Board Chairperson',
    coop: 'Transport Cooperative in Naga City'
  },
]

export default function SocialProofSection({ onOpenBooking }: Props){
  return (
    <section className={styles.socialProofSection} id="social-proof">
      <div className="container">
        <div className={styles.header}>
          <span className={styles.label}>Our Footprint</span>
          <h2 className={styles.title}>CORA Active in the Cooperative Community</h2>
          <p className={styles.description}>We are hands-on and on the ground, assisting cooperative leaders, treasurers, and staff with automated, compliant operations across the Philippines.</p>
        </div>

        {/* Gallery Grid */}
        <div className={styles.galleryContainer}>
          <div className={styles.featuredGrid}>
            {eventCards.slice(0, 3).map((card) => (
              <article key={card.title} className={`${styles.eventCard} ${card.featured ? styles.featured : ''}`}>
                <div className={styles.imageWrapper}>
                  <Image src={card.src} alt={card.alt} fill className={styles.image} sizes="(max-width: 768px) 100vw, 33vw" priority />
                </div>
                <div className={styles.overlay}>
                  <span className={styles.badge}>{card.location}</span>
                  <h3 className={styles.cardTitle}>{card.title}</h3>
                </div>
              </article>
            ))}
          </div>

          <div className={styles.subGrid}>
            {eventCards.slice(3).map((card) => (
              <article key={card.title} className={styles.eventCardSmall}>
                <div className={styles.imageWrapperSmall}>
                  <Image src={card.src} alt={card.alt} fill className={styles.image} sizes="(max-width: 768px) 50vw, 20vw" />
                </div>
                <div className={styles.overlaySmall}>
                  <span className={styles.badgeSmall}>{card.location}</span>
                  <h3 className={styles.cardTitleSmall}>{card.title}</h3>
                </div>
              </article>
            ))}
          </div>
        </div>

        {/* Testimonials */}
        <div className={styles.testimonialsSection}>
          <div className={styles.testimonialsHeader}>
            <span className={styles.label}>Testimonials</span>
            <h2 className={styles.testimonialsTitle}>What Cooperative Leaders Say</h2>
          </div>
          
          <div className={styles.testimonialGrid}>
            {testimonials.map((t, index) => (
              <article key={index} className={styles.testimonialCard}>
                <div className={styles.quoteBubble}>
                  <span className={styles.quoteIcon}>“</span>
                  <p className={styles.quoteText}>{t.quote}</p>
                </div>
                <div className={styles.authorInfo}>
                  <div className={styles.avatar}>
                    {t.cite.charAt(0)}
                  </div>
                  <div>
                    <h4 className={styles.citeAuthor}>{t.cite}</h4>
                    <p className={styles.citeCoop}>{t.coop}</p>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>

        <div className={styles.ctaWrapper}>
          <button type="button" className="btn-secondary" onClick={onOpenBooking}>
            Book a Custom System Walkthrough →
          </button>
        </div>
      </div>
    </section>
  )
}
