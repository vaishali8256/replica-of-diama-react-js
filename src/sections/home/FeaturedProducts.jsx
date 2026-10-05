import { useState } from 'react'
import SectionTitle from '../../components/common/SectionTitle'
import Carousel from '../../components/common/Carousel'
import ProductCard from '../../components/common/ProductCard'
import { FEATURED_TABS } from '../../config/home'
import products from '../../data/products.json'
import './home.css'

export default function FeaturedProducts() {
  const [tab, setTab] = useState(FEATURED_TABS[0].key)
  const items = (products[tab] || []).slice(0, 12)

  return (
    <section className="container section featured">
      <SectionTitle>Feature Products</SectionTitle>
      <div className="featured__tabs">
        {FEATURED_TABS.map((t) => (
          <button key={t.key} onClick={() => setTab(t.key)} className={`featured__tab ${tab === t.key ? 'is-active' : ''}`}>
            {t.label}
          </button>
        ))}
      </div>
      <div className="featured__carousel">
        <Carousel
          key={tab}
          items={items}
          renderItem={(p) => <ProductCard product={p} />}
          breakpoints={{ 320: { slidesPerView: 2 }, 768: { slidesPerView: 3 }, 1280: { slidesPerView: 4 } }}
        />
      </div>
    </section>
  )
}
