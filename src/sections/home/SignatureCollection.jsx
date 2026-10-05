import { useState } from 'react'
import SectionTitle from '../../components/common/SectionTitle'
import Carousel from '../../components/common/Carousel'
import ProductCard from '../../components/common/ProductCard'
import { SIGNATURE } from '../../config/home'
import products from '../../data/products.json'
import './home.css'

function Hotspot({ label, description, style, active, onClick }) {
  return (
    <div className="hotspot" style={style}>
      <button className="hotspot__dot" onClick={onClick} aria-label={label}>
        <span className={`hotspot__ring ${active ? 'is-active' : ''}`} />
        <span className={`hotspot__core ${active ? 'is-active' : ''}`} />
      </button>
      <div className="hotspot__tip">
        <p className="hotspot__tip-title">{label}</p>
        <p className="hotspot__tip-text">{description}</p>
      </div>
    </div>
  )
}

export default function SignatureCollection() {
  const [active, setActive] = useState('rings')
  const items = (products[active] || []).slice(0, 8)

  return (
    <section className="container section bg-white">
      <SectionTitle>Signature Collection</SectionTitle>
      <div className="sig">
        <article className="sig__image">
          <img src={SIGNATURE.image} alt="Signature Jewellery" />
          {SIGNATURE.hotspots.map((h) => (
            <Hotspot key={h.key} {...h} active={active === h.key} onClick={() => setActive(h.key)} />
          ))}
        </article>
        <div className="sig__products">
          <p className="sig__eyebrow">Featured Products</p>
          <Carousel
            key={active}
            items={items}
            renderItem={(p) => <ProductCard product={p} />}
            breakpoints={{ 0: { slidesPerView: 2 }, 1440: { slidesPerView: 3 } }}
          />
        </div>
      </div>
    </section>
  )
}
