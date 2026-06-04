import React, { useState, useCallback } from 'react'
import Head from 'next/head'
import Image from 'next/image'
import s from './CoraLanding.module.css'

import BookingForm from './BookingForm'

interface AgendaItem {
  step: string
  title: string
  desc: string
  img: string
}

interface DeploymentItem {
  img: string
  caption: string
}

export default function CoraLanding({
  agenda,
  deployments,
  heroDate,
  heroHeadline,
  heroSubheadline,
  heroFounderTag,
  heroFounderText,
  heroDownloadLink,
  heroCtaText,
  heroModalTitle,
  heroModalSub,
  heroSuccessTitle,
  heroSuccessDesc,
  navCtaText,
  trustBadge1,
  trustBadge2,
  trustBadge3,
  migrationTitle,
  migrationSub,
  migrationBody,
  step1,
  step2,
  step3,
  faq1Q,
  faq1A,
  faq2Q,
  faq2A,
  faq3Q,
  faq3A,
  footerBrand,
  footerSubtitle,
  footerCompany,
  footerCopyright,
  footerEmail,
  footerPhone,
  footerOffice,
  footerHours,
  hideNav = false,
}: any) {
  const [modalOpen, setModalOpen] = useState(false)
  const [done, setDone] = useState(false)

  const open = useCallback(() => setModalOpen(true), [])
  const close = useCallback(() => { setModalOpen(false); setDone(false) }, [])

  const handleSuccess = () => {
    setDone(true)
    setTimeout(close, 2500)
  }

  const agendaItems: AgendaItem[] = Array.isArray(agenda) && agenda.length > 0 ? agenda : [
    {
      step: 'LIVE DEMO 01',
      title: 'CDA-Compliant Reporting',
      desc: 'Generate your CISA and CAIS compliance exports in exactly 3 clicks — no manual cross-referencing, no copy-paste.',
      img: '/images/cora_cooperative_reports.png',
    },
    {
      step: 'LIVE DEMO 02',
      title: 'Instant Capital & Loan History',
      desc: "Pull up any member's complete savings, active loans, and share capital ledger on a single screen.",
      img: '/images/cora_member_records.png',
    },
    {
      step: 'LIVE DEMO 03',
      title: 'Multi-Branch Collections Sync',
      desc: 'Watch teller transactions from remote branches sync with the head office general ledger in real-time.',
      img: '/images/cora_collections_dashboard.png',
    },
  ]

  const deploymentItems: DeploymentItem[] = Array.isArray(deployments) && deployments.length > 0 ? deployments : []

  return (
    <div className={s.page}>
      <Head>
        <title>CORA — CDA-Compliant System for Philippine Cooperatives</title>
        <meta
          name="description"
          content="Shift from stressful Excel files to automated, audit-ready cooperative records. CDA-aligned, DPA-compliant software for Philippine cooperatives."
        />
      </Head>

      <div className={s.trustBar}>
        <div className={s.container}>
          <span className={s.trustBadge}>{trustBadge1 || 'CDA-Aligned'}</span>
          <span className={s.trustBadge}>{trustBadge2 || 'DPA-Compliant'}</span>
          <span className={s.trustBadge}>{trustBadge3 || 'Secure Cloud'}</span>
        </div>
      </div>

      {!hideNav && (
      <nav className={s.nav}>
        <div className={`${s.container} ${s.navInner}`}>
          <Image src="/images/CORAlogo.png" alt="CORA" width={160} height={48} priority className={s.navLogo} />
          <button className={s.navCta} onClick={open}>{navCtaText || 'Book Free Demo'}</button>
        </div>
      </nav>
      )}

      <section className={s.hero}>
        <div className={`${s.container} ${s.heroGrid}`}>
          <div className={s.heroContent}>
            <div className={s.badge}>MODERN, CDA-COMPLIANT SYSTEM</div>

            <h1 className={s.headline}>
              {heroHeadline || 'Stress-Free Cooperative Records'}
            </h1>

            <p className={s.subheadline}>
              {heroSubheadline || 'Discover how CORA helps Multi-Purpose, Credit, and Agricultural cooperatives across the Philippines manage member records, compute accurate dividends, and prepare for CDA evaluations with zero technical hassle.'}
            </p>

            <div className={s.founderCallout}>
              <span className={s.founderTag}>{heroFounderTag || 'Built for PH Cooperatives'}</span>
              <p className={s.founderText}>
                {heroFounderText || 'No credit card or technical knowledge required. Receive Google Meet link via email.'}
              </p>
            </div>

            {heroDownloadLink && (
              <p className={s.downloadLink}>
                <a href="/PDF/CORA-Overview.pdf" target="_blank" rel="noopener noreferrer">{heroDownloadLink}</a>
              </p>
            )}
            <button className={s.heroCta} onClick={open}>
              {heroCtaText || 'Request a Free System Demonstration'}
            </button>
          </div>

          <div className={s.heroImageContainer}>
            <img
              src="/images/Hero1.png"
              alt="Joannah B. Ramores — Founder & Lead Presenter of CORA"
              className={s.heroImage}
            />
            <div className={s.heroImageCaption}>
              <h3>Joannah B. Ramores</h3>
              <p>Founder &amp; Lead Presenter, CORA</p>
            </div>
          </div>
        </div>
      </section>

      <section className={s.section}>
        <div className={s.container}>
          <h2 className={s.sectionTitle}>{migrationTitle || 'Excel Migration Support'}</h2>
          <p className={s.sectionSub}>{migrationSub || 'Worried about your old Excel files? We provide migration assistance.'}</p>

          <div className={s.setupBox}>
            <p>{migrationBody || 'Our team offers free data migration guidance. Share your current Excel format during the demo and we\'ll show you exactly how to transition with zero manual re-entry stress.'}</p>
          </div>
        </div>
      </section>

      <section className={s.sectionAlt}>
        <div className={s.container}>
          <h2 className={s.sectionTitle}>The Demo Agenda</h2>
          <p className={s.sectionSub}>What you will see in 20 minutes</p>

          <div className={s.grid3}>
            {agendaItems.map((item) => (
              <article key={item.step} className={s.agendaCard}>
                <p className={s.stepLabel}>{item.step}</p>
                <h3 className={s.cardTitle}>{item.title}</h3>
                <p className={s.cardDesc}>{item.desc}</p>
                <img
                  src={item.img}
                  alt={item.title}
                  className={s.cardImg}
                />
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className={s.section}>
        <div className={s.container}>
          <h2 className={s.sectionTitle}>What Happens Next</h2>
          <div className={s.stepsRow}>
            <div className={s.stepItem}>
              <span className={s.stepNum}>1</span>
              <p>{step1 || 'Fill out the form — takes less than 60 seconds'}</p>
            </div>
            <div className={s.stepDivider}></div>
            <div className={s.stepItem}>
              <span className={s.stepNum}>2</span>
              <p>{step2 || 'Receive Google Meet link via email within 15 minutes'}</p>
            </div>
            <div className={s.stepDivider}></div>
            <div className={s.stepItem}>
              <span className={s.stepNum}>3</span>
              <p>{step3 || `Join the ${heroDate || 'june 5, 2026'} Google Meet demo`}</p>
            </div>
          </div>
        </div>
      </section>

      <section className={s.sectionAlt}>
        <div className={s.container}>
          <h2 className={s.sectionTitle}>FAQ for Board Members</h2>

          <div className={s.faqGrid}>
            <div className={s.faqItem}>
              <h4>{faq1Q || 'Is our cooperative\'s data safe with CORA?'}</h4>
              <p>{faq1A || 'Yes. CORA is built in strict compliance with the Philippine Data Privacy Act of 2012 (RA 10173). All member information is encrypted and securely stored with bank-grade cloud protocols.'}</p>
            </div>
            <div className={s.faqItem}>
              <h4>{faq2Q || 'Do you support specific cooperative reporting rules?'}</h4>
              <p>{faq2A || 'Yes, the platform is structured around the standard accounting systems and compliance formats expected by the Cooperative Development Authority (CDA).'}</p>
            </div>
            <div className={s.faqItem}>
              <h4>{faq3Q || 'Can we invite our Board Members to the demonstration call?'}</h4>
              <p>{faq3A || 'Absolutely. We highly recommend inviting your Chairman, Treasurer, Manager, and Board Directors so everyone can ask their specific operational questions.'}</p>
            </div>
          </div>
        </div>
      </section>

      <section className={s.sectionBorder}>
        <div className={s.container}>
          <h2 className={s.sectionTitle}>Proven in the Field</h2>
          <p className={s.sectionSub}>Edgepoint Enterprise Deployments Across Bicol</p>

          <div className={s.deployGrid}>
            {deploymentItems.map((d) => (
              <figure key={d.img} className={s.deployCard}>
                <img
                  src={d.img}
                  alt={d.caption}
                  className={s.deployImg}
                />
                <figcaption className={s.deployCaption}>{d.caption}</figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>

      <footer className={s.footer}>
        <div className={s.container}>
          <div className={s.footerInner}>
            <div className={s.footerContent}>
              <div className={s.brand}>
                {footerBrand || 'CORA'}
              </div>
              <p className={s.subtitle}>
                {footerSubtitle || 'Cooperative Operations & Records Application'}
              </p>
              <p className={s.company}>
                {footerCompany || 'By Edgepoint Solutions, Inc.'}
              </p>
              <div className={s.contactSection}>
                <h4 className={s.colTitle}>Contact</h4>
                <p className={s.contactText}>
                  Email: <a href={`mailto:${footerEmail || 'edgepoint.solutions.inc@gmail.com'}`} className={s.actionLink}>{footerEmail || 'edgepoint.solutions.inc@gmail.com'}</a>
                </p>
                <p className={s.contactText}>
                  Mobile/Viber: <a href={`tel:${footerPhone || '+639628073120'}`} className={s.actionLink}>{footerPhone || '0962 807 3120'}</a>
                </p>
                <p className={s.contactText}>
                  Office: {footerOffice || '2/F Edgepoint Building, P. Burgos St., Naga City, Camarines Sur 4400'}
                </p>
                <p className={s.contactText}>
                  Office Hours: {footerHours || 'Mondays to Fridays, 8:00 AM – 5:00 PM PHT'}
                </p>
              </div>
            </div>
            <div className={s.bottom}>
              <p>
                {footerCopyright || '© 2026 EDGEPOINT SOLUTIONS, INC. | DPA-Compliant | RA 9520 Compliant'}
              </p>
            </div>
          </div>
        </div>
      </footer>

      {modalOpen && (
        <div className={s.overlay} onClick={(e) => { if (e.target === e.currentTarget) close() }}>
          <div className={s.modal}>
            <button className={s.modalClose} onClick={close} aria-label="Close">✕</button>

            <h3 className={s.modalTitle}>{heroModalTitle || 'Book Your Free Demo Review'}</h3>
            <p className={s.modalSub}>{heroModalSub || `Free Google Meet Demo • ${heroDate || 'june 5, 2026'} • Check your email for the link`}</p>

            {done ? (
              <div className={s.successBox}>
                <svg width="48" height="48" fill="none" stroke="#34d399" strokeWidth="2" viewBox="0 0 24 24" style={{ margin: '0 auto' }}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <p className={s.successTitle}>{heroSuccessTitle || 'Registration Complete!'}</p>
                <p className={s.successDesc}>{heroSuccessDesc || 'Registration successful! Check your email for the Google Meet link.'}</p>
              </div>
            ) : (
              <BookingForm onSuccess={handleSuccess} demoDate={heroDate} />
            )}
          </div>
        </div>
      )}
    </div>
  )
}
