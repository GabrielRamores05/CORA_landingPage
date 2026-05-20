import React, { useEffect } from 'react'
import styles from './Modal.module.css'

type Props = {
  children: React.ReactNode
  onClose: () => void
}

export default function Modal({ children, onClose }: Props){
  useEffect(()=>{
    function onKey(e: KeyboardEvent){
      if(e.key === 'Escape') onClose()
    }
    document.addEventListener('keydown', onKey)
    return ()=> document.removeEventListener('keydown', onKey)
  },[onClose])

  return (
    <div className={styles.overlay} onClick={onClose}>
      <div className={styles.dialog} onClick={(e)=>e.stopPropagation()} role="dialog" aria-modal="true">
        <button className={styles.closeBtn} onClick={onClose} aria-label="Close">✕</button>
        {children}
      </div>
    </div>
  )
}
