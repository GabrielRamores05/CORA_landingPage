import Head from 'next/head'
import Image from 'next/image'
import { useState, useEffect, useRef, type TouchEvent } from 'react'
import SideNavbar from '../components/SideNavbar'
import BookingModal from '../components/BookingModal'
import Footer from '../components/Footer'
import styles from '../components/LandingPage.module.css'

export default function Home() {
  const [activeSection, setActiveSection] = useState('home')
  const [openBooking, setOpenBooking] = useState(false)
  const [touchStartX, setTouchStartX] = useState<number | null>(null)

  const sectionOrder = [
    'home',
    'platform',
    'implementation',
    'collections',
    'events',
    'onboarding',
    'online-demo',
    'contact',
  ]

  const sectionLabels: Record<string, string> = {
    home: 'Home',
    platform: 'Platform',
    implementation: 'Implementation',
    collections: 'Collections',
    events: 'Events',
    onboarding: 'Onboarding',
    'online-demo': 'Online Demo',
    contact: 'Contact',
  }

  const activeIndex = sectionOrder.indexOf(activeSection)
  const nextSection = sectionOrder[Math.min(activeIndex + 1, sectionOrder.length - 1)]
  const prevSection = sectionOrder[Math.max(activeIndex - 1, 0)]
  const prevLabel = sectionLabels[prevSection]
  const nextLabel = sectionLabels[nextSection]
  const hasPrev = activeIndex > 0
  const hasNext = activeIndex < sectionOrder.length - 1

  const openDemo = () => setOpenBooking(true)

  const onTouchStart = (event: TouchEvent<HTMLDivElement>) => {
    setTouchStartX(event.touches[0].clientX)
  }

  const onTouchEnd = (event: TouchEvent<HTMLDivElement>) => {
    if (touchStartX === null) return
    const deltaX = event.changedTouches[0].clientX - touchStartX
    if (deltaX < -60 && activeIndex < sectionOrder.length - 1) {
      setActiveSection(nextSection)
    } else if (deltaX > 60 && activeIndex > 0) {
      setActiveSection(prevSection)
    }
    setTouchStartX(null)
  }

  const contentRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    if (!contentRef.current) return
    // scroll the content area and viewport to top when section changes
    try {
      contentRef.current.scrollTo({ top: 0, behavior: 'smooth' })
    } catch (e) {
      contentRef.current.scrollTop = 0
    }
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }, [activeSection])

  const renderContent = () => {
    switch (activeSection) {
      case 'platform':
        return (
          <>
            <div>
              <p className={styles.pageIntro}>Ang platform na ginawa para sa mga cooperative na gustong mag-level up.</p>
              <h1 className={styles.pageHeading}>
                One system for members, loans, collections, and reports.
              </h1>
              <p className={styles.pageIntro}>
                Practical, fast, at madaling gamitin ang CORA para sa bawat hakbang ng cooperative workflow.
              </p>
            </div>

            <div className={styles.featureImageRow}>
              <div className={styles.featureImageCard}>
                <Image src="/images/cora_member_records.png" alt="Member records dashboard" fill className={styles.heroImage} />
              </div>
              <div className={styles.featureImageCard}>
                <Image src="/images/cora_cooperative_reports.png" alt="Cooperative reports dashboard" fill className={styles.heroImage} />
              </div>
              <div className={styles.featureImageCard}>
                <Image src="/images/cora_collections_dashboard.png" alt="Collections dashboard" fill className={styles.heroImage} />
              </div>
            </div>

            <div className={styles.sectionBlock}>
              <div className={styles.sectionCard}>
                <h2 className={styles.sectionTitle}>Member Management</h2>
                <p className={styles.sectionText}>
                  Single source of truth para sa savings, contributions, at member history.
                </p>
              </div>
              <div className={styles.sectionCard}>
                <h2 className={styles.sectionTitle}>Loan Tracking</h2>
                <p className={styles.sectionText}>
                  Automated schedules at real-time status ng bawat loan.
                </p>
              </div>
              <div className={styles.sectionCard}>
                <h2 className={styles.sectionTitle}>Collections</h2>
                <p className={styles.sectionText}>
                  Easy monitoring ng payments at arrears sa isang dashboard.
                </p>
              </div>
              <div className={styles.sectionCard}>
                <h2 className={styles.sectionTitle}>Compliance</h2>
                <p className={styles.sectionText}>
                  Report generation na handa para sa audit at regulatory review.
                </p>
              </div>
            </div>

            <div className={styles.ctaBlock}>
              <button type="button" className={styles.primaryCta} onClick={openDemo}>
                BOOK A DEMO NOW
              </button>
            </div>
          </>
        )

      case 'implementation':
        return (
          <>
            <div>
              <p className={styles.pageIntro}>Implementation support built around cooperative workflows.</p>
              <h1 className={styles.pageHeading}>
                Seamless setup, migration, at local onboarding.
              </h1>
              <p className={styles.pageIntro}>
                We work with your team from data migration hanggang live operation para hindi na kayo babalik sa manual.
              </p>
            </div>

            <div className={styles.featureImageRow}>
              <div className={styles.featureImageCard}>
                <Image src="/images/Onboarding-LCCMPC.jpg" alt="Onboarding session" fill className={styles.heroImage} />
              </div>
              <div className={styles.featureImageCard}>
                <Image src="/images/Onboarding_SEMCO1.jpg" alt="SEMCO onboarding" fill className={styles.heroImage} />
              </div>
              <div className={styles.featureImageCard}>
                <Image src="/images/Onboarding_SEMCO2.jpg" alt="Onboarding workshop" fill className={styles.heroImage} />
              </div>
            </div>

            <div className={styles.sectionBlock}>
              <div className={styles.sectionCard}>
                <h2 className={styles.sectionTitle}>Data Migration</h2>
                <p className={styles.sectionText}>
                  Inaayos namin ang records para smooth transition at walang duplicate.
                </p>
              </div>
              <div className={styles.sectionCard}>
                <h2 className={styles.sectionTitle}>System Configuration</h2>
                <p className={styles.sectionText}>
                  Custom setup ayon sa member structure, loan rules, at branch workflows.
                </p>
              </div>
              <div className={styles.sectionCard}>
                <h2 className={styles.sectionTitle}>Live Onboarding</h2>
                <p className={styles.sectionText}>
                  Hands-on training kasama ang core users at officers.
                </p>
              </div>
            </div>

            <div className={styles.ctaBlock}>
              <button type="button" className={styles.primaryCta} onClick={openDemo}>
                BOOK A DEMO NOW
              </button>
            </div>
          </>
        )

      case 'collections':
        return (
          <>
            <div>
              <p className={styles.pageIntro}>Key product screens and dashboards used by cooperatives.</p>
              <h1 className={styles.pageHeading}>Platform screenshots & dashboards</h1>
              <p className={styles.pageIntro}>Member records, cooperative reports, and collections dashboard grouped for reference.</p>
            </div>

            <div className={styles.featureImageRow}>
              <div className={styles.featureImageCard}>
                <Image src="/images/cora_member_records.png" alt="Member records dashboard" fill className={styles.heroImage} />
              </div>
              <div className={styles.featureImageCard}>
                <Image src="/images/cora_cooperative_reports.png" alt="Cooperative reports dashboard" fill className={styles.heroImage} />
              </div>
              <div className={styles.featureImageCard}>
                <Image src="/images/cora_collections_dashboard.png" alt="Collections dashboard" fill className={styles.heroImage} />
              </div>
            </div>

            <div className={styles.sectionBlock}>
              <div className={styles.sectionCard}>
                <h2 className={styles.sectionTitle}>Member Records</h2>
                <p className={styles.sectionText}>Centralized ledger for member history, savings, and contributions.</p>
              </div>
              <div className={styles.sectionCard}>
                <h2 className={styles.sectionTitle}>Reports & Compliance</h2>
                <p className={styles.sectionText}>Automated exports and report packs for audits and board review.</p>
              </div>
            </div>

            <div className={styles.ctaBlock}>
              <button type="button" className={styles.primaryCta} onClick={openDemo}>BOOK A DEMO NOW</button>
            </div>
          </>
        )

      case 'events':
        return (
          <>
            <div>
              <p className={styles.pageIntro}>Field events, conferences, and cooperative launch moments.</p>
              <h1 className={styles.pageHeading}>Events gallery</h1>
              <p className={styles.pageIntro}>Photos from live demos, federation exhibits, and COOP day activities.</p>
            </div>

            <div className={styles.galleryGrid}>
              <div className={styles.galleryCard}><Image src="/images/Event_FACCSliveDemo1.jpg" alt="FACCS live demo" fill className={styles.heroImage} /></div>
              <div className={styles.galleryCard}><Image src="/images/Event_FACCSliveDemo2.jpg" alt="FACCS presentation" fill className={styles.heroImage} /></div>
              <div className={styles.galleryCard}><Image src="/images/Event_FACCSliveDemo3.jpg" alt="FACCS booth" fill className={styles.heroImage} /></div>
              <div className={styles.galleryCard}><Image src="/images/Event_COOPdayCamNorte1.jpg" alt="COOP day" fill className={styles.heroImage} /></div>
              <div className={styles.galleryCard}><Image src="/images/Event_COOPdayCamNorte2.jpg" alt="COOP day" fill className={styles.heroImage} /></div>
              <div className={styles.galleryCard}><Image src="/images/Event_COOPdayNagaCity1.jpg" alt="Naga City event" fill className={styles.heroImage} /></div>
            </div>

            <div className={styles.sectionBlock}>
              <div className={styles.sectionCard}>
                <h2 className={styles.sectionTitle}>Community Reach</h2>
                <p className={styles.sectionText}>On-ground engagement and cooperative awareness activities.</p>
              </div>
              <div className={styles.sectionCard}>
                <h2 className={styles.sectionTitle}>Live Demonstrations</h2>
                <p className={styles.sectionText}>Interactive demos shown at conferences and federation events.</p>
              </div>
            </div>

            <div className={styles.ctaBlock}>
              <button type="button" className={styles.primaryCta} onClick={openDemo}>BOOK A DEMO NOW</button>
            </div>
          </>
        )

      case 'onboarding':
        return (
          <>
            <div>
              <p className={styles.pageIntro}>Onboarding sessions and setup workshops with clients.</p>
              <h1 className={styles.pageHeading}>Onboarding gallery</h1>
              <p className={styles.pageIntro}>Hands-on implementation, data migration, and staff training snapshots.</p>
            </div>

            <div className={styles.galleryGrid}>
              <div className={styles.galleryCard}><Image src="/images/Onboarding-LCCMPC.jpg" alt="Onboarding LCCMPC" fill className={styles.heroImage} /></div>
              <div className={styles.galleryCard}><Image src="/images/Onboarding_SEMCO1.jpg" alt="SEMCO onboarding 1" fill className={styles.heroImage} /></div>
              <div className={styles.galleryCard}><Image src="/images/Onboarding_SEMCO2.jpg" alt="SEMCO onboarding 2" fill className={styles.heroImage} /></div>
            </div>

            <div className={styles.sectionBlock}>
              <div className={styles.sectionCard}>
                <h2 className={styles.sectionTitle}>Data Migration</h2>
                <p className={styles.sectionText}>Preparing and cleansing records for seamless transition.</p>
              </div>
              <div className={styles.sectionCard}>
                <h2 className={styles.sectionTitle}>Hands-on Training</h2>
                <p className={styles.sectionText}>Role-based coaching for tellers, bookkeepers, and officers.</p>
              </div>
            </div>

            <div className={styles.ctaBlock}>
              <button type="button" className={styles.primaryCta} onClick={openDemo}>BOOK A DEMO NOW</button>
            </div>
          </>
        )

      case 'online-demo':
        return (
          <>
            <div>
              <p className={styles.pageIntro}>Recorded and live online demos for remote teams.</p>
              <h1 className={styles.pageHeading}>Online demos</h1>
              <p className={styles.pageIntro}>Short walkthroughs, recordings, and scheduled interactive sessions.</p>
            </div>

            <div className={styles.galleryGrid}>
              <div className={styles.galleryCard}><Image src="/images/Online-Demo-May-15.jpg" alt="Online demo May 15" fill className={styles.heroImage} /></div>
              <div className={styles.galleryCard}><Image src="/images/Online-Demo-May-8.jpg" alt="Online demo May 8" fill className={styles.heroImage} /></div>
              <div className={styles.galleryCard}><Image src="/images/April%2030%20Online%20Demo.jpg" alt="April 30 online demo" fill className={styles.heroImage} /></div>
            </div>

            <div className={styles.sectionBlock}>
              <div className={styles.sectionCard}>
                <h2 className={styles.sectionTitle}>Live Q&A</h2>
                <p className={styles.sectionText}>Interactive sessions where participants ask real workflow questions.</p>
              </div>
              <div className={styles.sectionCard}>
                <h2 className={styles.sectionTitle}>Recorded Walkthroughs</h2>
                <p className={styles.sectionText}>Short recordings focused on common cooperative operations and reports.</p>
              </div>
            </div>

            <div className={styles.ctaBlock}>
              <button type="button" className={styles.primaryCta} onClick={openDemo}>BOOK A DEMO NOW</button>
            </div>
          </>
        )

      case 'contact':
        return (
          <>
            <div>
              <p className={styles.pageIntro}>Makipag-ugnayan sa CORA team para sa iyong cooperative.</p>
              <h1 className={styles.pageHeading}>
                Contact us para mag-set ng demo at consultation.
              </h1>
              <p className={styles.pageIntro}>
                Available kami para sa onboarding, live coaching, at pagtulong sa cooperative operations ng inyong organization.
              </p>
            </div>

            <div className={styles.contactList}>
              <div className={styles.contactItem}>
                <strong>Gmail</strong>
                <span><a href="mailto:edgepoint.solutions.inc@gmail.com">edgepoint.solutions.inc@gmail.com</a></span>
              </div>
              <div className={styles.contactItem}>
                <strong>Mobile no</strong>
                <span><a href="tel:+639628073120">0962 807 3120</a></span>
              </div>
              <div className={styles.contactItem}>
                <strong>Facebook</strong>
                <span><a href="https://www.facebook.com/Cora.ph.2026" target="_blank" rel="noreferrer">https://www.facebook.com/Cora.ph.2026</a></span>
              </div>
              <div className={`${styles.contactItem} ${styles.contactItemWide}`}>
                <span className={styles.contactLine}>
                  <strong>Address:</strong> Level 4, Nagaland E-Mall, Elias Angeles St., Naga City 4400, Camarines Sur, Bicol Region, Philippines
                </span>
              </div>
            </div>

            <div className={styles.ctaBlock}>
              <button type="button" className={styles.primaryCta} onClick={openDemo}>
                BOOK A DEMO NOW
              </button>
            </div>
          </>
        )

      case 'home':
        return (
          <>
            <div className={styles.heroBlock}>
              <div className={styles.heroText}>
                <div className={styles.pretitle}>COOPERATIVE OPERATIONS AUTOMATION</div>
                <h1 className={styles.pageHeading}>
                  A Supportive Partner
                  <br />
                  For <span className={styles.pageHighlight}>Your Cooperative</span>
                </h1>
                <p className={styles.pageIntro}>
                  CORA provides warm, supportive digitalization and applied automation built specifically to ease your operations. Manage members, savings, and loans effortlessly, while we handle the entire migration for you.
                </p>

                <div className={styles.pill}>Built-in CISA &amp; CAIS Report Generation System</div>

                <div className={styles.ctaBlock}>
                  <button type="button" className={styles.primaryCta} onClick={openDemo}>
                    BOOK A DEMO NOW
                  </button>
                </div>

                <div className={styles.featureBullets}>
                  <div className={styles.featureBullet}>✓ Complete CISA &amp; CAIS automated exports</div>
                  <div className={styles.featureBullet}>✓ We clean &amp; migrate your Excel data</div>
                  <div className={styles.featureBullet}>✓ Supportive personal onboarding &amp; training</div>
                </div>
              </div>

              <div className={styles.heroImageWrapper}>
                <div className={styles.founderCard}>
                  <span className={styles.founderBadge}>FOUNDER</span>
                  <Image
                    src="/images/Hero1.png"
                    alt="Founder portrait"
                    width={1920}
                    height={1920}
                    className={styles.founderPortrait}
                    priority
                  />
                </div>
                <p className={styles.quote}>
                  “We are here to walk with you through every step of digitalization.” — Joannah Ramores, Founder
                </p>
              </div>
            </div>
          </>
        )
      default:
        return null
    }
  }

  return (
    <>
      <Head>
        <title>CORA – Digitalization Platform for Philippine Cooperatives</title>
        <meta
          name="description"
          content="CORA is a digitalization platform for Philippine cooperatives. Manage members, loans, collections, reporting, and daily operations in one centralized system."
        />
      </Head>

      <div className={styles.landingShell}>
        <SideNavbar activeSection={activeSection} onSelect={setActiveSection} onOpenBooking={openDemo} />
        <main className={styles.mainPanel}>
          <div className={styles.contentShell}>
            <div className={styles.contentCard} onTouchStart={onTouchStart} onTouchEnd={onTouchEnd}>
              <div className={styles.contentBody} ref={contentRef}>{renderContent()}</div>
            </div>

            <div className={styles.navigationFooter}>
              <button
                type="button"
                className={`${styles.navButton} ${styles.prevButton}`}
                disabled={!hasPrev}
                onClick={() => setActiveSection(prevSection)}
              >
                Previous: {prevLabel}
              </button>
              <button
                type="button"
                className={`${styles.navButton} ${styles.nextButton}`}
                disabled={!hasNext}
                onClick={() => setActiveSection(nextSection)}
              >
                Next: {nextLabel}
              </button>
            </div>
          </div>
        </main>
      </div>

      <Footer onOpenBooking={openDemo} />
      <BookingModal open={openBooking} onClose={() => setOpenBooking(false)} />
    </>
  )
}
