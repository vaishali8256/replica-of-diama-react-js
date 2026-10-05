import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { SHAPES } from '../../config/home'
import './home.css'

export default function ShopByShape() {
  const navigate = useNavigate()
  const [active, setActive] = useState(SHAPES[0].ring)

  return (
    <section className="shapes">
      <div className="container shapes__inner">
        <div className="shapes__left">
          <h2 className="shapes__title">Shop Rings by Shape</h2>
          <img src={active} alt="Selected ring shape" className="shapes__ring" />
        </div>
        <div className="shapes__grid">
          {SHAPES.map((s) => (
            <button
              key={s.title}
              className="shapes__item"
              onClick={() => navigate(`/products/rings?diamondShape=${s.title.toLowerCase().replace(/\s+/g, '-')}`)}
              onMouseEnter={() => setActive(s.ring)}
              onFocus={() => setActive(s.ring)}
              aria-label={`Shop ${s.title}`}
            >
              <span className="shapes__icon"><img src={s.image} alt={s.title} /></span>
              <span className="shapes__name">{s.title}</span>
            </button>
          ))}
        </div>
      </div>
    </section>
  )
}
