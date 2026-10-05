import { Link, useParams } from 'react-router-dom'
import PageHeader from '../components/common/PageHeader'
import Button from '../components/common/Button'
import { formatPrice } from '../utils/format'
import products from '../data/products.json'
import './pages.css'

export default function ProductDetail() {
  const { slug } = useParams()
  const product = Object.values(products).flat().find((p) => p.slug === slug)

  if (!product) {
    return (
      <>
        <PageHeader title="Product not found" />
        <p className="empty"><Link to="/products">Back to all jewellery</Link></p>
      </>
    )
  }

  return (
    <>
      <PageHeader title={product.name} />
      <section className="container section detail">
        <div className="detail__images">
          <img src={product.image} alt={product.name} />
          {product.hoverImage && <img src={product.hoverImage} alt="" />}
        </div>
        <div className="detail__info">
          <h2>{product.name}</h2>
          <p className="detail__price">
            {formatPrice(product.price)} {product.regularPrice > product.price && <s>{formatPrice(product.regularPrice)}</s>}
          </p>
          <p>Free delivery on all orders. Contact us to customise this piece.</p>
          <Button to="/contact-us" variant="solid">Enquire Now</Button>
        </div>
      </section>
    </>
  )
}
