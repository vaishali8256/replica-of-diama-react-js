import { useEffect } from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import Header from './Header'
import Footer from './Footer'
import './layout.css'

export default function Layout() {
  const { pathname } = useLocation()
  const isHome = pathname === '/'

  useEffect(() => { window.scrollTo(0, 0) }, [pathname])

  return (
    <div className="layout">
      <Header />
      {/* Home hero sits under the fixed header; other pages get top padding */}
      <main className={`layout__main ${isHome ? '' : 'layout__main--offset'}`}>
        <Outlet />
      </main>
      <Footer />
    </div>
  )
}
