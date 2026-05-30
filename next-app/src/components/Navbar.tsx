import styles from './Navbar.module.css'
import Image from 'next/image'

export default function Navbar() {
  const handleRegisterClick = () => {
    const registrationForm = document.getElementById('registration-form')
    if (registrationForm) {
      registrationForm.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <nav className={styles.navbar}>
      <div className={`${styles.navContainer} container`}>
        <a href="#" className={styles.brand}>
          <Image src="/images/CORAlogo.png" alt="CORA Logo" className={styles.logo} width={120} height={34} priority />
        </a>

        <button 
          type="button" 
          className={styles.ctaButton} 
          onClick={handleRegisterClick}
        >
          Register for May 29 Demo
        </button>
      </div>
    </nav>
  )
}
