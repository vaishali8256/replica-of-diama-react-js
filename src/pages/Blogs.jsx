import PageHeader from '../components/common/PageHeader'
import BlogCard from '../components/common/BlogCard'
import blogs from '../data/blogs.json'
import './pages.css'

export default function Blogs() {
  return (
    <>
      <PageHeader title="Blogs & Articles" />
      <section className="container section">
        <div className="grid">{blogs.map((b) => <BlogCard key={b.slug} post={b} />)}</div>
      </section>
    </>
  )
}
