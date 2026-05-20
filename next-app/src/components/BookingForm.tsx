import { useState } from 'react'
import styles from './BookingForm.module.css'

type Props = { onSuccess?: ()=>void }

export default function BookingForm({onSuccess}: Props){
  const [loading,setLoading] = useState(false)
  const [message,setMessage] = useState<string | null>(null)
  const [subscribe,setSubscribe] = useState(false)

  async function handleSubmit(e: any){
    e.preventDefault()
    setLoading(true)
    setMessage(null)
    const form = e.target as HTMLFormElement
    const formData = new FormData(form)
    const templateParams: any = {}
    formData.forEach((v,k)=> templateParams[k]=v)
    templateParams.subscribed = subscribe ? 'User has subscribed to receive newsletters and updates.' : 'User did not subscribe to receive newsletters.'

    try{
      const serviceId = 'service_aay4edu'
      const templateId = 'template_os99snq'
      const userId = 'wU74bNn0Kht8Sa4J4'
      // @ts-ignore
      if(typeof window !== 'undefined' && (window as any).emailjs){
        // @ts-ignore
        const emailjs = (window as any).emailjs
        if(emailjs.init && userId) emailjs.init(userId)
        await emailjs.send(serviceId, templateId, templateParams)
         setMessage('You are now registered for our may 22 demo, Thank you and see you')
        form.reset()
        setSubscribe(false)
        if(onSuccess) onSuccess()
      } else {
        setMessage('Email service not initialized. Please check EmailJS setup.')
      }
    }catch(err:any){
      console.error(err)
      setMessage('Something went wrong. Please try again later.')
    }finally{
      setLoading(false)
    }
  }

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <div className={styles.row}>
        <input name="first_name" className={styles.input} placeholder="First name" required />
        <input name="last_name" className={styles.input} placeholder="Last name" required />
      </div>
      <div className={styles.row}>
        <input name="from_email" className={styles.input} placeholder="Email" type="email" required />
        <input name="coop" className={styles.input} placeholder="Cooperative name" />
      </div>
       <div className={styles.row}>
         <input name="phone" className={styles.input} placeholder="Phone (11 digits)" />
         <input name="facebook" className={styles.input} placeholder="Facebook page or contact" />
       </div>
       <div>
         <input type="hidden" name="schedule" value="May 22, 3:00pm-4:00pm" />
       </div>
       <div>
         <textarea name="message" className={styles.textarea} placeholder="Tell us your challenge or message" />
       </div>
      <label className={styles.checkboxRow}>
        <input type="checkbox" checked={subscribe} onChange={() => setSubscribe(!subscribe)} />
        I agree to receive updates and event announcements from CORA.
      </label>
      <div className={styles.actions}>
        <button type="button" className={styles.cancel} onClick={()=>{(document.activeElement as HTMLElement)?.blur()}}>Cancel</button>
        <button type="submit" disabled={loading} className={styles.btn}>{loading? 'Sending...' : 'Request Demo'}</button>
      </div>
      {message && <p className={message.startsWith('Thanks') ? styles.success : styles.error}>{message}</p>}
    </form>
  )
}
