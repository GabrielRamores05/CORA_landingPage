import Head from 'next/head'
import { useState } from 'react'
import Navbar from '../components/Navbar'
import Hero from '../components/Hero'
import BookingForm from '../components/BookingForm'
import FeatureGrid from '../components/FeatureGrid'
import Footer from '../components/Footer'

export default function Home() {
  const [formSubmitted, setFormSubmitted] = useState(false)

  const openDemo = () => {
    const registrationForm = document.getElementById('registration-form')
    if (registrationForm) {
      registrationForm.scrollIntoView({ behavior: 'smooth' })
    }
  }

  const handleFormSuccess = () => {
    setFormSubmitted(true)
    setTimeout(() => setFormSubmitted(false), 5000)
  }

  return (
    <>
      <Head>
        <title>CORA – May 29 Live Demo Registration</title>
        <meta
          name="description"
          content="Register for the exclusive May 29 live demo. See how CORA automates CISA & CAIS compliance for Philippine cooperatives. Secure your seat now."
        />
      </Head>

      <Navbar onOpenBooking={openDemo} />
      <Hero onOpenBooking={openDemo} />
      
      <section id="registration-form" style={{ background: '#f8f9fa', padding: '60px 20px' }}>
        <div style={{ maxWidth: '600px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '32px' }}>
            <h2 style={{ fontSize: '28px', fontWeight: 700, marginBottom: '12px', color: '#1a1a1a' }}>Secure Your Spot in 5 Seconds</h2>
            <p style={{ fontSize: '16px', color: '#666', marginBottom: '0' }}>Fill in your details and we'll send you the event details & text reminders.</p>
          </div>
          <BookingForm onSuccess={handleFormSuccess} />
        </div>
      </section>

      <FeatureGrid />
      <Footer onOpenBooking={openDemo} />
    </>
  )
}
