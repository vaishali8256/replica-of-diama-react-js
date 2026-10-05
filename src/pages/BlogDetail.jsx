import { Link, useParams } from 'react-router-dom'
import PageHeader from '../components/common/PageHeader'
import blogs from '../data/blogs.json'
import './pages.css'

export default function BlogDetail() {
  const { id } = useParams()
  const post = blogs.find((b) => b.slug === id)
  if (!post) return <p className="empty">Article not found. <Link to="/blogs">Back to blogs</Link></p>

  return (
    <>
      <PageHeader title={post.title} subtitle={post.teaser} />
      <article className="container section article">
        <img src={post.image} alt={post.title} />
        <div className="prose" dangerouslySetInnerHTML={{ __html: post.body }} />
      </article>
    </>
  )
}
