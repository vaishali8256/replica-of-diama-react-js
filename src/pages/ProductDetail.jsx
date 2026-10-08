import { useState } from 'react'
import { Link, useParams, useSearchParams } from 'react-router-dom'
import PageHeader from '../components/common/PageHeader'
import Button from '../components/common/Button'
import ProductCard from '../components/common/ProductCard'
import Viewer360 from '@jasbros2568/react-viewer-360'
import { formatPrice } from '../utils/format'
import { SHAPES } from '../config/home'
import products from '../data/products.json'
import details from '../data/product-details.json'
import './pages.css'

const METAL_COLORS = { white: '#d9d9d9', yellow: '#e3b84b', rose: '#f0a090' }
const metalColor = (name) => METAL_COLORS[Object.keys(METAL_COLORS).find((k) => name.toLowerCase().includes(k))] || '#ccc'
const stripHtml = (html = '') => html.replace(/<[^>]*>/g, ' ').replace(/&nbsp;/g, ' ').replace(/\s+/g, ' ').trim()
const same = (a, b) => a?.toLowerCase() === b?.toLowerCase()

const CATEGORY_LABEL = { rings: 'Rings', earrings: 'Earrings', pendants: 'Pendants', bracelets: 'Bracelets & Bangles' }

export default function ProductDetail() {
  const { slug } = useParams()
  const found = Object.entries(products).flatMap(([cat, list]) => list.map((p) => ({ ...p, cat }))).find((p) => p.slug === slug)

  if (!found) {
    return (
      <>
        <PageHeader title="Product not found" />
        <p className="empty"><Link to="/products">Back to all jewellery</Link></p>
      </>
    )
  }
  // Remount when navigating between products so selections reset.
  return <Detail key={slug} product={found} />
}

function Detail({ product }) {
  const [params, setParams] = useSearchParams()
  const [imgIndex, setImgIndex] = useState(0)
  const [liked, setLiked] = useState(false)
  const [size, setSize] = useState('')

  // Full data when we have it; otherwise fall back to the listing data.
  const info = details[product.slug] || {
    name: product.name,
    colors: [],
    clarities: [],
    customFields: {},
    metals: [{ name: '', images: [product.image, product.hoverImage].filter(Boolean), salePrice: product.price, regularPrice: product.regularPrice, prices: {}, ringSizes: [] }],
  }

  const metal = info.metals.find((m) => same(m.name, params.get('metal'))) || info.metals[0]
  const hasMatrix = Object.keys(metal.prices).length > 0
  const colors = hasMatrix ? info.colors : []
  const clarities = hasMatrix ? info.clarities : []
  const color = colors.find((c) => same(c, params.get('diamondColor'))) || colors[0]
  const clarity = clarities.find((c) => same(c, params.get('diamondClarity'))) || clarities[0]

  const price = metal.prices[`${clarity}_${color}`.toLowerCase()] ?? metal.salePrice ?? product.price
  const ratio = metal.salePrice && metal.regularPrice > metal.salePrice ? metal.regularPrice / metal.salePrice : product.regularPrice / product.price
  const regular = ratio > 1 ? Math.round(price * ratio) : null
  const off = regular ? Math.round((1 - price / regular) * 100) : 0

  const select = (key, value) => {
    const next = new URLSearchParams(params)
    next.set(key, value)
    // Keep the URL shareable: always carry the current metal / colour / clarity.
    if (metal.name) next.set('metal', key === 'metal' ? value : metal.name)
    if (color) next.set('diamondColor', key === 'diamondColor' ? value : color)
    if (clarity) next.set('diamondClarity', key === 'diamondClarity' ? value : clarity)
    setParams(next, { replace: true })
    if (key === 'metal') setImgIndex(0)
  }

  const images = metal.images.length ? metal.images : [product.image]
  const view360 = metal.view360
  const show360 = view360 && imgIndex === images.length
  const description = stripHtml(info.description) || stripHtml(info.summary)
  const shapes = (info.shapes || []).map((s) => ({ ...s, icon: SHAPES.find((x) => same(x.title, s.name))?.image }))
  const specs = [
    ...Object.entries(info.customFields || {}),
    ...(shapes.length ? [['Diamond Shape', [...new Set(shapes.map((s) => s.name))].join(', ')]] : []),
    ...(info.cutGrade ? [['Cut Grade', info.cutGrade]] : []),
    ...(metal.name ? [['Metal', metal.name]] : []),
    ...(metal.netWeight ? [['Net Weight', `${metal.netWeight} g`]] : []),
    ...(metal.grossWeight ? [['Gross Weight', `${metal.grossWeight} g`]] : []),
    ...(metal.diamondCarat && Number(metal.diamondCarat) ? [['Total Diamond Carat', `${Number(metal.diamondCarat)} ct`]] : []),
    ...(info.sku ? [['SKU', info.sku]] : []),
  ]
  const related = (products[product.cat] || []).filter((p) => p.slug !== product.slug).slice(0, 4)

  return (
    <>
      <PageHeader title={product.name} />
      <section className="container section">
        <nav className="crumbs" aria-label="Breadcrumb">
          <Link to="/">Home</Link> / <Link to={`/products/${product.cat}`}>{CATEGORY_LABEL[product.cat]}</Link> / <span>{product.name}</span>
        </nav>

        <div className="pdp">
          <div className="pdp__gallery">
            <div className="pdp__thumbs">
              {images.map((src, i) => (
                <button key={src} type="button" className={`pdp__thumb${i === imgIndex ? ' pdp__thumb--on' : ''}`} onClick={() => setImgIndex(i)} aria-label={`View image ${i + 1}`}>
                  <img src={src} alt="" loading="lazy" />
                </button>
              ))}
              {view360 && (
                <button type="button" className={`pdp__thumb pdp__thumb--360${show360 ? ' pdp__thumb--on' : ''}`} onClick={() => setImgIndex(images.length)} aria-label="View 360°">
                  <span>360°</span>
                </button>
              )}
            </div>
            <div className="pdp__main">
              {show360 ? (
                <Viewer360 key={metal.name} src={view360.src} count={view360.count} alt={`${product.name} 360° view`} />
              ) : (
                <img src={images[Math.min(imgIndex, images.length - 1)]} alt={product.name} />
              )}
              <button
                type="button"
                className={`product-card__heart${liked ? ' product-card__heart--on' : ''}`}
                aria-label={liked ? 'Remove from wishlist' : 'Add to wishlist'}
                aria-pressed={liked}
                onClick={() => setLiked((v) => !v)}
              >
                <svg viewBox="0 0 24 24"><path d="M12 20s-7.5-4.6-9.6-9.2C1 7.6 2.7 4 6.1 4c2 0 3.2 1 3.9 2.1h4C14.7 5 15.9 4 17.9 4c3.4 0 5.1 3.6 3.7 6.8C19.5 15.4 12 20 12 20z" /></svg>
              </button>
            </div>
          </div>

          <div className="pdp__info">
            <h2 className="pdp__name">{product.name}</h2>
            {info.sku && <p className="pdp__sku">SKU: {info.sku}</p>}
            <p className="pdp__price">
              <strong>{formatPrice(price)}</strong>
              {regular && <s>{formatPrice(regular)}</s>}
              {off > 0 && <span className="pdp__off">{off}% off</span>}
            </p>
            <p className="pdp__tax">Inclusive of GST · Free delivery</p>
            {description && <p className="pdp__desc">{description}</p>}

            {info.metals.length > 1 && (
              <fieldset className="pdp__opt">
                <legend>Metal: <b>{metal.name}</b></legend>
                <div className="pdp__metals">
                  {info.metals.map((m) => (
                    <button key={m.name} type="button" className={`pdp__metal${m === metal ? ' pdp__metal--on' : ''}`} onClick={() => select('metal', m.name)}>
                      <span className="fopt__dot" style={{ background: metalColor(m.name) }} />
                      {m.name}
                    </button>
                  ))}
                </div>
              </fieldset>
            )}

            {colors.length > 0 && (
              <fieldset className="pdp__opt">
                <legend>Diamond Colour: <b>{color}</b></legend>
                <div className="pdp__chips">
                  {colors.map((c) => (
                    <button key={c} type="button" className={`pdp__chip${c === color ? ' pdp__chip--on' : ''}`} onClick={() => select('diamondColor', c)}>{c}</button>
                  ))}
                </div>
              </fieldset>
            )}

            {clarities.length > 0 && (
              <fieldset className="pdp__opt">
                <legend>Diamond Clarity: <b>{clarity}</b></legend>
                <div className="pdp__chips">
                  {clarities.map((c) => (
                    <button key={c} type="button" className={`pdp__chip${c === clarity ? ' pdp__chip--on' : ''}`} onClick={() => select('diamondClarity', c)}>{c}</button>
                  ))}
                </div>
              </fieldset>
            )}

            {shapes.length > 0 && (
              <div className="pdp__opt">
                <span className="pdp__legend">Diamond Shape{shapes.length > 1 ? 's' : ''}</span>
                <ul className="pdp__shapes">
                  {shapes.map((s) => (
                    <li key={`${s.name}-${s.weight}`} className="pdp__shape">
                      {s.icon && <img src={s.icon} alt="" />}
                      <span>
                        <b>{s.name}</b>
                        {s.weight && <small>{s.weight}</small>}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {metal.ringSizes.length > 0 && (
              <label className="pdp__opt">
                <span className="pdp__legend">Ring Size</span>
                <select value={size} onChange={(e) => setSize(e.target.value)}>
                  <option value="">Select size</option>
                  {metal.ringSizes.map((s) => <option key={s} value={s}>{s}</option>)}
                </select>
              </label>
            )}

            <p className="pdp__stock">{info.stock || 'In Stock'}</p>
            <div className="pdp__actions">
              <Button to="/contact-us" variant="solid">Enquire Now</Button>
              <Button to="/custom-jewellery" variant="outline">Customise</Button>
            </div>

            <ul className="pdp__perks">
              <li>Free insured delivery</li>
              <li>30-day returns</li>
              <li>Lifetime warranty</li>
            </ul>

            <div className="pdp__accordions">
              {specs.length > 0 && (
                <details open>
                  <summary>Product Details</summary>
                  <dl className="pdp__specs">
                    {specs.map(([k, v]) => <div key={k}><dt>{k}</dt><dd>{v}</dd></div>)}
                  </dl>
                </details>
              )}
              <details>
                <summary>Shipping &amp; Returns</summary>
                <p>Free insured delivery on every order. Made-to-order pieces are shipped once crafted; read our <Link to="/returns-and-refund-policy">returns policy</Link> for details.</p>
              </details>
              <details>
                <summary>Warranty &amp; Care</summary>
                <p>Every Diama piece includes a lifetime warranty against manufacturing defects. See our <Link to="/warranty">warranty page</Link>.</p>
              </details>
            </div>
          </div>
        </div>

        {related.length > 0 && (
          <div className="pdp__related">
            <h2 className="section-title">You May Also Like</h2>
            <div className="grid grid--listing">{related.map((p) => <ProductCard key={p.id} product={p} />)}</div>
          </div>
        )}
      </section>
    </>
  )
}
