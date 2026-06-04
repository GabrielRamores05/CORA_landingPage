import { getAllContent } from '../lib/db'
import CoraLanding from '../components/CoraLanding'

export async function getServerSideProps() {
  const rows = await getAllContent()

  const agendaRow = rows.find((r: any) => r.section === 'agenda' && r.content_key === 'items')
  const deploymentsRow = rows.find((r: any) => r.section === 'deployments' && r.content_key === 'items')
  const heroDate = rows.find((r: any) => r.section === 'hero' && r.content_key === 'demo_date')
  const heroHeadline = rows.find((r: any) => r.section === 'hero' && r.content_key === 'headline')
  const heroSubheadline = rows.find((r: any) => r.section === 'hero' && r.content_key === 'subheadline')
  const heroFounderTag = rows.find((r: any) => r.section === 'hero' && r.content_key === 'founder_tag')
  const heroFounderText = rows.find((r: any) => r.section === 'hero' && r.content_key === 'founder_text')
  const heroDownloadLink = rows.find((r: any) => r.section === 'hero' && r.content_key === 'download_link')
  const heroCtaText = rows.find((r: any) => r.section === 'hero' && r.content_key === 'cta_text')
  const heroModalTitle = rows.find((r: any) => r.section === 'hero' && r.content_key === 'modal_title')
  const heroModalSub = rows.find((r: any) => r.section === 'hero' && r.content_key === 'modal_sub')
  const heroSuccessTitle = rows.find((r: any) => r.section === 'hero' && r.content_key === 'success_title')
  const heroSuccessDesc = rows.find((r: any) => r.section === 'hero' && r.content_key === 'success_desc')
  const navCtaText = rows.find((r: any) => r.section === 'nav' && r.content_key === 'cta_text')
  const trustBadge1 = rows.find((r: any) => r.section === 'trust' && r.content_key === 'badge1')
  const trustBadge2 = rows.find((r: any) => r.section === 'trust' && r.content_key === 'badge2')
  const trustBadge3 = rows.find((r: any) => r.section === 'trust' && r.content_key === 'badge3')
  const migrationTitle = rows.find((r: any) => r.section === 'migration' && r.content_key === 'title')
  const migrationSub = rows.find((r: any) => r.section === 'migration' && r.content_key === 'sub')
  const migrationBody = rows.find((r: any) => r.section === 'migration' && r.content_key === 'body')
  const step1 = rows.find((r: any) => r.section === 'steps' && r.content_key === 'step1')
  const step2 = rows.find((r: any) => r.section === 'steps' && r.content_key === 'step2')
  const step3 = rows.find((r: any) => r.section === 'steps' && r.content_key === 'step3')
  const faq1Q = rows.find((r: any) => r.section === 'faq' && r.content_key === 'faq1_question')
  const faq1A = rows.find((r: any) => r.section === 'faq' && r.content_key === 'faq1_answer')
  const faq2Q = rows.find((r: any) => r.section === 'faq' && r.content_key === 'faq2_question')
  const faq2A = rows.find((r: any) => r.section === 'faq' && r.content_key === 'faq2_answer')
  const faq3Q = rows.find((r: any) => r.section === 'faq' && r.content_key === 'faq3_question')
  const faq3A = rows.find((r: any) => r.section === 'faq' && r.content_key === 'faq3_answer')
  const footerBrand = rows.find((r: any) => r.section === 'footer' && r.content_key === 'brand')
  const footerSubtitle = rows.find((r: any) => r.section === 'footer' && r.content_key === 'subtitle')
  const footerCompany = rows.find((r: any) => r.section === 'footer' && r.content_key === 'company')
  const footerCopyright = rows.find((r: any) => r.section === 'footer' && r.content_key === 'copyright')
  const footerEmail = rows.find((r: any) => r.section === 'footer' && r.content_key === 'contact_email')
  const footerPhone = rows.find((r: any) => r.section === 'footer' && r.content_key === 'contact_phone')
  const footerOffice = rows.find((r: any) => r.section === 'footer' && r.content_key === 'contact_office')
  const footerHours = rows.find((r: any) => r.section === 'footer' && r.content_key === 'contact_hours')

  return {
    props: {
      agenda: agendaRow ? agendaRow.content_json : [],
      deployments: deploymentsRow ? deploymentsRow.content_json : [],
      heroDate: heroDate ? heroDate.content_value : 'june 5, 2026',
      heroHeadline: heroHeadline ? heroHeadline.content_value : 'Stress-Free Cooperative Records',
      heroSubheadline: heroSubheadline ? heroSubheadline.content_value : '',
      heroFounderTag: heroFounderTag ? heroFounderTag.content_value : '',
      heroFounderText: heroFounderText ? heroFounderText.content_value : '',
      heroDownloadLink: heroDownloadLink ? heroDownloadLink.content_value : '',
      heroCtaText: heroCtaText ? heroCtaText.content_value : '',
      heroModalTitle: heroModalTitle ? heroModalTitle.content_value : '',
      heroModalSub: heroModalSub ? heroModalSub.content_value : '',
      heroSuccessTitle: heroSuccessTitle ? heroSuccessTitle.content_value : '',
      heroSuccessDesc: heroSuccessDesc ? heroSuccessDesc.content_value : '',
      navCtaText: navCtaText ? navCtaText.content_value : '',
      trustBadge1: trustBadge1 ? trustBadge1.content_value : '',
      trustBadge2: trustBadge2 ? trustBadge2.content_value : '',
      trustBadge3: trustBadge3 ? trustBadge3.content_value : '',
      migrationTitle: migrationTitle ? migrationTitle.content_value : '',
      migrationSub: migrationSub ? migrationSub.content_value : '',
      migrationBody: migrationBody ? migrationBody.content_value : '',
      step1: step1 ? step1.content_value : '',
      step2: step2 ? step2.content_value : '',
      step3: step3 ? step3.content_value : '',
      faq1Q: faq1Q ? faq1Q.content_value : '',
      faq1A: faq1A ? faq1A.content_value : '',
      faq2Q: faq2Q ? faq2Q.content_value : '',
      faq2A: faq2A ? faq2A.content_value : '',
      faq3Q: faq3Q ? faq3Q.content_value : '',
      faq3A: faq3A ? faq3A.content_value : '',
      footerBrand: footerBrand ? footerBrand.content_value : 'CORA',
      footerSubtitle: footerSubtitle ? footerSubtitle.content_value : '',
      footerCompany: footerCompany ? footerCompany.content_value : '',
      footerCopyright: footerCopyright ? footerCopyright.content_value : '',
      footerEmail: footerEmail ? footerEmail.content_value : '',
      footerPhone: footerPhone ? footerPhone.content_value : '',
      footerOffice: footerOffice ? footerOffice.content_value : '',
      footerHours: footerHours ? footerHours.content_value : '',
    },
  }
}

export default function Home(props: any) {
  return <CoraLanding {...props} />
}
