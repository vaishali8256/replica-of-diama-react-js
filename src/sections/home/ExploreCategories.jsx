import { Link } from 'react-router-dom'
import SectionTitle from '../../components/common/SectionTitle'
import { CATEGORIES } from '../../config/home'
import './home.css'

export default function ExploreCategories() {
  return (
    <section className="bg-white">
      <div className="container section">
        <SectionTitle>Explore Categories</SectionTitle>
        <div className="cats">
          {CATEGORIES.map((c) => (
            <Link
              key={c.label}
              to={c.to}
              className={`cats__tile ${c.size === 'large' ? 'cats__tile--large' : ''}`}
            >
              <img src={c.image} alt={c.label} style={c.position ? { objectPosition: c.position } : undefined} />
              <span className="cats__shade" />
              <h3 className="cats__label">{c.label}</h3>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
