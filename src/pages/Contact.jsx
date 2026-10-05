import { useState } from 'react'
import PageHeader from '../components/common/PageHeader'
import Icon from '../components/common/Icon'
import { SITE } from '../config/site'
import { CONTACT } from '../config/pages'
import './pages.css'

export default function Contact() {
  const [sent, setSent] = useState(false)
  const onSubmit = (e) => {
    e.preventDefault()
    // TODO: send form data to your backend / email service.
    setSent(true)
    e.target.reset()
  }

  return (
    <>
      <PageHeader title="Contact Us" subtitle={CONTACT.subtitle} />
      <section className="container section contact">
        <ul className="contact__info">
          <li><Icon name="pin" /> {SITE.location}</li>
          <li><Icon name="mail" /> <a href={`mailto:${SITE.email}`}>{SITE.email}</a></li>
        </ul>
        <form onSubmit={onSubmit} className="form">
          <input name="name" placeholder="Your name" required />
          <input name="email" type="email" placeholder="Email address" required />
          <input name="phone" placeholder="Mobile number" />
          <textarea name="message" rows="5" placeholder="How can we help?" required />
          <button type="submit" className="btn btn--solid">Send Message</button>
          {sent && <p className="form__ok">Thank you for contacting us. We'll get back to you soon.</p>}
        </form>
      </section>
    </>
  )
}
