import Seo from './Seo'
import './common.css'

// Title band used at the top of inner pages.
export default function PageHeader({ title, subtitle }) {
  return (
    <>
      <Seo title={title} />
      <div className="page-header">
        <h1 className="page-header__title">{title}</h1>
        {subtitle && <p className="page-header__sub">{subtitle}</p>}
      </div>
    </>
  )
}
