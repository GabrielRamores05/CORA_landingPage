import Image from 'next/image'
import { useState } from 'react'
import styles from './SideNavbar.module.css'

type Props = {
  activeSection: string
  onSelect: (section: string) => void
  onOpenBooking: () => void
}

const menuItems = [
  { id: 'home', label: 'Home' },
  { id: 'platform', label: 'Platform' },
  { id: 'implementation', label: 'Implementation' },
  { id: 'collections', label: 'Collections' },
]

const gallerySubItems = [
  { id: 'events', label: 'Events' },
  { id: 'onboarding', label: 'Onboarding' },
  { id: 'online-demo', label: 'Online Demo' },
]

export default function SideNavbar({ activeSection, onSelect, onOpenBooking }: Props) {
  const [mobileOpen, setMobileOpen] = useState(false)
  const [galleryOpen, setGalleryOpen] = useState(true)

  const handleSelect = (section: string) => {
    onSelect(section)
    setMobileOpen(false)
  }

  const isGalleryActive = gallerySubItems.some((g) => g.id === activeSection)

  return (
    <div className={styles.sidebarWrapper}>
      <button
        type="button"
        className={styles.mobileToggle}
        onClick={() => setMobileOpen(!mobileOpen)}
        aria-label="Open navigation"
      >
        <span />
        <span />
        <span />
      </button>

      <aside className={`${styles.sidebar} ${mobileOpen ? styles.sidebarOpen : ''}`}>
        <div className={styles.brandContainer}>
          <div className={styles.logoRow}>
            <Image src="/images/CORAlogo.png" alt="CORA Logo" width={120} height={34} />
          </div>
        </div>

        <div className={styles.menuGroup}>
          {menuItems.map((item) => (
            <button
              key={item.id}
              type="button"
              className={`${styles.menuItem} ${activeSection === item.id ? styles.active : ''}`}
              onClick={() => handleSelect(item.id)}
            >
              {item.label}
            </button>
          ))}

          <button
            type="button"
            className={`${styles.menuItem} ${isGalleryActive ? styles.active : ''}`}
            onClick={() => setGalleryOpen(!galleryOpen)}
          >
            <span>Gallery</span>
            <span className={styles.expandIcon}>{galleryOpen ? '−' : '+'}</span>
          </button>

          <div className={`${styles.submenu} ${galleryOpen ? styles.submenuOpen : ''}`}>
            {gallerySubItems.map((subItem) => (
              <button
                key={subItem.id}
                type="button"
                className={`${styles.submenuItem} ${activeSection === subItem.id ? styles.activeSub : ''}`}
                onClick={() => handleSelect(subItem.id)}
              >
                {subItem.label}
              </button>
            ))}
          </div>

          <button
            type="button"
            className={`${styles.menuItem} ${activeSection === 'contact' ? styles.active : ''}`}
            onClick={() => handleSelect('contact')}
          >
            Contact
          </button>
        </div>

        <div className={styles.footerActions}>
          <button type="button" className={styles.ctaButton} onClick={onOpenBooking}>
            BOOK A DEMO NOW
          </button>
        </div>
      </aside>
    </div>
  )
}
