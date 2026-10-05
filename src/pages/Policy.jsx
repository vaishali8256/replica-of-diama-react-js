import { Navigate, useLocation } from 'react-router-dom'
import PageHeader from '../components/common/PageHeader'
import { POLICIES } from '../config/pages'
import './pages.css'

export default function Policy() {
  const key = useLocation().pathname.replace('/', '')
  const page = POLICIES[key]
  if (!page) return <Navigate to="/" replace />
  return (
    <>
      <PageHeader title={page.title} />
      <section className="container section prose" style={{ maxWidth: 800 }}>
        {page.body.map((p, i) => <p key={i}>{p}</p>)}
      </section>
    </>
  )
}
