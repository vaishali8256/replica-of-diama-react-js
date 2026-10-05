import { useMemo, useState } from 'react'
import { useParams, useSearchParams } from 'react-router-dom'
import PageHeader from '../components/common/PageHeader'
import ProductCard from '../components/common/ProductCard'
import products from '../data/products.json'
import { SHAPES } from '../config/home'
import './pages.css'

const TITLES = { rings: 'Rings', earrings: 'Earrings', pendants: 'Pendants', bracelets: 'Bracelets & Bangles' }

export default function Products() {
  const { categoryName, query } = useParams()
  const [params] = useSearchParams()
  const [sort, setSort] = useState('')
  const shape = params.get('diamondShape')

  const list = useMemo(() => {
    let items = categoryName && products[categoryName] ? products[categoryName] : Object.values(products).flat()
    if (query) items = items.filter((p) => p.name.toLowerCase().includes(query.replace(/-/g, ' ')))
    if (sort === 'asc') items = [...items].sort((a, b) => a.price - b.price)
    if (sort === 'desc') items = [...items].sort((a, b) => b.price - a.price)
    return items
  }, [categoryName, query, sort])

  const title = query ? `Search: ${query.replace(/-/g, ' ')}` : TITLES[categoryName] || 'All Jewellery'
  const shapeLabel = SHAPES.find((s) => s.title.toLowerCase().replace(/\s+/g, '-') === shape)?.title

  return (
    <>
      <PageHeader title={title} subtitle={shapeLabel ? `Shape: ${shapeLabel}` : undefined} />
      <section className="container section">
        <div className="toolbar">
          <span>{list.length} products</span>
          <select value={sort} onChange={(e) => setSort(e.target.value)} aria-label="Sort">
            <option value="">Featured</option>
            <option value="asc">Price: Low to High</option>
            <option value="desc">Price: High to Low</option>
          </select>
        </div>
        {list.length ? (
          <div className="grid">{list.map((p) => <ProductCard key={p.id} product={p} />)}</div>
        ) : (
          <p className="empty">No products found.</p>
        )}
      </section>
    </>
  )
}
