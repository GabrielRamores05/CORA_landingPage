import Head from 'next/head'
import Hero from '../components/Hero'
import FeatureGrid from '../components/FeatureGrid'
import SegmentSection from '../components/SegmentSection'
import TrustBar from '../components/TrustBar'
import TransformationSection from '../components/TransformationSection'
import ConfessionalSection from '../components/ConfessionalSection'
import WorkflowVisuals from '../components/WorkflowVisuals'
import SocialProofSection from '../components/SocialProofSection'
import DemoSection from '../components/DemoSection'
import JourneySection from '../components/JourneySection'
import ResourcesHubSection from '../components/ResourcesHubSection'
import GuaranteeSection from '../components/GuaranteeSection'
import Footer from '../components/Footer'
import { useState } from 'react'
import Navbar from '../components/Navbar'
import BookingModal from '../components/BookingModal'

export default function Home() {
  const [openBooking,setOpenBooking] = useState(false)
  return (
    <>
      <Head>
        <title>CORA – Digitalization Platform for Philippine Cooperatives</title>
        <meta name="description" content="CORA is a digitalization platform for Philippine cooperatives. Manage members, loans, collections, reporting, and daily operations in one centralized system." />
      </Head>

      <Navbar onOpenBooking={() => setOpenBooking(true)} />
      <main>
        <Hero onOpenBooking={() => setOpenBooking(true)} />
        <FeatureGrid />
        <SegmentSection />
        <TrustBar />
        <TransformationSection />
        <ConfessionalSection onOpenBooking={() => setOpenBooking(true)} />
        <WorkflowVisuals />
        <SocialProofSection onOpenBooking={() => setOpenBooking(true)} />
        <DemoSection onOpenBooking={() => setOpenBooking(true)} />
        <JourneySection />
        <ResourcesHubSection />
        <GuaranteeSection />
      </main>
      <Footer onOpenBooking={() => setOpenBooking(true)} />
      <BookingModal open={openBooking} onClose={() => setOpenBooking(false)} />
    </>
  )
}
