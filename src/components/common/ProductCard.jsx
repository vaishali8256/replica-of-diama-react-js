import { useState } from 'react'
import { Link } from 'react-router-dom'
import { formatPrice } from '../../utils/format'
import metalVariants from '../../data/product-metals.json'
import './common.css'

// Product tile with hover image swap. Used by carousels and listing pages.
export default function ProductCard({ product }) {
  const [liked, setLiked] = useState(false)
  const [picked, setPicked] = useState(null) // metal chosen by click
  const { name, slug } = product
  const variants = metalVariants[slug]
  const variant = picked && variants?.[picked]
  const defaultMetal = variants && Object.keys(variants).find((k) => variants[k].image === product.image)
  const { image, hoverImage, price, regularPrice } = variant || product
  const to = `/product/${slug}${variant ? `?metal=${encodeURIComponent(variant.metal)}` : ''}`
  return (
    <Link to={to} className="product-card">
      <div className="product-card__media">
        <img src={image} alt={name} loading="lazy" className="product-card__img" />
        <button
          type="button"
          className={`product-card__heart${liked ? ' product-card__heart--on' : ''}`}
          aria-label={liked ? 'Remove from wishlist' : 'Add to wishlist'}
          aria-pressed={liked}
          onClick={(e) => { e.preventDefault(); setLiked((v) => !v) }}
        >
          <svg viewBox="0 0 24 24"><path d="M12 20s-7.5-4.6-9.6-9.2C1 7.6 2.7 4 6.1 4c2 0 3.2 1 3.9 2.1h4C14.7 5 15.9 4 17.9 4c3.4 0 5.1 3.6 3.7 6.8C19.5 15.4 12 20 12 20z" /></svg>
        </button>
        {hoverImage && <img src={hoverImage} alt="" loading="lazy" className="product-card__img product-card__img--hover" />}
      </div>
      {variants && (
        <div className={`product-card__metals${picked ? ' product-card__metals--sticky' : ''}`} role="group" aria-label="Metal options">
          {Object.entries(variants).map(([key, v]) => (
            <button
              key={key}
              type="button"
              className={`metal-swatch metal-swatch--${key}${(picked || defaultMetal) === key ? ' metal-swatch--on' : ''}`}
              aria-label={v.metal}
              title={v.metal}
              onClick={(e) => { e.preventDefault(); setPicked(key) }}
            />
          ))}
        </div>
      )}
      <div className="product-card__body">
        <h3 className="product-card__name">{name}</h3>
        <p className="product-card__price">
          {price != null && <span>{formatPrice(price)}</span>}
          {regularPrice > price && <s>{formatPrice(regularPrice)}</s>}
        </p>
      </div>
    </Link>
  )
}
