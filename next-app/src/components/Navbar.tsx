import { useState, useEffect } from 'react'
import styles from './Navbar.module.css'
import Image from 'next/image'

type Props = {
  onOpenBooking?: () => void
}

export default function Navbar({ onOpenBooking }: Props) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setScrolled(true)
      } else {
        setScrolled(false)
      }
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <nav className={`${styles.navbar} ${scrolled ? styles.scrolled : ''}`}>
      <div className={`${styles.navContainer} container`}>
        <a href="#" className={styles.brand}>
          <Image 
            src="/images/CORAlogo.png" 
            alt="CORA Logo" 
            className={styles.logo} 
            width={120} 
            height={34} 
            priority
          />
        </a>

        {/* Desktop Links */}
        <div className={styles.desktopLinks}>
          <a className={styles.link} href="#features">Features</a>
          <a className={styles.link} href="#social-proof">Events</a>
          <a className={styles.link} href="#onboarding">Support</a>
          <button 
            type="button" 
            className={styles.ctaButton} 
            onClick={() => {
              if (onOpenBooking) onOpenBooking()
            }}
          >
            Schedule a Demo
          </button>
        </div>

        {/* Mobile Hamburger Button */}
        <button 
          type="button" 
          className={`${styles.hamburger} ${mobileMenuOpen ? styles.hamburgerActive : ''}`} 
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label="Toggle navigation menu"
        >
          <span></span>
          <span></span>
          <span></span>
        </button>
      </div>

      {/* Mobile Links Dropdown */}
      <div className={`${styles.mobileDropdown} ${mobileMenuOpen ? styles.mobileDropdownActive : ''}`}>
        <a className={styles.mobileLink} href="#features" onClick={() => setMobileMenuOpen(false)}>Features</a>
        <a className={styles.mobileLink} href="#social-proof" onClick={() => setMobileMenuOpen(false)}>Events</a>
        <a className={styles.mobileLink} href="#onboarding" onClick={() => setMobileMenuOpen(false)}>Support</a>
        <button 
          type="button" 
          className={styles.mobileCta} 
          onClick={() => {
            setMobileMenuOpen(false)
            if (onOpenBooking) onOpenBooking()
          }}
        >
          Schedule a Demo
        </button>
      </div>
    </nav>
  )
}
