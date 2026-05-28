import { useState, useEffect } from 'react'
import styles from './CountdownTimer.module.css'

export default function CountdownTimer() {
  const [timeLeft, setTimeLeft] = useState<string>('')

  useEffect(() => {
    const calculateTimeLeft = () => {
      // Event is May 29, 2026, at 3:00 PM (15:00)
      const eventDate = new Date(2026, 4, 29, 15, 0, 0).getTime()
      const now = new Date().getTime()
      const difference = eventDate - now

      if (difference > 0) {
        const hours = Math.floor((difference / (1000 * 60 * 60)) % 24)
        const minutes = Math.floor((difference / 1000 / 60) % 60)
        const seconds = Math.floor((difference / 1000) % 60)
        setTimeLeft(`${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`)
      } else {
        setTimeLeft('00:00:00')
      }
    }

    calculateTimeLeft()
    const interval = setInterval(calculateTimeLeft, 1000)
    return () => clearInterval(interval)
  }, [])

  return (
    <div className={styles.timerContainer}>
      <div className={styles.timerLabel}>LIVE EVENT STARTS IN</div>
      <div className={styles.timerDisplay}>{timeLeft}</div>
      <div className={styles.timerSubtext}>Friday, May 29 at 3:00 PM</div>
    </div>
  )
}
