import Button from '../../components/common/Button'
import { DESIGN_RING as D } from '../../config/home'
import './home.css'

export default function DesignYourRing() {
  return (
    <section id="design-your-ring" className="design">
      <picture>
        <source media="(max-width: 579px)" srcSet={D.mobileImage} />
        <img src={D.image} alt={D.title} className="design__bg" />
      </picture>
      <div className="design__content">
        <div className="design__titles">
          <span className="design__ghost" aria-hidden="true">{D.title}</span>
          <h2 className="design__title">{D.title}</h2>
        </div>
        <p className="design__text">{D.text}</p>
        <Button to={D.button.to} variant="pill" className="design__btn">
          <img src={D.icon} alt="" width="24" height="24" /> {D.button.label}
        </Button>
      </div>
    </section>
  )
}
