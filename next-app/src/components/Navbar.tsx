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

  const handleRegisterClick = () => {
    const registrationForm = document.getElementById('registration-form')
    if (registrationForm) {
      registrationForm.scrollIntoView({ behavior: 'smooth' })
    }
  }

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
          <button 
            type="button" 
            className={styles.ctaButton} 
            onClick={handleRegisterClick}
          >
            Register for May 29 Demo
          </button>
        </div>

        {/* Mobile Hamburger Button */}
        <button 
          type="button" 
          className={`${styles.hamburger} ${mobileMenuOpen ? styles.hamburgerActive : ''}`} 
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label="Toggle registration menu"
        >
          <span></span>
          <span></span>
          <span></span>
        </button>
      </div>

      {/* Mobile Links Dropdown */}
      <div className={`${styles.mobileDropdown} ${mobileMenuOpen ? styles.mobileDropdownActive : ''}`}>
        <button 
          type="button" 
          className={styles.mobileCta} 
          onClick={() => {
            setMobileMenuOpen(false)
            handleRegisterClick()
          }}
        >
          Register for May 29 Demo
        </button>
      </div>
    </nav>
  )
}
