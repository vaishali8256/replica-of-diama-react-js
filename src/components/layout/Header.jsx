import { useState } from 'react'
import { Link, NavLink, useNavigate } from 'react-router-dom'
import { SITE, NAV_LINKS } from '../../config/site'
import Icon from '../common/Icon'
import './layout.css'

export default function Header() {
  const [open, setOpen] = useState(false)
  const [query, setQuery] = useState('')
  const navigate = useNavigate()

  const onSearch = (e) => {
    e.preventDefault()
    const q = query.trim().toLowerCase().replace(/[^\w\s-]/g, '').replace(/\s+/g, '-')
    navigate(q ? `/search/${encodeURIComponent(q)}` : '/products')
    setOpen(false)
  }

  return (
    <header className="header">
      <div className="header__announce">
        <div className="header__announce-inner">{SITE.announcement}</div>
      </div>

      <div className="header__main">
        <div className="header__row">
          <div className="header__left">
            <button className="header__burger" aria-label="Open menu" onClick={() => setOpen(true)}>
              <Icon name="menu" size={24} />
            </button>
            <Link to="/"><img src={SITE.logos.dark} alt={SITE.name} className="header__logo" /></Link>
          </div>

          <nav className="header__nav" aria-label="Main">
            {NAV_LINKS.map((l) => (
              <NavLink key={l.to} to={l.to} className="header__link">{l.label}</NavLink>
            ))}
          </nav>

          <div className="header__actions">
            <Link to="/products" aria-label="Search" className="header__icon header__icon--desktop"><Icon name="search" /></Link>
            <Link to="/login" aria-label="Account" className="header__icon"><Icon name="user" /></Link>
            <Link to="/wishlist" aria-label="Wishlist" className="header__icon"><Icon name="heart" /></Link>
            <Link to="/cart" aria-label="Cart" className="header__icon"><Icon name="bag" /></Link>
          </div>
        </div>
      </div>
      <div className="header__strip" />

      {/* Mobile drawer */}
      <div className={`drawer ${open ? 'drawer--open' : ''}`} onClick={() => setOpen(false)}>
        <aside className="drawer__panel" onClick={(e) => e.stopPropagation()}>
          <div className="drawer__top">
            <img src={SITE.logos.white} alt={SITE.name} className="drawer__logo" />
            <button aria-label="Close menu" onClick={() => setOpen(false)} className="drawer__close"><Icon name="close" /></button>
          </div>
          <form onSubmit={onSearch} className="drawer__search">
            <input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search products..." />
            <button type="submit">Search</button>
          </form>
          <ul className="drawer__list">
            {NAV_LINKS.map((l) => (
              <li key={l.to}>
                <Link to={l.to} onClick={() => setOpen(false)}>
                  <span>{l.label}</span><Icon name="chevronRight" size={16} />
                </Link>
              </li>
            ))}
          </ul>
        </aside>
      </div>
    </header>
  )
}
