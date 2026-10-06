import { useMemo, useState } from 'react'
import { useParams, useSearchParams } from 'react-router-dom'
import PageHeader from '../components/common/PageHeader'
import ProductCard from '../components/common/ProductCard'
import { FilterDropdown, PriceRange, ResetButton } from '../components/common/FilterBar'
import products from '../data/products.json'
import { SHAPES } from '../config/home'
import { formatPrice } from '../utils/format'
import './pages.css'

const TITLES = { rings: 'Rings', earrings: 'Earrings', pendants: 'Pendants', bracelets: 'Bracelets & Bangles' }

const PRICE_MIN = 0
const PRICE_MAX = 15000
// $500-$999, $1,000-$1,999, ... $14,000-$14,999
const PRICE_RANGES = [500, ...Array.from({ length: 14 }, (_, i) => (i + 1) * 1000)].map((min) => {
  const max = min === 500 ? 999 : min + 999
  return { id: String(min), label: `${formatPrice(min)} - ${formatPrice(max)}`, min, max }
})

const METALS = [
  { id: '9k-white', karat: '9k', name: 'White gold', color: '#d9d9d9' },
  { id: '14k-white', karat: '14K', name: 'White Gold', color: '#d9d9d9' },
  { id: '18k-white', karat: '18k', name: 'White Gold', color: '#d9d9d9' },
  { id: '9k-yellow', karat: '9k', name: 'Yellow gold', color: '#e3b84b' },
  { id: '14k-yellow', karat: '14K', name: 'Yellow Gold', color: '#e3b84b' },
  { id: '18k-yellow', karat: '18k', name: 'Yellow Gold', color: '#e3b84b' },
  { id: '9k-rose', karat: '9k', name: 'Rose gold', color: '#f0a090' },
  { id: '14k-rose', karat: '14K', name: 'Rose Gold', color: '#f0a090' },
  { id: '18k-rose', karat: '18k', name: 'Rose Gold', color: '#f0a090' },
]

const SORTS = {
  '': 'Featured',
  asc: 'Price: Low to High',
  desc: 'Price: High to Low',
  name: 'Alphabetically, A-Z',
  discount: 'Biggest Discount',
}

const EMPTY = { prices: [], low: PRICE_MIN, high: PRICE_MAX, metal: '', shape: '' }

// Products only carry `metals` / `shape` once the data has them; until then they are never excluded.
const hasOrUnknown = (value, wanted) => !wanted || value == null || (Array.isArray(value) ? value.includes(wanted) : value === wanted)

const slugify = (t) => t.toLowerCase().replace(/\s+/g, '-')
const discountOf = (p) => (p.regularPrice > p.price ? Math.round((1 - p.price / p.regularPrice) * 100) : 0)

// Remount per category/search so filter state resets when the route changes.
export default function Products() {
  const { categoryName, query } = useParams()
  return <ProductListing key={`${categoryName}/${query}`} />
}

function ProductListing() {
  const { categoryName, query } = useParams()
  const [params] = useSearchParams()
  const [sort, setSort] = useState('')
  const [filters, setFilters] = useState(EMPTY)
  const shape = params.get('diamondShape')

  const base = useMemo(() => {
    let items = categoryName && products[categoryName]
      ? products[categoryName].map((p) => ({ ...p, category: categoryName }))
      : Object.entries(products).flatMap(([c, l]) => l.map((p) => ({ ...p, category: c })))
    if (query) items = items.filter((p) => p.name.toLowerCase().includes(query.replace(/-/g, ' ')))
    return items
  }, [categoryName, query])

  const list = useMemo(() => {
    const ranges = PRICE_RANGES.filter((r) => filters.prices.includes(r.id))
    let items = base.filter((p) =>
      p.price >= filters.low && p.price <= filters.high &&
      (!ranges.length || ranges.some((r) => p.price >= r.min && p.price < r.max + 1)) &&
      hasOrUnknown(p.metals, filters.metal) &&
      hasOrUnknown(p.shape, filters.shape))
    if (sort === 'asc') items = [...items].sort((a, b) => a.price - b.price)
    if (sort === 'desc') items = [...items].sort((a, b) => b.price - a.price)
    if (sort === 'name') items = [...items].sort((a, b) => a.name.localeCompare(b.name))
    if (sort === 'discount') items = [...items].sort((a, b) => discountOf(b) - discountOf(a))
    return items
  }, [base, filters, sort])

  const title = query ? `Search: ${query.replace(/-/g, ' ')}` : TITLES[categoryName] || 'All Jewellery'
  const shapeLabel = SHAPES.find((s) => slugify(s.title) === shape)?.title

  const togglePrice = (id) =>
    setFilters((f) => ({ ...f, prices: f.prices.includes(id) ? f.prices.filter((x) => x !== id) : [...f.prices, id] }))
  const pick = (key, id) => setFilters((f) => ({ ...f, [key]: id }))
  const priceSet = filters.prices.length > 0 || filters.low > PRICE_MIN || filters.high < PRICE_MAX
  const dirty = priceSet || filters.metal || filters.shape
  const metal = METALS.find((m) => m.id === filters.metal)
  const shapeObj = SHAPES.find((x) => slugify(x.title) === filters.shape)

  return (
    <>
      <PageHeader title={title} subtitle={shapeLabel ? `Shape: ${shapeLabel}` : undefined} />
      <section className="container section">
        <div className="filterbar">
          <FilterDropdown label={metal ? `${metal.karat} ${metal.name}` : 'Select Metal & Purity'} active={!!metal}>
            {(close) => (
              <div className="fopts fopts--2">
                <button type="button" className={`fopt${!filters.metal ? ' fopt--on' : ''}`} onClick={() => { pick('metal', ''); close() }}>
                  <span>All<small>Metals</small></span>
                </button>
                {METALS.map((m) => (
                  <button key={m.id} type="button" className={`fopt${filters.metal === m.id ? ' fopt--on' : ''}`} onClick={() => { pick('metal', m.id); close() }}>
                    <span className="fopt__dot" style={{ background: m.color }} />
                    <span>{m.karat}<small>{m.name}</small></span>
                  </button>
                ))}
              </div>
            )}
          </FilterDropdown>

          <FilterDropdown label={SORTS[sort]} active={!!sort}>
            {(close) => (
              <div className="fopts fopts--list">
                {Object.entries(SORTS).map(([v, l]) => (
                  <button key={v} type="button" className={`fopt${sort === v ? ' fopt--on' : ''}`} onClick={() => { setSort(v); close() }}>{l}</button>
                ))}
              </div>
            )}
          </FilterDropdown>

          <FilterDropdown label={shapeObj ? shapeObj.title : 'All Shapes'} active={!!shapeObj}>
            {(close) => (
              <div className="fopts fopts--shapes">
                <button type="button" className={`fopt${!filters.shape ? ' fopt--on' : ''}`} onClick={() => { pick('shape', ''); close() }}>All Shapes</button>
                {SHAPES.map((x) => (
                  <button key={x.title} type="button" className={`fopt${filters.shape === slugify(x.title) ? ' fopt--on' : ''}`} onClick={() => { pick('shape', slugify(x.title)); close() }}>
                    <img className="fopt__img" src={x.image} alt="" />
                    {x.title}
                  </button>
                ))}
              </div>
            )}
          </FilterDropdown>

          <FilterDropdown label="Price" title="Price" wide active={priceSet}>
            <PriceRange
              min={PRICE_MIN}
              max={PRICE_MAX}
              low={filters.low}
              high={filters.high}
              onChange={(low, high) => setFilters((f) => ({ ...f, low, high }))}
            />
            <div className="fopts fopts--scroll">
              {PRICE_RANGES.map((r) => (
                <label key={r.id} className={`fopt${filters.prices.includes(r.id) ? ' fopt--on' : ''}`}>
                  <input type="checkbox" checked={filters.prices.includes(r.id)} onChange={() => togglePrice(r.id)} />
                  {r.label}
                </label>
              ))}
            </div>
          </FilterDropdown>

          <ResetButton disabled={!dirty && !sort} onClick={() => { setFilters(EMPTY); setSort('') }} />
        </div>

        <p className="listing-count">{list.length} products</p>
        {list.length ? (
          <div className="grid grid--listing">{list.map((p) => <ProductCard key={p.id} product={p} />)}</div>
        ) : (
          <p className="empty">No products match your filters.</p>
        )}
      </section>
    </>
  )
}
