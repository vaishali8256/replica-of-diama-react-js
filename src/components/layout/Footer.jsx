import { useState } from 'react'
import { Link } from 'react-router-dom'
import { SITE, FOOTER_COLUMNS } from '../../config/site'
import Icon from '../common/Icon'
import Newsletter from './Newsletter'
import './layout.css'

function FooterColumn({ title, links }) {
  return (
    <div>
      <h3 className="footer__heading">{title}</h3>
      <ul className="footer__links">
        {links.map((l) => (
          <li key={l.label}><Link to={l.to}>{l.label}</Link></li>
        ))}
      </ul>
    </div>
  )
}

// Mobile accordion version of a column
function FooterAccordion({ title, links }) {
  const [open, setOpen] = useState(false)
  return (
    <div className="footer__acc">
      <button onClick={() => setOpen(!open)} className="footer__acc-btn">
        <span>{title}</span>
        <span className={open ? 'is-open' : ''}>▾</span>
      </button>
      {open && (
        <ul className="footer__acc-list">
          {links.map((l) => <li key={l.label}><Link to={l.to}>{l.label}</Link></li>)}
        </ul>
      )}
    </div>
  )
}

export default function Footer() {
  return (
    <footer className="footer">
      <Newsletter />
      <div className="footer__body">
        {/* mobile */}
        <div className="footer__mobile container">
          <p className="footer__about">{SITE.description}</p>
          <p className="footer__contact"><Icon name="pin" size={16} /> {SITE.location}</p>
          <p className="footer__contact"><Icon name="mail" size={16} /> {SITE.email}</p>
          {FOOTER_COLUMNS.map((c) => <FooterAccordion key={c.title} {...c} />)}
        </div>

        {/* desktop */}
        <div className="footer__desktop container">
          <div className="footer__grid">
            <div>
              <p className="footer__about">{SITE.description}</p>
              <div className="footer__social">
                <a href={SITE.social.facebook} target="_blank" rel="noopener noreferrer" aria-label="Facebook" style={{ color: '#1877F2' }}><Icon name="facebook" size={32} /></a>
                <a href={SITE.social.instagram} target="_blank" rel="noopener noreferrer" aria-label="Instagram" style={{ color: '#E4405F' }}><Icon name="instagram" size={32} /></a>
              </div>
            </div>
            {FOOTER_COLUMNS.map((c) => <FooterColumn key={c.title} {...c} />)}
            <div>
              <h3 className="footer__heading">Get In Touch</h3>
              <ul className="footer__links footer__links--contact">
                <li><Icon name="pin" size={20} /> <span>{SITE.location}</span></li>
                <li><Icon name="mail" size={20} /> <a href={`mailto:${SITE.email}`}>{SITE.email}</a></li>
              </ul>
            </div>
          </div>
        </div>

        <div className="container footer__bottom">
          <div className="footer__brand-row">
            <Link to="/"><img src={SITE.logos.footer} alt={SITE.name} className="footer__logo" /></Link>
            <hr />
          </div>
          <div className="footer__legal">
            <p>{SITE.tagline}</p>
            <p>
              {SITE.copyright} | Design &amp; Developed by{' '}
              <a href={SITE.credit.url} target="_blank" rel="noopener noreferrer">{SITE.credit.label}</a>
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}
