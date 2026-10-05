import PageHeader from '../components/common/PageHeader'
import Button from '../components/common/Button'
import { DESIGN_RING } from '../config/home'
import './pages.css'

export default function CustomJewellery() {
  return (
    <>
      <PageHeader title="Custom Jewellery" subtitle={DESIGN_RING.text} />
      <section className="container section text-center">
        <img src={DESIGN_RING.image} alt="Design your ring" style={{ margin: '0 auto 24px', borderRadius: 12 }} />
        <Button to="/contact-us" variant="solid">Start Your Design</Button>
      </section>
    </>
  )
}
