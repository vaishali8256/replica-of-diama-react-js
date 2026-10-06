import { lazy, Suspense } from 'react'
import { Route, Routes } from 'react-router-dom'
import Layout from './components/layout/Layout'
import Home from './pages/Home'
import Products from './pages/Products'
import About from './pages/About'
import Contact from './pages/Contact'
import Blogs from './pages/Blogs'
import BlogDetail from './pages/BlogDetail'
import Faq from './pages/Faq'
import CustomJewellery from './pages/CustomJewellery'
import Policy from './pages/Policy'
import NotFound from './pages/NotFound'

// Product detail carries the large product-details.json, so load it on demand.
const ProductDetail = lazy(() => import('./pages/ProductDetail'))

export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<Home />} />
        <Route path="/products" element={<Products />} />
        <Route path="/products/:categoryName" element={<Products />} />
        <Route path="/search/:query" element={<Products />} />
        <Route path="/product/:slug" element={<Suspense fallback={null}><ProductDetail /></Suspense>} />
        <Route path="/about" element={<About />} />
        <Route path="/contact-us" element={<Contact />} />
        <Route path="/blogs" element={<Blogs />} />
        <Route path="/blogs/:id" element={<BlogDetail />} />
        <Route path="/faq" element={<Faq />} />
        <Route path="/custom-jewellery" element={<CustomJewellery />} />
        {['terms-of-use', 'privacy-policy', 'warranty', 'returns-and-refund-policy', 'accessibility'].map((p) => (
          <Route key={p} path={`/${p}`} element={<Policy />} />
        ))}
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  )
}
