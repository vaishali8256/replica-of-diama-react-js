import SectionTitle from '../../components/common/SectionTitle'
import Carousel from '../../components/common/Carousel'
import BlogCard from '../../components/common/BlogCard'
import blogs from '../../data/blogs.json'
import './home.css'

export default function LatestArticles() {
  if (!blogs.length) return null
  return (
    <section className="container section bg-white">
      <SectionTitle>Latest Articles</SectionTitle>
      <div className="articles">
        <Carousel
          items={blogs}
          autoplay={3500}
          spaceBetween={20}
          arrows={false}
          renderItem={(b) => <BlogCard post={b} />}
          breakpoints={{ 320: { slidesPerView: 1 }, 480: { slidesPerView: 2 }, 1024: { slidesPerView: 3 }, 1280: { slidesPerView: 4 } }}
        />
      </div>
    </section>
  )
}
