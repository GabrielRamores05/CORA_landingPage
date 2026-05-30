import { useState, useEffect } from 'react'
import styles from './CountdownTimer.module.css'

export default function CountdownTimer() {
  const [timeLeft, setTimeLeft] = useState<string>('')

  useEffect(() => {
    const calculateTimeLeft = () => {
      // Target: May 29, 2026, 15:00:00 PHT (UTC+8)
      const eventDate = new Date("2026-05-29T15:00:00+08:00").getTime()
      const now = new Date().getTime()
      const difference = eventDate - now

      if (difference > 0) {
        const hours = Math.floor(difference / (1000 * 60 * 60))
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
