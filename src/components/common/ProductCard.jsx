import { Link } from 'react-router-dom'
import { formatPrice } from '../../utils/format'
import './common.css'

// Product tile with hover image swap. Used by carousels and listing pages.
export default function ProductCard({ product }) {
  const { name, slug, image, hoverImage, price, regularPrice } = product
  return (
    <Link to={`/product/${slug}`} className="product-card">
      <div className="product-card__media">
        <img src={image} alt={name} loading="lazy" className="product-card__img" />
        {hoverImage && <img src={hoverImage} alt="" loading="lazy" className="product-card__img product-card__img--hover" />}
      </div>
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
