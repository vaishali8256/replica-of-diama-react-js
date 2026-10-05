import Seo from '../components/common/Seo'
import Hero from '../sections/home/Hero'
import ExploreCategories from '../sections/home/ExploreCategories'
import ShopByShape from '../sections/home/ShopByShape'
import SignatureCollection from '../sections/home/SignatureCollection'
import KnowYourCut from '../sections/home/KnowYourCut'
import FeaturedProducts from '../sections/home/FeaturedProducts'
import DesignYourRing from '../sections/home/DesignYourRing'
import LatestArticles from '../sections/home/LatestArticles'

// Reorder / remove sections here.
export default function Home() {
  return (
    <>
      <Seo title="Home" />
      <Hero />
      <ExploreCategories />
      <ShopByShape />
      <SignatureCollection />
      <KnowYourCut />
      <FeaturedProducts />
      <DesignYourRing />
      <LatestArticles />
    </>
  )
}
