import { useState } from 'react'
import PageHeader from '../components/common/PageHeader'
import { FAQS } from '../config/pages'
import './pages.css'

export default function Faq() {
  const [open, setOpen] = useState(0)
  return (
    <>
      <PageHeader title="Frequently Asked Questions" subtitle="Find answers to common questions about our products, shipping, returns, and more." />
      <section className="container section faq">
        {FAQS.map((f, i) => (
          <div key={f.q} className="faq__item">
            <button onClick={() => setOpen(open === i ? -1 : i)}>{f.q}<span>{open === i ? '−' : '+'}</span></button>
            {open === i && <p>{f.a}</p>}
          </div>
        ))}
      </section>
    </>
  )
}
