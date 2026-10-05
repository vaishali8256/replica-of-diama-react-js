import { Link } from 'react-router-dom'
import './common.css'

// Overlay-style article card (image with gradient + title).
export default function BlogCard({ post }) {
  return (
    <Link to={`/blogs/${post.slug}`} className="blog-card">
      <img src={post.image} alt={post.title} loading="lazy" />
      <span className="blog-card__shade" />
      <h3 className="blog-card__title">{post.title}</h3>
    </Link>
  )
}
